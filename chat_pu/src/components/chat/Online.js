import React, { useEffect } from "react";
import "./Message.css";
import { socket } from "./Socket";
import { Card } from "antd";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { onlineUsersAction } from "../../reducers/user";

const CardWrapper = styled(Card)`
  margin-top: 10px;
`;

const Online = () => {
  const dispatch = useDispatch();
  const { onlineUsers } = useSelector((state) => state.user);

  useEffect(() => {
    socket.on("chat online", (online) => {
      console.log("tesst", online);
      dispatch(onlineUsersAction(online));
    });
    console.log("sdsadsaggg", onlineUsers);
  }, [dispatch, onlineUsers]);

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
