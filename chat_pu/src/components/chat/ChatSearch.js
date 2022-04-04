import React from "react";
import styled from "styled-components";
import { Input, Row, Card} from "antd";
const { Search } = Input;

const SearchInput = styled(Search)`
  padding: 10px;
  border: none;
  border-bottom: 1px solid #bdbdbd;
`;

const CardWrapper = styled(Card)`
  margin-top: 10px;
`;

const onSearch = (value) => console.log(value);

const ChatSearch = () => {

  return (
    <div>
        <Row>
          <SearchInput placeholder="" onSearch={onSearch} />
        </Row>

    </div>
  );
};

export default ChatSearch;
