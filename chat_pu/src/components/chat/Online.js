import React from "react";
import "./Message.css";
import { Card } from "antd";
import styled from "styled-components";
import { useSelector } from "react-redux";

const CardWrapper = styled(Card)`
  margin-top: 10px;
`;

const Online = () => {
  const { onlineUsers } = useSelector((state) => state.user);


  return (
    <>
      {onlineUsers ? (
        <>
          {" "}
          <CardWrapper>
            {onlineUsers.map((item, i) => (
              <div key={i}>{item.name}</div>
            ))}
          </CardWrapper>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Online;
