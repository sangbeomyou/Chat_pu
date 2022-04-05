import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { changeTab_Action } from "../../reducers/chat";
import { Card, Tabs } from "antd";
import ChatUserList from "./chattab/ChatUserList";
import ChatRoom from "./chattab/ChatRoom";

const { TabPane } = Tabs;

const CardWrapper = styled(Card)`
  margin-top: 10px;
`;

const ChatMenu = () => {
  const dispatch = useDispatch();
  const { chatmenutab } = useSelector((state) => state.chat);
  return (
    <div>
      <CardWrapper>
        <Tabs
          defaultActiveKey={chatmenutab}
          activeKey={chatmenutab}
          centered
          tabBarGutter="10"
          onTabClick={(key) => dispatch(changeTab_Action(key))}
        >
          <TabPane
            tab={
              <span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 채팅방
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            }
            key="1"
          >
            <ChatRoom />
          </TabPane>
          <TabPane
            tab={
              <span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 사원
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            }
            key="2"
            onClick={() => console.log(1)}
          >
            <ChatUserList />
          </TabPane>
        </Tabs>
      </CardWrapper>
    </div>
  );
};

export default ChatMenu;
