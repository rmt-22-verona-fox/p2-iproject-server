const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const PORT = 8080;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  // user dc
  socket.on("disconnect", () => {
    console.log("A user disconnect");
  });

  socket.on("customEventFromClient", (payload) => {
    console.log("Terima payload:", payload);
  });

  socket.emit("customEventFromServer", "kembalian server");
});

httpServer.listen(PORT, () => {
  console.log("listening");
});
