const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { connection } = require("./connection");
const User = require("./models/users.model");
require("dotenv").config();

//Proceso de servicios
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "http://localhost:5173" },
});

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (__, res) => {
  res.send("<h1>Bienvenido!</h1>");
});

io.on("connection", (socket) => {
  console.log(`usuario: ${socket.id} conectado`);
  //Entra en una sala
  socket.on("joinRoom", async (data) => {
    try {
      const user = await User.findOne({ where: { name: data.username } });
      if (user) {
        user.id_socket = socket.id;
        await user.save();
        socket.join(data.room);
        return socket.emit("joinRoom", {
          status: true,
          msg: `${data.username} se unió a la sala ${data.room}`,
        });
      }

      await User.create({ name: data.username, id_socket: socket.id });
      socket.join(data.room);
      return socket.emit("joinRoom", {
        status: true,
        msg: `${data.username} se unió a la sala ${data.room}`,
      });
    } catch (error) {
      console.log(error);
      return socket.emit("joinRoom", { status: false, msg: "Algo salió mal" });
    }
  });

  socket.on("sendMessage", async (data) => {
    try {
      const { name } = await User.findOne({
        where: { id_socket: socket.id },
        attributes: ["name"],
      });
      console.log(data);
      const repsonse = { message: data.message, status: true, name };
      socket.broadcast.emit("reciveMessage", repsonse);
    } catch (error) {
      console.log(error);
    }
  });

  //disconnect
  socket.on("disconnect", () =>
    console.log(`usuario: ${socket.id} desconectado`)
  );
});

httpServer.listen(process.env.SERVER_PORT, async () => {
  try {
    await connection.sync();
  } catch (error) {
    console.log(error);
    console.log("Error al acceder a la DB");
  }
  console.log(`Listen on port ${process.env.SERVER_PORT}`);
});
