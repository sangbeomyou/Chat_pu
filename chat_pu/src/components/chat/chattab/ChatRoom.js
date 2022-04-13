import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { newroomclick_Action, room_Action } from "../../../reducers/chat";
import { List, Input, Button, Row } from "antd";
import VirtualList from "rc-virtual-list";
import { socket } from "../Socket";

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


  const [seachroomlist, setseachroomlist] = useState(roomlist);

  // const setup = (data) => {
  //   setseachroomdlist(data);
  //   dispatch(roomlist_Action(data));
  // };

  // const callApi = useCallback(async () => {
  //   try {
  //     await axios
  //       .post("/api/chatroomlist", null, {
  //         params: {
  //           empno: me[0].empno,
  //         },
  //       })
  //       .then(function (response) {
  //         response.data.result
  //           ? setup(response.data.posts)
  //           : console.error(response.data);
  //       });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // });
  useEffect(() => {
      // 최신 메시지를 저장
      socket.on("chat message", (message, time, roomId, name, empno) => {
        setseachroomlist(
          roomlist.map((item) => item.room_id === roomId ? {...item, message : message} : item)
        )
      });
    }, [roomlist]);

console.log(roomlist)
  // 검색 함수
  const onSearch = (value) => {
    setseachroomlist(
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
          data={seachroomlist}
          height={window.innerHeight/2}
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
                description={item.message ? item.message : "대화 없음"}
              />
            </List.Item>
          )}
        </VirtualList>
      </List>
    </div> 
  );
};

export default ChatRoom;
