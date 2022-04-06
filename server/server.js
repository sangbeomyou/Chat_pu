const express = require("express");
const app = express();
const server = require("http").createServer(app);
const SocketIO = require("socket.io");
const { addUser, removeUser, getUser, getUsersInRoom, getUsers, getUserCheck } = require('./chat/chat_users')
const io = SocketIO(server);

const test = require("./Router/test");
const login = require("./Router/login");
const member = require("./Router/member");
const chat = require("./Router/chat");

app.use("/api", login, member, chat);
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
  
  socket.on('login', (empno) => {
    console.log('로그인',getUserCheck(empno));
    io.emit('login check', getUserCheck(empno));
  });
  

  socket.on('joinRoom', ({roomId, name, empno}) => {
    addUser({id : socketid, name, roomId, empno})
    console.log('방가입',users)
    socket.join(roomId);
    io.to(roomId).emit('joinRoom', roomId);
    io.emit('chat online', users);
  });

  socket.on('chat message', (message, time, roomId, name, empno) => {
    socket.broadcast.to(roomId).emit('chat message', message, time, roomId, name, empno);
    // io.to(roomId).emit('chat message',message);
    console.log(message, time, roomId, name, empno)
  });
  
});

const port = 5000; // 노드 서버가 작동할 포트넘버
server.listen(port, () => console.log(`현재 포트 넘버는 ${port} 입니다`));
