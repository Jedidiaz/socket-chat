import React, { useEffect, useState } from "react";
import {
  Container,
  Stack,
  OutlinedInput,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { IO } from "../../services/socket";

const HomePage = () => {
  const [form, setForm] = useState({ username: "", row: "" });
  const [message, setMessage] = useState("");
  const [arrayMessages, setArrayMessages] = useState([]);

  useEffect(() => {
    IO.connect();
  }, []);

  useEffect(() => {
    IO.on("reciveMessage", (data) => {
      setArrayMessages((adata) => [...adata, data]);
      console.log(data);
    });
  }, [IO]);

  const handleConnect = (e) => {
    e.preventDefault();
    IO.emit("joinRoom", form);
    IO.on("joinRoom", (data) => {
      console.log(data);
    });
  };
  const handleInputChange = ({ target }) => {
    const { value, name } = target;
    if (name === "message") {
      setMessage(value);
      return;
    }
    setForm((data) => ({ ...data, [name]: value }));
  };

  const hadleSendMessage = () => {
    IO.emit("sendMessage", { message });
    setArrayMessages((data) => [
      ...data,
      { message, name: form.username, status: true },
    ]);
  };

  return (
    <Container>
      <Stack
        gap={1}
        component="form"
        role="form"
        onSubmit={handleConnect}
        mt={5}
      >
        <OutlinedInput
          size="small"
          multiline
          maxRows={2}
          placeholder="Introduce tu nombre"
          name="username"
          sx={{ backgroundColor: "#f7f7f7" }}
          onChange={handleInputChange}
        />
        <OutlinedInput
          size="small"
          multiline
          maxRows={2}
          name="room"
          placeholder="Introduce el numero de la sala"
          sx={{ backgroundColor: "#f7f7f7" }}
          onChange={handleInputChange}
        />
        <Button variant="contained" type="submit">
          Entrar
        </Button>
      </Stack>
      <Stack mt={20}>
        <Stack>
          {arrayMessages.map(({ message, status, name }, index) => (
            <Stack
              key={index}
              direction="row"
              width="100%"
              justifyContent={
                name === form.username ? "flex-end" : "flex-start"
              }
            >
              {/* message */}
              <Stack p={2} gap={0.5}>
                <Typography variant="caption" color="#ababab">
                  {name}
                </Typography>
                <Typography variant="body1">{message}</Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>
        <OutlinedInput
          size="small"
          multiline
          maxRows={2}
          name="message"
          placeholder="Introduce el mensaje"
          sx={{ backgroundColor: "#f7f7f7" }}
          onChange={handleInputChange}
        />
        <Button onClick={hadleSendMessage}>Enviar mensaje</Button>
      </Stack>
    </Container>
  );
};

export default HomePage;
