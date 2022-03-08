import React from "react";
import styled from "styled-components";
import { Input, Row } from "antd";
const { Search } = Input;

const SearchInput = styled(Search)`
    padding: 15px;
    margin-left: 10px;
    border: none;
    border-bottom: 1px solid #BDBDBD;
`;

const onSearch = value => console.log(value);

const ChatMenu = () => {
  return (
    <div>
        <Row>
            <SearchInput placeholder="" onSearch={onSearch} />  
        </Row>
        <Row>
        </Row>
    </div>
  );
};

export default ChatMenu;