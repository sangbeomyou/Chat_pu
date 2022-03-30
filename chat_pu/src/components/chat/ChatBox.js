import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";
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
  height: 80vh;
  width: 100%;
`;

const ChatBox = () => {
  const [sendMessage, setsendMessage] = useState("");
  const [receiveMessage, setreceiveMessage] = useState([]);
  const { me } = useSelector((state) => state.user);

  const onChange = (e) => {
    setsendMessage(e.target.value);
  };

  const onsubmitForm = () => {
    setreceiveMessage((currentArray) => [
      { text: sendMessage.trim(), position: "right" },
      ...currentArray,
    ]);
    socket.emit("chat message", sendMessage.trim(), "1", me[0].korname);
    setsendMessage("");
  };

  useEffect(() => {
    socket.on("chat message", (message, name) => {
      setreceiveMessage((currentArray) => [
        { text: message, position: "left", name: name },
        ...currentArray,
      ]);
    });
  }, []);
  return (
    <>
      <Container>
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
