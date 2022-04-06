import React from "react";
import "./Message.css";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const { me } = useSelector((state) => state.user);

  return message.empno === me[0].empno ? (
    <>
    <div className="sendmessageContainer justifyEnd">
      <p className="sentText pr-10 ">{message.time.substr(0, 7)}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{message.message}</p>
      </div>
    </div>
    </>
  ) : (
    <>
        <span className="sentName pr-10 justifyStart">{message.name}</span>
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{message.message}</p>
      </div>
      <p className="sentText pl-10 ">{message.time.substr(0, 7)}</p>
    </div>
    </>
  );
};
export default Message;
