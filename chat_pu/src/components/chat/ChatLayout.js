import React from "react";
import { Row, Col } from "antd";
import ChatMenu from "./ChatMenu";

const ChatLayout = () => {
  return (
    <div>
      <Row gutter={8}>
        <Col xs={24} md={6}>
            <ChatMenu/>
        </Col>
        <Col xs={24} md={12}>box</Col>
        <Col xs={24} md={6}>online</Col>
      </Row>
    </div>
  );
};

export default ChatLayout;
