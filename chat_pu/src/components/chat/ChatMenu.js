import React from "react";
import styled from "styled-components";
import { Input, Row, Card } from "antd";
const { Search } = Input;

const SearchInput = styled(Search)`
    padding: 10px;
    border: none;
    border-bottom: 1px solid #BDBDBD;
`;

const CardWrapper = styled(Card)`
  margin-top: 10px;
`;

const onSearch = value => console.log(value);

const ChatMenu = () => {
  return (
    <div>
      <CardWrapper>
        <Row>
            <SearchInput placeholder="" onSearch={onSearch} />  
        </Row>
        </CardWrapper>
        <Row>
          체팅방 목록 넣을꺼임
        </Row>
    </div>
  );
};

export default ChatMenu;