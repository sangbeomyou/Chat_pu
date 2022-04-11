import React, { useEffect, useCallback } from "react";
import axios from "axios";
import { Menu, Avatar, Badge, Button } from "antd";
import { Link, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { UserOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction, onlineUsersAction } from "../reducers/user";
import { tree_Action, memberlist_Action } from "../reducers/member";
import { roomlist_Action } from "../reducers/chat"
import Member from "./member/MemberLayout";
import Chat from "./chat/ChatLayout";
import { socket } from "./chat/Socket";


const LeftMenu = styled(Menu.Item)`
  margin-left: auto;
`;

const AppLayout = () => {
  // 초기 화면
  const dispatch = useDispatch();

  const onsubmitForm = () => {
    dispatch(logoutAction());
    socket.emit("logout");
  };

  // 유저 정보 받아옴
  const { me } = useSelector((state) => state.user); 
  const { room } = useSelector((state) => state.chat); 

  // 유저 정보 세션에 저장
  localStorage.setItem('me', JSON.stringify(me));

  //멤버 페이지의 회사 트리메뉴와 직원 정보  리듀서에 저장
  const callApi = useCallback(async () => {
    try {
      await axios.post("/api/tree_menu", null, {}).then(function (response) {
        response.data.result
          ? dispatch(tree_Action(response.data.posts))
          : alert("서버 오류 입니다.");
      });
      await axios.post("/api/member_list", null, {}).then(function (response) {
        response.data.result
          ? dispatch(memberlist_Action(response.data.posts))
          : alert("서버 오류 입니다.");
      });
      await axios
      .post("/api/chatroomlist", null, {
        params: {
          empno: me[0].empno,
        },
      })
      .then(function (response) {
        response.data.result
          ? connect_room(response.data.posts)
          : alert("서버 오류 입니다.");
      });
      
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  const connect_room = (data) => {
    dispatch(roomlist_Action(data))
    const datalist = []
    data.map((item) => {
      datalist.push(item.room_id)
    })
    socket.emit("joinRoom", { roomId: datalist, name: me[0].korname, empno: me[0].empno });
  }

  useEffect(() => {
    callApi();
  //소켓 방에 가입 1번 이건 따로 로직짜서 초대 원랴 있던방등 바꾸어 줘야함

  }, [callApi]);
  
  useEffect(() => {
  socket.on("chat online", (online) => {
    dispatch(onlineUsersAction(online));
  });
    // 최신 메시지를 저장
    socket.on("chat message", (message, time, roomId, name, empno) => {
        console.log({ text: message, time : time, roomId: roomId, name: name, empno : empno })
    });
  }, [dispatch, me, room]);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="member">
          <Link to="/member">조직도</Link>
        </Menu.Item>
        <Menu.Item key="chat">
          <Link to="/chat">채팅</Link>
        </Menu.Item>
        <Menu.Item key="schedule">
          <Link to="/schedule">일정</Link>
        </Menu.Item>

        <LeftMenu key="name" disabled="false">
          <span>{me[0].korname}</span>
        </LeftMenu>
        <Menu.Item key="avatar" disabled="false">
          <Badge dot>
            <Avatar shape="square" icon={<UserOutlined />} />
          </Badge>
        </Menu.Item>
        <Menu.Item key="logout">
          <Button onClick={onsubmitForm}>로그아웃</Button>
        </Menu.Item>
      </Menu>
      <Routes>
        <Route exact path="/member" element={<Member />} />
        <Route exact path="/chat" element={<Chat />} />
        <Route exact path="/" element={<></>} />
      </Routes>
    </div>
  );
};

export default AppLayout;
