import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { List, Avatar, Input } from "antd";
import VirtualList from "rc-virtual-list";
import { invite_Action } from "../../../reducers/chat";

const { Search } = Input;

const SearchInput = styled(Search)`
  padding-bottom: 10px;
  border: none;
  border-bottom: 1px solid #bdbdbd;
`;

const ChatUserList = () => {
  const dispatch = useDispatch();
  //리듀서에 저장된 맴버 리스트를 불러온다
  const { me } = useSelector((state) => state.user);
  const { member_list } = useSelector((state) => state.member);
  const { invitelist } = useSelector((state) => state.chat);
  const { invitemode } = useSelector((state) => state.chat);

  //체크되면 사번이 배열에 하나씩 추가되게 배열을 선언
  // const [inviteCheck, setinviteCheck] = useState([]);
  // 리듀서의 맴버리스트를 검색어 필터를 걸어 사용해야함으로 다시 스테이트에 저장
  const [member_list_se, setmember_list_se] = useState(member_list.filter((el) => el.EmpId !== me[0].empno));
  // const onchange = (checked, item) => {
  //   //체크가 트루일때
  //   if (checked) {
  //     //사번 하나씩 배열에 추가
  //     setinviteCheck(inviteCheck.concat(item));
  //   } else {
  //     //false 일떄 사번을 찾아서 아닌것(True)인거 체크된거 다시 배열에 추가
  //     setinviteCheck(inviteCheck.filter((el) => el.EmpId !== item.EmpId));
  //   }
  // };
  //검색함수
  const onSearch = (value) => {
    setmember_list_se(
      member_list.filter(
        (item) => (item.UserName.includes(value) || item.DeptName.includes(value)) && item.EmpId !== me[0].empno
      )
    );
  };

  const onclick = (item) => {
    if (invitemode) {
      if (invitelist.includes(item)) {
        //setinviteCheck(inviteCheck.filter((el) => el !== item))
        dispatch(invite_Action(invitelist.filter((el) => el !== item)));
      } else {
        //setinviteCheck(inviteCheck.concat(item));
        dispatch(invite_Action(invitelist.concat(item)));
      }
    }
  };

  // useEffect(() => {

  //   dispatch(invite_Action(inviteCheck));
  // }, [dispatch, inviteCheck]);

  return (
    <div>
      <SearchInput placeholder="이름 부서" onSearch={onSearch} />
      <List>
        <VirtualList
          data={member_list_se}
          height={window.innerHeight / 2 - 50}
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
                onClick={() => onclick(item)}
              />
              {/* <Checkbox id={item.EmpId} onChange={onchange}></Checkbox> */}
              <div onClick={() => console.log(item)}>
                {/* <input
                  type="checkbox"
                  value={item.EmpId}
                  onChange={(e) => onchange(e.target.checked, item)}
                  checked={inviteCheck.includes(item) ? true : false}
                ></input> */}
                정보보기
              </div>
            </List.Item>
          )}
        </VirtualList>
      </List>
    </div>
  );
};

export default ChatUserList;
