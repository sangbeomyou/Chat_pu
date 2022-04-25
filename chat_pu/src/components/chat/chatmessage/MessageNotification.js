import React from "react";
import styled from "styled-components";
import "moment/locale/ko";

const MsgNotificationWrapper = styled.div`
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    bottom: 70px;
    right: 30px;
    z-index: 200;
    width: 96%;
    border-radius: 10px;
    padding: 10px;
    background: #6e6e6e;
    &:hover {
        cursor: pointer;
        border: 1px solid #000;
    }
    
    & i {
        display: block;
        color: #fff;
        text-align: right;
        font-size: 20px;        
    }
    @media only screen and (max-width: 960px){
        width: 90%;
    } 
`;

const NotificationBlockWrapper = styled.div`
    position: relative;
    width: 95%;
    padding-left: 23px;
    display: flex;
    & img {
        position: absolute;
        left: 0;
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 8px;
        margin-right: 10px;
    }
    & span {
        display: inline-block;
        color: #fff;
        overflow: hidden;
        &.name{
            white-space: nowrap;
            text-overflow: ellipsis;
            max-width: 100px;
            color: #bebebe;
            margin-right: 10px;
        }
        &.msg {
            word-wrap: break-word;
            white-space: pre-wrap;
            display: -webkit-box;
            -webkit-line-clamp: 1; 
            -webkit-box-orient: vertical;
            width: 90%;
        }
    }
`

const MessageNotification = ({ Message }) => {

  const onDownClick = () => {
    console.log('ssss')
  }

  return (
    <MsgNotificationWrapper onClick={onDownClick}>
    <NotificationBlockWrapper>
        <span className="name">{Message.name}</span>
        <span className="msg">{Message.msg}</span>
    </NotificationBlockWrapper>
    <i className="fas fa-angle-down"/>  
</MsgNotificationWrapper>
  );
};

export default MessageNotification;
