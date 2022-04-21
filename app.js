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
    origin: "https://pokenomo-iproject.web.app",
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  },
  allowRequest: (req, callback) => {
    const noOriginHeader = req.headers.origin === undefined;
    callback(null, noOriginHeader);
  },
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

app.use(routes);

app.use(errorHandler);

httpServer.listen(process.env.PORT, () => {
  console.log("listening on *:3001");
});

// module.exports = app;
