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
                {onlineUsers.length}
              </Avatar>
            </SpanOlineNum>
            <RowWrapper>
              {onlineUsers.map((item, i) => (
                <div key={i}>
                  <span className="avatar-item">
                    <Badge count={1}>
                      <Avatar size={40}> {item.name}</Avatar>
                    </Badge>
                  </span>
                  &nbsp; &nbsp;
                </div>
              ))}
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
