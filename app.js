"use strict";
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const routes = require("./routes/index");
const { errorHandler } = require("./middlewares/errorHandler");

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
    console.log(payload);
    users.push({ username: payload, status: "online" });
    console.log(users);
  });

  socket.on("sendMessageToServer", (payload) => {
    chats.push(payload);
    console.log(chats);

    io.emit("receivedMessageFromServer", chats);
  });
});

httpServer.listen(3001, () => {
  console.log("listening on *:3001");
});

app.use(errorHandler);

module.exports = app;
