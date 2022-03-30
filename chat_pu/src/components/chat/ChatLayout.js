import React from "react";
import { Row, Col, Button } from "antd";
import ChatMenu from "./ChatMenu";
import ChatBox from "./ChatBox";
import Online from "./Online";

const ChatLayout = () => {
  return (
    <div>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          <ChatMenu />
        </Col>
        <Col xs={24} md={12}>
        <Button onClick={() => window.open("/", "", "_blank")}> 
팝업</Button>
          {/* <ChatBox /> */}
        </Col>
        <Col xs={24} md={6}>
          <Online />
        </Col>
      </Row>
    </div>
  );
};

export default ChatLayout;
