import io from "socket.io-client";

export const socket = io.connect("/", {
    path: "/socket.io", // 서버 path와 일치시켜준다
    transport: ["websocket"],
  });
  
// export const sendMessage = (e,roomId)=>{
//     const message = document.querySelector('.send');
//     socket.emit('chat message', message.value,roomId);
//     document.querySelector('.message-list')?.appendChild(makeMessage(message.value,true));
//     message.value='';
// }
// export const socketOnMessage = ()=>{
//     socket.on('chat message',(message)=>{
//         document.querySelector('.message-list').appendChild(makeMessage(message,false));
//     });
// }

// export const makeMessage = (message,isMine) => {
//     const msgBox = document.createElement('div');
//     msgBox.className = isMine? "my-message": "other-message";
//     msgBox.innerText = message;
//     return msgBox;
// }