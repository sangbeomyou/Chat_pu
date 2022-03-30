import io from "socket.io-client";

export const socket = io.connect("/", {
    path: "/socket.io", // 서버 path와 일치시켜준다
    transport: ["websocket"],
  });
  