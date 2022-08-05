const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_group", (data) => {
    socket.join(data);
    console.log(`ID: ${socket.id} Group: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.group).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User_Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Server is running");
});