import React from "react";
import "./Message.css";
import { Card, Avatar, Badge, Row } from "antd";
import styled from "styled-components";
import { useSelector } from "react-redux";

const CardWrapper = styled(Card)`
  margin-top: 10px;
`;
const RowWrapper = styled(Row)`
  margin-top: 20px;
`;

const Spanbold = styled.span`
  font-weight: bold;
`;

const SpanOlineNum = styled.span`
  float: right;
`;

const Online = () => {
  const { onlineUsers } = useSelector((state) => state.user);
  const { room } = useSelector((state) => state.chat);

  const onlineUsersroom = onlineUsers.filter((item) => item.roomId === room)

  return (
    <>
      {onlineUsers ? (
        <>
          <CardWrapper>
            <Spanbold>활동중</Spanbold>
            <SpanOlineNum>
              <Avatar
                size={20}
                style={{
                  backgroundColor: "#1890ff",
                }}
              >
                {onlineUsersroom.length}
              </Avatar>
            </SpanOlineNum>
            <RowWrapper>
              <Avatar.Group
                maxCount={5}
                size={40}
                maxStyle={{ backgroundColor: "#1890ff" }}
              >
                {onlineUsersroom.map((item, i) => (
                  <div key={i}>
                    <span className="avatar-item">
                      <Badge count={1}>
                        <Avatar size={40}> {item.name}</Avatar>
                      </Badge>
                    </span>
                    &nbsp; &nbsp;
                  </div>
                ))}
              </Avatar.Group>
            </RowWrapper>
          </CardWrapper>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Online;
