const express = require("express");
const app = express();
const server = require("http").createServer(app);
const SocketIO = require("socket.io");

const io = SocketIO(server);
const test = require("./Router/test");
1;
const login = require("./Router/login");
const member = require("./Router/member");

app.use("/api", login, member);
app.use("/api1", test);

io.on('connection', (socket) => {
  console.log('socket connect');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('leaveRoom', (roomId) => {
    console.log(roomId)
    socket.leave(roomId);
  });

  socket.on('joinRoom', (roomId) => {
    console.log("join",roomId)
    socket.join(roomId);
    io.to(roomId).emit('joinRoom', roomId);
  });

  socket.on('chat message', (message,roomId) => {
    socket.broadcast.to(roomId).emit('chat message',message);
    // io.to(roomId).emit('chat message',message);
    console.log(message,roomId)

  });
  
});

const port = 5000; // 노드 서버가 작동할 포트넘버
server.listen(port, () => console.log(`현재 포트 넘버는 ${port} 입니다`));
