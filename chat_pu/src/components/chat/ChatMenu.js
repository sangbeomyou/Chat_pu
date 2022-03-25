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
        </Row>
    </div>
  );
};

export default ChatMenu;