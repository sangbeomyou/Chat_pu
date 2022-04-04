import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { List, Avatar, Checkbox } from "antd";
import ScrollToBottom from 'react-scroll-to-bottom'

const Scroll = styled(ScrollToBottom)`
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

const ChatUserList = () => {
  const { member_list } = useSelector((state) => state.member);
  const [inviteCheck, setinviteCheck] = useState([]);

  function onchange(checked, item) {
      if(checked) {
        setinviteCheck(inviteCheck.concat(item.UserName));
      } else {
        setinviteCheck(inviteCheck.filter((el) => el !== item.UserName)); 
      }

  }

  console.log(inviteCheck);

  return (
    <Scroll>
    <div>
<List
dataSource={member_list}
renderItem={item => (
            <List.Item >
              <List.Item.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={item.UserName}
                description={item.DeptName}
              />
              {/* <Checkbox id={item.EmpId} onChange={onchange}></Checkbox> */}
              <div>
              <input  type="checkbox" value={item.EmpId} onChange={(e)=>onchange(e.target.checked, item)}></input>
              </div>
            </List.Item>
)}
/>
    </div>
    </Scroll>

  );
};

export default ChatUserList;
