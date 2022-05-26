import React, { useEffect } from "react";
import styled from "styled-components";
import Message from "./Message";
import { useInView } from "react-intersection-observer"
import "moment/locale/ko";
import moment from "moment";
import ScrollToBottom from "react-scroll-to-bottom";
import { useDispatch } from "react-redux";
import { infinitestate_Action } from "../../../reducers/chat";

const Messagebox = styled(ScrollToBottom)`
  padding: 0;
  overflow: auto;
  flex: auto;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;

const BorderBlock = styled.div`
  position: relative;
  text-align: center;
  width: 100%;
  padding: 13px 0;
  & span {
    border-radius: 15px;
    position: relative;
    display: inline-block;
    background-color: #b2c7d9;
    padding: 0 10px;
  }
  &:before {
    content: "";
    display: block;
    position: absolute;
    left: 2%;
    top: 50%;
    width: 96%;
    height: 1px;
    background-color: #727b83;
  }
`;

const ChatMessages = ({ receiveMessage }) => {
  const messages = [...receiveMessage].reverse();
  const [ref, inView] = useInView()
  const dispatch = useDispatch();

  // const scrollToTop = (inView) => {
  //   console.log(inView)
  // }


  useEffect(() => {
    dispatch(infinitestate_Action(inView))
  }, [inView, dispatch])

  return (
    <Messagebox>
      {messages.map((message, i) => (
        <div key={i}>
          {i >= 1 ? (
            moment(messages[i - 1].time).format("YYYY년 MM월 DD일") !==
            moment(message.time).format("YYYY년 MM월 DD일") ? (
              <BorderBlock>
                <span>{moment(message.time).format("YYYY년 MM월 DD일")}</span>
              </BorderBlock>
            ) : null
          ) : (
            <BorderBlock>
              <span>{moment(message.time).format("YYYY년 MM월 DD일")}</span>
            </BorderBlock>
          )}
          {i === 0 ? (
            <div ref={ref}
            >
              <Message message={message} />
            </div>
          ) : (
            <div>
              <Message message={message} />
            </div>
          )}
        </div>
      ))}
    </Messagebox>
  );
};

export default ChatMessages;