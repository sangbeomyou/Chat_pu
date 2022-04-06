import React from "react";
import { Card, Avatar, Badge, Row, Button } from "antd";
import styled from "styled-components";
import { useSelector } from "react-redux";

const CardWrapper = styled(Card)`
  margin-top: 10px;
`;
const RowWrapper = styled(Row)`
  margin-top: 20px;
`;
const ButtonWrapper = styled(Button)`
  float: right;
`;
const ChatInvite = ({title}) => {
  const { invitelist } = useSelector((state) => state.chat);

  return (
    <>
          <CardWrapper>
            <span>{title}</span>
            <ButtonWrapper type="primary">초대</ButtonWrapper>
            <RowWrapper>
            <Avatar.Group
                maxCount={5}
                size={40}
                maxStyle={{ backgroundColor: "#1890ff" }}
              >
                {invitelist.map((item, i) => (
                  <div key={i}>
                    <span>
                        <Avatar size={40}> {item.UserName}</Avatar>
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
