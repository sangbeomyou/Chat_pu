const express = require("express");
const app = express();
const server = require('http').createServer(app)
const SocketIO = require('socket.io');

const io = SocketIO(server);
const test = require("./Router/test");1
const login = require("./Router/login");
const member = require("./Router/member");

app.use("/api", login, member);
app.use("/api1", test);

io.on('connection', (socket) => {
    console.log('새로운 connectoin이 발생하였습니다.')
    socket.on("init", (payload) => {
        console.log(payload);
      });
      socket.emit('event', { data: 'worked successfully!'});

  });

const port = 5000; // 노드 서버가 작동할 포트넘버
server.listen(port, () => console.log(`현재 포트 넘버는 ${port} 입니다`));
