import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { List, Avatar, Input } from "antd";
import VirtualList from "rc-virtual-list";
const { Search } = Input;

const SearchInput = styled(Search)`
  padding-bottom: 10px;
  border: none;
  border-bottom: 1px solid #bdbdbd;
`;

const ChatUserList = () => {
  //리듀서에 저장된 맴버 리스트를 불러온다
  const { member_list } = useSelector((state) => state.member);
  //체크되면 사번이 배열에 하나씩 추가되게 배열을 선언
  const [inviteCheck, setinviteCheck] = useState([]);
  // 리듀서의 맴버리스트를 검색어 필터를 걸어 사용해야함으로 다시 스테이트에 저장
  const [member_list_se, setmember_list_se] = useState(member_list);

  const onchange = (checked, item) => {
    //체크가 트루일때
    if (checked) {
      //사번 하나씩 배열에 추가
      setinviteCheck(inviteCheck.concat(item.EmpId));
    } else {
      //필터로 사번이 찾아서 아닌것만 다시 배열에 추가
      setinviteCheck(inviteCheck.filter((el) => el !== item.EmpId));
    }
  };
  //검색함수
  const onSearch = (value) => {
    console.log(value);
    setmember_list_se(
      member_list.filter(
        (item) => item.UserName.includes(value) || item.DeptName.includes(value)
      )
    );
  };


  return (
    <div>
      <SearchInput placeholder="이름 부서" onSearch={onSearch} />

      <List>
        <VirtualList
          data={member_list_se}
          height={540}
          itemHeight={47}
          itemKey="EmpId"
        >
          {(item) => (
            <List.Item
              style={{
                cursor: "pointer",
              }}
              key={item.EmpId}
            >
              <List.Item.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={item.UserName}
                description={item.DeptName}
                onClick={() => {
                  console.log(item);
                }}
              />
              {/* <Checkbox id={item.EmpId} onChange={onchange}></Checkbox> */}
              <div>
                <input
                  type="checkbox"
                  value={item.EmpId}
                  onChange={(e) => onchange(e.target.checked, item)}
                  checked={inviteCheck.includes(item.EmpId) ? true : false}
                ></input>
              </div>
            </List.Item>
          )}
        </VirtualList>
      </List>
    </div>
  );
};

export default ChatUserList;
