import React from "react";

import { Row, Col } from "antd";
import { useSelector } from "react-redux";

import ChatMenu from "./ChatMenu";
import ChatBox from "./chatmessage/ChatBox";
import Online from "./Online";
import ChatInvite from "./ChatInvite";
// import MemberInfo from "../member/MemberInfo";

// import NewWindow from "react-new-window";

const ChatLayout = () => {
  // const { member_info } = useSelector((state) => state.member);

  const { room, roomlist, invitemode } = useSelector((state) => state.chat);
  // const { invitelist } = useSelector((state) => state.chat);

  // const [chatroomdata, setchatroomdata] = useState([
  //   { room: 1, isopen: false },
  //   { room: 2, isopen: false },
  //   { room: 3, isopen: false },
  //   { room: 4, isopen: false },
  // ]);

  // const opensubmit = (i) => {
  //   setchatroomdata(
  //     chatroomdata.map((item, index) =>
  //       index === i ? { ...item, isopen: true } : item
  //     )
  //   );
  // };

  // const closesubmit = (i) => {
  //   setchatroomdata(
  //     chatroomdata.map((item, index) =>
  //       index === i ? { ...item, isopen: false } : item
  //     )
  //   );
  // };

  // const chatroom = chatroomdata.map((item, i) => (
  //   <div key={i}>
  //     <Button onClick={() => opensubmit(i)}>{item.room}</Button>
  //     {item.isopen ? (
  //       <NewWindow
  //         width={500}
  //         height={600}
  //         onUnload={() => closesubmit(i)}
  //         title={item.room}
  //       >
  //         <ChatBox></ChatBox>
  //       </NewWindow>
  //     ) : (
  //       console.log("")
  //     )}
  //   </div>
  // ));
  //겹처서 생성이되어서 키값을 넣어저 다른컴포넌트로 인식시킨다음에 사용 머라는지 모르것다
  const roomlistaa = roomlist.filter((item) => item.room_id === room);

  return (
    <div>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          <Online />
          {invitemode ? (
            room ? (
              <ChatInvite title="현재 채팅방에 초대" />
            ) : (
              <ChatInvite title="새 채팅방 만들기" />
            )
          ) : (
            <></>
          )}

          <ChatMenu />
        </Col>
        <Col xs={24} md={12}>
          {room && (
            roomlistaa.map((item) => (
              <div key={item.room_id}>
                <ChatBox />
              </div>
            ))
          )}
        </Col>
        <Col xs={24} md={6}>
          {/* {member_info ? <>{<MemberInfo />}</> : <></>} */}
        </Col>
      </Row>
    </div>
  );
};

export default ChatLayout;
