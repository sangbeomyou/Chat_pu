import React, { useEffect, useState } from "react";
import { Button, Input, Card } from "antd";
import { socket } from "./Socket";
import { useSelector } from "react-redux";
import ChatMessages from "./ChatMessages";
import styled from "styled-components";

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

const CardWrapper = styled(Card)`
  margin-top: 10px;
`;

const ChatBox = () => {
  const [sendMessage, setsendMessage] = useState("");
  const [receiveMessage, setreceiveMessage] = useState([]);
  const { me } = useSelector((state) => state.user);
  const { roomlist } = useSelector((state) => state.chat);
  const { room } = useSelector((state) => state.chat);

  const onChange = (e) => {
    setsendMessage(e.target.value);
  };

  const onsubmitForm = () => {
    setreceiveMessage((currentArray) => [
      { text: sendMessage.trim(), position: "right" },
      ...currentArray,
    ]);
    socket.emit("chat message", sendMessage.trim(), room, me[0].korname);
    setsendMessage("");
  };
  // 방 인원 목록
  const roomtitle= roomlist.filter((item) => item.room_id === room)[0]

  useEffect(() => {
    socket.on("chat message", (message, name, roomId) => {
      roomId === room ?
      setreceiveMessage((currentArray) => [
        { text: message, position: "left", name: name },
        ...currentArray,
      ]) : console.log({ text: message, position: "다른방", name: name })
    });
  }, []);
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
