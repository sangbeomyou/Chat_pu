import React, { useEffect, useCallback } from "react";
import axios from "axios";
import { Menu, Input, Avatar, Badge, Button } from "antd";
import { Link, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { UserOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../reducers/user";
import { tree_Action, memberlist_Action } from "../reducers/member";
import Member from "./member/MemberLayout";
import Chat from "./chat/ChatLayout";
import { socket } from "./chat/Socket";

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
  margin-top: 5px;
  margin-bottom: 10px;
`;
const LeftMenu = styled(Menu.Item)`
  margin-left: auto;
`;

const AppLayout = () => {
  const dispatch = useDispatch();

  const onsubmitForm = () => {
    dispatch(logoutAction());
  };

  const { me } = useSelector((state) => state.user);

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

  useEffect(() => {
    socket.emit("joinRoom", { roomId: "1", name: me[0].korname });
    socket.on("chat message", (message, name) => {
      console.log(message, name);
    });
    callApi();
  }, [callApi, me]);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="member">
          <Link to="/member">맴버</Link>
        </Menu.Item>
        <Menu.Item key="chat">
          <Link to="/chat">채팅</Link>
        </Menu.Item>
        <Menu.Item key="schedule">
          <Link to="/schedule">일정</Link>
        </Menu.Item>
        <Menu.Item key="search">
          <SearchInput enterButton />
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
