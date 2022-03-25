import React from "react";
import './Message.css'

const Message = ({ message }) => (
    message.position === "left" ? (
        <div className='messageContainer justifyEnd'>
          <p className='sentText pr-10'>{message.name}</p>
          <div className='messageBox backgroundBlue'>
            <p className='messageText colorWhite'>{message.text}</p>
          </div>
        </div>
      ) : (
        <div className='messageContainer justifyStart'>
          <div className='messageBox backgroundLight'>
            <p className='messageText colorDark'>{message.text}</p>
          </div>
          <p className='sentText pl-10 '>{message.name}</p>
        </div>
      )
  )
  
  export default Message;