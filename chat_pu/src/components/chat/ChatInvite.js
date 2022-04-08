import React, {useCallback} from "react";
import { Button, Card, Avatar, Row } from "antd";
import styled from "styled-components";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { invite_Action, invitemode_Action, changeTab_Action, roomlist_Action } from "../../reducers/chat";
import AntModal from "../AntModal";

const CardWrapper = styled(Card)`
  margin-top: 10px;
  height: 150px;
`;

const RowWrapper = styled(Row)`
  margin-top: 20px;
  width: 100%;
  float: left;
`;

const ButtonWrapper = styled(Button)`
  float: right;
  margin-right: 5px;
`;

const ChatInvite = ({ title }) => {
  const dispatch = useDispatch();
  const { invitelist } = useSelector((state) => state.chat);
  const { me } = useSelector((state) => state.user);
  const { room } = useSelector((state) => state.chat);


  const AvatarOnclick = (item) => {
    dispatch(invite_Action(invitelist.filter((el) => el !== item)));
  };

  // 서버에 채팅방 저장 함수
  const roominsert = () => {
    room ? 
    axios
    .post("/api/chatroominsert", null, {
      params: {
        usercnt: invitelist.length,
        room_id: room,
        invitelist: invitelist,
      },
    })
    .then(function (response) {
        if(!response.data.result) {
          alert("서버 오류입니다");
        } else {
            dispatch(invite_Action([]));
            dispatch(invitemode_Action(false));
            callApi();
        }
    }) : 
    axios
    .post("/api/newchatroominsert", null, {
      params: {
        usercnt: invitelist.length + 1,
        invitelist: invitelist.concat({EmpId : me[0].empno, UserName : me[0].korname}),
      },
    })
    .then(function (response) {
        if(!response.data.result) {
          alert("서버 오류입니다");
        } else {
            dispatch(invite_Action([]));
            dispatch(invitemode_Action(false));
            callApi();
        }
    })
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
            ? dispatch(roomlist_Action(response.data.posts))
            : console.error(response.data);
        });
    } catch (error) {
      console.error(error);
    }
  });

  //모달 확인버튼 누르면 실행되게 보낼 함수
  const ButtoOnclick = () => {
    invitelist.length !== 0 ? 
    roominsert()
    : alert("초대할 인원이 없습니다.")
  };

  return (
    <>
      <CardWrapper>
        <span style={{ float: "left" }}>{title}</span>
          <AntModal
            title="초대"
            content="초대 하시겠습니까?"
            ButtoOnclick={ButtoOnclick}
            css="float: right"
          />

        <ButtonWrapper onClick={() => {
                dispatch(invite_Action([]));
                dispatch(invitemode_Action(false));
                dispatch(changeTab_Action('1'));
        }}>초대 취소</ButtonWrapper>
        <RowWrapper>
          <Avatar.Group
            maxCount={5}
            size={40}
            maxStyle={{ backgroundColor: "#1890ff" }}
          >
            {invitelist.map((item, i) => (
              <div key={i}>
                <span>
                  <Avatar
                    onClick={() => AvatarOnclick(item)}
                    size={40}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {item.UserName}
                  </Avatar>
                </span>
                &nbsp; &nbsp;
              </div>
            ))}
          </Avatar.Group>
        </RowWrapper>
      </CardWrapper>
    </>
  );
};

export default ChatInvite;
