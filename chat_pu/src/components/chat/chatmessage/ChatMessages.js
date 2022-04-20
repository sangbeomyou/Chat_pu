import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Message from "./Message";
import { InView } from "react-intersection-observer";

const Messagebox = styled.div`
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

const ChatMessages = ({ receiveMessage }) => {
  const messages = [...receiveMessage].reverse();
  const scrollRef = useRef();

  const scrollToBottom = () => {
    scrollRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };
  useEffect(() => {
    return scrollToBottom();
  }, [messages]);

  const scrollToTop = (inView) => {
    console.log(inView)
  }

  return (
    <Messagebox>
      {messages.map((message, i) => (
        <div key={i}>
          {i === 0 ? (
            <InView onChange={(inView) => scrollToTop(inView)}>
              <Message message={message} />
            </InView>
          ) : (
            <div>
              <Message message={message} />
            </div>
          )}
        </div>
      ))}
      <div ref={scrollRef}></div>
    </Messagebox>
  );
};

export default ChatMessages;
