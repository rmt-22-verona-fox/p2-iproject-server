"use strict";
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const routes = require("./routes/index");
const { errorHandler } = require("./middlewares/errorHandler");
const axios = require("axios");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(routes);

const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:8080",
  },
});

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
    console.log(chats);

    io.emit("receivedMessageFromServer", chats);
  });

  socket.on("sendPokemonToTrade", async (payload) => {
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${payload.PokemonId}`
    );
    payload.imageUrl = data.sprites.other["official-artwork"].front_default;
    payload.pokemonName = data.name;

    chats.push(payload);
    console.log(chats);

    // for (let i = chats.length - 1; i >= 0; i--) {
    //   const lastUser = chats[chats.length - 1].user;
    //   if (chats[i].user !== lastUser && chats[i].PokemonId) {
    //     chats.push({
    //       firstUser: { } })
    //     break;
    //   }
    // }

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
