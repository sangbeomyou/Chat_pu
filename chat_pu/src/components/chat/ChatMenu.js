import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Input, Row, Card, Tabs } from "antd";
import ChatUserList from "./chattab/ChatUserList";
import ChatSearch from "./ChatSearch";

const { TabPane } = Tabs;

const { Search } = Input;

const CardWrapper = styled(Card)`
  margin-top: 10px;
`;

const ChatMenu = () => {
  return (
    <div>
      <CardWrapper>
      <ChatSearch/>
        <Tabs defaultActiveKey="1" centered tabBarGutter="10">
          <TabPane
            tab={
              <span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 채팅방
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            }
            key="1"
          >
            Tab 1
          </TabPane>
          <TabPane
            tab={
              <span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 사원
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            }
            key="2"
          >
            <ChatUserList/>
          </TabPane>
        </Tabs>
      </CardWrapper>
    </div>
  );
};

export default ChatMenu;
