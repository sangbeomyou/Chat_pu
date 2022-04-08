import React, { useEffect, useState, useCallback } from "react";
import { Button, Input, Card, Menu, Dropdown } from "antd";
import { socket } from "../Socket";
import { useSelector, useDispatch } from "react-redux";
import ChatMessages from "./ChatMessages";
import axios from "axios";
import styled from "styled-components";
import "moment/locale/ko";
import moment from "moment";
import { invitemode_Action, room_Action, roomlist_Action } from "../../../reducers/chat";

const Container = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
  border: 0.1px solid #eaeaea;
  height: 90vh;
  width: 100%;
`;

const DropdownWrapper = styled(Dropdown)`
  float: right;
`;

const ChatBox = () => {
  const dispatch = useDispatch();
  //시간저장을 위해 현 시간 가지고 오기
  moment.locale("ko");
  // const momenttime = moment(moment().format("YYYY-MM-DD HH:mm:ss")).format(
  //   "LTS"
  // );
  const momenttime = moment().format("YYYY-MM-DD HH:mm:ss");
  
  const [sendMessage, setsendMessage] = useState("");
  const [receiveMessage, setreceiveMessage] = useState([]);
  const { me } = useSelector((state) => state.user);
  const { roomlist } = useSelector((state) => state.chat);
  const { room } = useSelector((state) => state.chat);

  const onChange = (e) => {
    setsendMessage(e.target.value);
  };

  const onsubmitForm = () => {
    //공백 안들어가게
    if (sendMessage !== "") {
      setreceiveMessage((currentArray) => [
        {
          message: sendMessage.trim(),
          time: momenttime,
          room_id: room,
          empno: me[0].empno,
          name: me[0].korname,
        },
        ...currentArray,
      ]);
      //소켓 보내기
      socket.emit(
        "chat message",
        sendMessage.trim(),
        momenttime,
        room,
        me[0].korname,
        me[0].empno
      );
      //db에 저장
      axios
        .post("/api/sendchatmessage", null, {
          params: {
            message: sendMessage.trim(),
            time: momenttime,
            room_id: room,
            empno: me[0].empno,
          },
        })
        .then(function (response) {
          if (!response.data.result) {
            alert("서버 오류입니다");
          }
        });
      setsendMessage("");
    }
  };

  //방목록 다시 
  const callRoomList = useCallback(async () => {
    try {
      await axios
        .post("/api/chatroomlist", null, {
          params: {
            empno: me[0].empno,
          },
        })
        .then(function (response) {
          response.data.result
            ? dispatch(roomlist_Action(response.data.posts))
            : console.error(response.data);
        });
    } catch (error) {
      console.error(error);
    }
  });

  const userExit = () => {
          axios
          .post("/api/chatroomexit", null, {
            params: {
              room_id: room,
              empno: me[0].empno,
            },
          })
          .then(function (response) {
            if (!response.data.result) {
              alert("서버 오류입니다");
            } else {
            callRoomList();
            dispatch(room_Action(null));
            }
          });
  }
  // 방 인원 목록
  const roomtitle = roomlist.filter((item) => item.room_id === room)[0];

  useEffect(() => {
    socket.on("chat message", (message, time, roomId, name, empno) => {
      console.log(message, time, roomId, name, empno);
      roomId === room
        ? setreceiveMessage((currentArray) => [
            {
              message: message,
              time: time,
              room_id: roomId,
              empno: empno,
              name: name,
            },
            ...currentArray,
          ])
        : console.log({ text: message, position: "다른방", name: name });
    });
  }, [room]);
  //메세지 목록 불러오기
  const callApi = useCallback(async () => {
    try {
      await axios
        .post("/api/chatmessagelist", null, {
          params: {
            room: room,
          },
        })
        .then(function (response) {
          response.data.result
            ? setreceiveMessage(response.data.posts)
            : console.log(response.data.posts);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    callApi();
  }, []);

  //나가기와 인원초대 메뉴
  const menu = (
    <Menu>
      <Menu.Item>
        <div onClick={() => dispatch(invitemode_Action(true))}>
          인원 초대하기
        </div>
      </Menu.Item>
      <Menu.Item>
        <div onClick={() => userExit()}>나가기</div>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Container>
        <Card>
          {roomtitle.chatusers}
          <DropdownWrapper overlay={menu} placement="bottomLeft" arrow>
            <Button type="text">. . . .</Button>
          </DropdownWrapper>
        </Card>

        <ChatMessages receiveMessage={receiveMessage}></ChatMessages>
        <Input.Group compact>
          <Input
            value={sendMessage}
            onPressEnter={onsubmitForm}
            onChange={onChange}
            style={{ width: "calc(100% - 73px)" }}
          />
          <Button onClick={onsubmitForm} type="primary">
            보내기
          </Button>
        </Input.Group>
      </Container>
    </>
  );
};
export default ChatBox;
