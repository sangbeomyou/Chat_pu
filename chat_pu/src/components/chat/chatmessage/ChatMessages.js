import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import styled from "styled-components";
import Message from './Message'

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

const ChatMessages = ({ receiveMessage }) => {
    const messages = [...receiveMessage].reverse();
  return (
  <Messagebox>
    {messages.map((message , i) => (
      <div key={i}>
        <Message message={message}/>
      </div>
    ))}
  </Messagebox>)
}

export default ChatMessages;
