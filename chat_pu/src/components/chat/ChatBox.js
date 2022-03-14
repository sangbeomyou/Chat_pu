import React, { useEffect, useState } from "react";
import { Button, Input, Card } from "antd";
import { socket } from "./Socket";
import styled from "styled-components";

const MessageboxRight = styled.p`
  margin: 0;
  font-size: 18px;
  color: white;
  margin-left: auto;
  width: 70%;
  display: flex;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  background-color: rgb(240, 119, 59);
  min-height: 40px;
  border-radius: 10px;
`;

const MessageboxLeft = styled.p`
  margin: 0;
  font-size: 18px;
  color: white;
  margin-right: auto;
  width: 70%;
  display: flex;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  background-color: rgb(240, 119, 59);
  min-height: 40px;
  border-radius: 10px;
`;

const ChatBox = () => {
  const [sendMessage, setsendMessage] = useState("");
  const [receiveMessage, setreceiveMessage] = useState([]);

  const onChange = (e) => {
    setsendMessage(e.target.value);
  };
  const onsubmitForm = () => {
    setreceiveMessage((currentArray) => [
      { text: sendMessage, position: "right" },
      ...currentArray,
    ]);
    socket.emit("chat message", sendMessage, "1");
    setsendMessage("");
  };
  useEffect(() => {
    socket.on("chat message", (message) => {
      setreceiveMessage((currentArray) => [
        { text: message, position: "left" },
        ...currentArray,
      ]);      console.log(receiveMessage);
    });
  }, []);
  return (
    <>
      <Card>
        {receiveMessage.map((item, index) => (
          item.position === "left" ? <MessageboxLeft key={index}>{item.text}</MessageboxLeft> : <MessageboxRight key={index}>{item.text}</MessageboxRight>
        ))}
      </Card>
      <Input.Group compact>
        <Input
          value={sendMessage}
          onPressEnter={onsubmitForm}
          onChange={onChange}
          style={{ width: "calc(100% - 61px)" }}
        />
        <Button onClick={onsubmitForm} type="primary">
          send
        </Button>
      </Input.Group>
    </>
  );
};
export default ChatBox;
