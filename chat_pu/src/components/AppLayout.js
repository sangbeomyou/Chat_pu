import React, { useEffect, useCallback } from "react";
import axios from "axios";
import { Menu, Avatar, Badge, Button } from "antd";
import { Link, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { UserOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction, onlineUsersAction } from "../reducers/user";
import { tree_Action, memberlist_Action } from "../reducers/member";
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
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  //소켓 방에 가입 1번 이건 따로 로직짜서 초대 원랴 있던방등 바꾸어 줘야함
  useEffect(() => {
    socket.emit("joinRoom", { roomId: "1", name: me[0].korname });
    callApi();
    // 채팅페이지 접속한 유저를 실시간으로 받아오는 로직 로그인 하거나 나갈때 배열에서 추가하거나 뺴고 여기로 뿌려준다. 
    socket.on("chat online", (online) => {
      dispatch(onlineUsersAction(online));
    });

  }, [dispatch, callApi, me]);

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
