import React, { useEffect, useState, useCallback } from "react";
import { Button, Input, Card } from "antd";
import { socket } from "../Socket";
import { useSelector } from "react-redux";
import ChatMessages from "./ChatMessages";
import axios from "axios";
import styled from "styled-components";
import "moment/locale/ko";
import moment from "moment";

const Container = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
  border: 0.1px solid #eaeaea;
  height: 90vh;
  width: 100%;
`;

const ChatBox = () => {
  moment.locale("ko");
  const momenttime =  moment(moment().format("YYYY-MM-DD HH:mm:ss")).format("LTS");

  const [sendMessage, setsendMessage] = useState("");
  const [receiveMessage, setreceiveMessage] = useState([]);
  const { me } = useSelector((state) => state.user);
  const { roomlist } = useSelector((state) => state.chat);
  const { room } = useSelector((state) => state.chat);

  const onChange = (e) => {
    setsendMessage(e.target.value);
  };

  const onsubmitForm = () => {
    //공백 안들어가게
    if (sendMessage !== '') {
    setreceiveMessage((currentArray) => [
      {
        message: sendMessage.trim(),
        time: momenttime,
        room_id: room,
        empno: me[0].empno,
        name: me[0].korname,
      },
      ...currentArray,
    ]);
    socket.emit(
      "chat message",
      sendMessage.trim(),
      momenttime,
      room,
      me[0].korname,
      me[0].empno
    );
    axios
    .post("/api/sendchatmessage", null, {
      params: {
        message: sendMessage.trim(),
        time: momenttime,
        room_id: room,
        empno: me[0].empno,
      },
    })
    .then(function (response) {
        if(!response.data.result) {
          alert("서버 오류입니다");
        }
    });
    setsendMessage("");
    };
  };
  // 방 인원 목록
  const roomtitle = roomlist.filter((item) => item.room_id === room)[0];

  useEffect(() => {
    socket.on("chat message", (message, time ,roomId, name, empno) => {
      console.log(message, time ,roomId, name, empno);
      roomId === room
        ? setreceiveMessage((currentArray) => [
          {
            message: message,
            time: time,
            room_id: roomId,
            empno: empno,
            name: name,
          },
            ...currentArray,
          ])
        : console.log({ text: message, position: "다른방", name: name });
    });
  }, [room]);
  //메세지 목록 불러오기
  const callApi = useCallback(async () => {
    try {
      await axios
      .post("/api/chatmessagelist", null, {
        params: {
          room: room,
        },
      })
      .then(function (response) {
        response.data.result
          ? setreceiveMessage(response.data.posts)
          : console.log(response.data.posts);
      });
    } catch (error) {
      console.error(error);
    }
  }, [room]);

  useEffect(() => {
    callApi();
  }, [callApi]);
  return (
    <>
      <Container>
        <Card>{roomtitle.chatusers}</Card>

        <ChatMessages receiveMessage={receiveMessage}></ChatMessages>
        <Input.Group compact>
          <Input
            value={sendMessage}
            onPressEnter={onsubmitForm}
            onChange={onChange}
            style={{ width: "calc(100% - 73px)" }}
          />
          <Button onClick={onsubmitForm} type="primary">
            보내기
          </Button>
        </Input.Group>
      </Container>
    </>
  );
};
export default ChatBox;
