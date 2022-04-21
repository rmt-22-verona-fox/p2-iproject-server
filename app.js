"use strict";
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const cors = require("cors");
const express = require("express");
const app = express();
const routes = require("./routes/index");
const { errorHandler } = require("./middlewares/errorHandler");
const axios = require("axios");
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


app.use(routes);

let users = [];
let chats = [];

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });

  socket.on("customEventFromClient", (payload) => {
    console.log("request from client", payload);
  });

  socket.emit("customEventFromServer", "response from server");

  socket.on("setUsername", (payload) => {
    users.push({ username: payload, status: "online" });
  });

  socket.on("sendMessageToServer", (payload) => {
    if (payload && payload.message) {
      chats.push(payload);
    }

    io.emit("receivedMessageFromServer", chats);
  });

  socket.on("sendPokemonToTrade", async (payload) => {
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${payload.PokemonId}`
    );
    payload.imageUrl = data.sprites.other["official-artwork"].front_default;
    payload.pokemonName = data.name;

    chats.push(payload);

    io.emit("receivedMessageFromServer", chats);
  });

  socket.on("incrementConfirmCount", () => {
    io.emit("incrementConfirmCountServer");
  });

  socket.on("completeTrade", () => {
    chats = [];
    io.emit("receivedMessageFromServer", chats);
    io.emit("completeTradeServer");
  });
});

  httpServer.listen(3001, () => {
    console.log("listening on *:3001");
  });

app.use(errorHandler);

module.exports = app;
