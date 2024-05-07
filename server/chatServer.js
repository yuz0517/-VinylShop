const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

//middleware
const cors = require("cors");

app.use(cors());
const server = http.createServer(app);

const port = 8001;

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  socket.on("join_room", (data) => {
    socket.join(data);

    console.log("사용자가 상담 요청을 했습니다.", data);

    socket.on("send_message", (data) => {
      console.log(data.chatRequestMessage)
      socket.broadcast.emit("receive_message", data.chatRequestMessage);
    });
  });
  // socket.on("send_message", (data) => {
  //   socket.to(data.room).emit("receive_message", data);
  // });
});

server.listen(port, () => {
  console.log("server is running, port:", port);
});
