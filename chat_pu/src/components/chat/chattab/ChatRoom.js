import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { newroomclick_Action, roomlist_Action, room_Action } from "../../../reducers/chat";
import { List, Input, Button, Row } from "antd";
import VirtualList from "rc-virtual-list";

const { Search } = Input;

const SearchInput = styled(Search)`
  padding-bottom: 10px;
  border: none;
  border-bottom: 1px solid #bdbdbd;
`;

const ButtonWrapper = styled(Button)`
  margin-top: 10px;
  margin-right: 20px;
  position: absolute;
  right: 0;
  z-index: 99;
`;

const ChatRoom = () => {
  const dispatch = useDispatch();

  //기본 배열
  const { roomlist } = useSelector((state) => state.chat);
  const { room } = useSelector((state) => state.chat);
  const { me } = useSelector((state) => state.user);

  //검색 배열
  const [seachroomdlist, setseachroomdlist] = useState([]);

  const setup = (data) => {
    setseachroomdlist(data);
    dispatch(roomlist_Action(data));
  };
  const callApi = useCallback(async () => {
    try {
      await axios
        .post("/api/chatroomlist", null, {
          params: {
            empno: me[0].empno,
          },
        })
        .then(function (response) {
          response.data.result
            ? setup(response.data.posts)
            : alert("서버 오류 입니다.");
        });
    } catch (error) {
      console.error(error);
    }
  });
  // 컴포넌트 재 생성될때 실행
  useEffect(() => {
    callApi();
  }, []);

  // 검색 함수
  const onSearch = (value) => {
    setseachroomdlist(
      roomlist.filter((item) => item.chatusers.includes(value))
    );
  };

  return (
    <div>
      <SearchInput placeholder="이름" onSearch={onSearch} />
      <Row>
        <ButtonWrapper
          onClick={() => {dispatch(newroomclick_Action("2"))
        }}
          type="primary"
        >
          새 방 만들기
        </ButtonWrapper>
      </Row>
      <List>
        <VirtualList
          data={seachroomdlist}
          height={540}
          itemHeight={47}
          itemKey="EmpId"
        >
          {(item, i) => (
            <List.Item
              style={{
                cursor: "pointer",
              }}
              key={i}
            >
              <List.Item.Meta
                onClick={() => {
                  dispatch(room_Action(item.room_id));
                }}
                title={item.chatusers}
                description={item.chatusers}
              />
            </List.Item>
          )}
        </VirtualList>
      </List>
    </div>
  );
};

export default ChatRoom;
