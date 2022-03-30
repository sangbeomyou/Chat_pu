const express = require("express");
const app = express();
const server = require("http").createServer(app);
const SocketIO = require("socket.io");
const { addUser, removeUser, getUser, getUsersInRoom, getUsers } = require('./chat/chat_users')
const io = SocketIO(server);

const test = require("./Router/test");
const login = require("./Router/login");
const member = require("./Router/member");

app.use("/api", login, member);
app.use("/api1", test);

io.on('connection', (socket) => {

  const socketid = socket.id;
  const users = getUsers()


  console.log(socketid,'socket connect');

  socket.on('disconnect', () => {
    removeUser(socketid)
    console.log(socketid,'user disconnected');
    console.log('떠나감',users)
    io.emit('chat online', users);
  });

  socket.on('leaveRoom', (roomId) => {
    console.log(roomId)
    socket.leave(roomId);
  });

  socket.on('logout', () => {
    removeUser(socketid)
    console.log('로그아웃',users)
    io.emit('chat online', users);
  });

  
  socket.on('joinRoom', ({roomId, name}) => {
    addUser({id : socketid, name, roomId})
    console.log('방가입',users)
    socket.join(roomId);
    io.to(roomId).emit('joinRoom', roomId);
    io.emit('chat online', users);
  });

  socket.on('chat message', (message, roomId, name) => {
    socket.broadcast.to(roomId).emit('chat message', message, name);
    // io.to(roomId).emit('chat message',message);
    console.log(message, roomId, name)
  });

});

const port = 5000; // 노드 서버가 작동할 포트넘버
server.listen(port, () => console.log(`현재 포트 넘버는 ${port} 입니다`));
