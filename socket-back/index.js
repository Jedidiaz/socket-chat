const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { connection } = require("./connection");
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
  console.log(`usuario ${socket.id}`);
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
