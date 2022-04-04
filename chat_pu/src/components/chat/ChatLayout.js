import React, { useState } from "react";

import { Row, Col, Button } from "antd";
import ChatMenu from "./ChatMenu";
import ChatBox from "./ChatBox";
import Online from "./Online";
import NewWindow from "react-new-window";

const ChatLayout = () => {
  const [chatroomdata, setchatroomdata] = useState([
    { room: 1, isopen: false },
    { room: 2, isopen: false },
    { room: 3, isopen: false },
    { room: 4, isopen: false },
  ]);

  const opensubmit = (i) => {
    setchatroomdata(
      chatroomdata.map((item, index) =>
        index === i ? { ...item, isopen: true } : item
      )
    );
  };

  const closesubmit = (i) => {
    setchatroomdata(
      chatroomdata.map((item, index) =>
        index === i ? { ...item, isopen: false } : item
      )
    );
  };

  const chatroom = chatroomdata.map((item, i) => (
    <div key={i}>
      <Button onClick={() => opensubmit(i)}>{item.room}</Button>
      {item.isopen ? (
        <NewWindow
          width={500}
          height={600}
          onUnload={() => closesubmit(i)}
          title={item.room}
        >
          <ChatBox></ChatBox>
        </NewWindow>
      ) : (
        console.log("")
      )}
    </div>
  ));

  return (
    <div>
      <Row gutter={8}>
        <Col xs={24} md={6}>
        <Online />
          <ChatMenu />
        </Col>
        <Col xs={24} md={12}>
          <ChatBox/>
        </Col>
        <Col xs={24} md={6}>
         
        </Col>
      </Row>
    </div>
  );
};

export default ChatLayout;
