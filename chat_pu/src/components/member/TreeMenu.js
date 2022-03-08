import React from "react";
import { Tree, Input, Card } from "antd";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { expanded_Action, selected_Action, search_Action } from "../../reducers/member";

const { Search } = Input;

const { DirectoryTree } = Tree;

const TreeWrapper = styled(DirectoryTree)`
  margin-top: 20px;
`;

const CardWrapper = styled(Card)`
  margin-top: 10px;
`;

const SearchInput = styled(Search)`
  padding: 10px;
  border: none;
  border-bottom: 1px solid #bdbdbd;
`;

function TreeMenu() {
  const { tree_list, expandedKeys, selectedKeys } = useSelector(
    (state) => state.member
  );
  const dispatch = useDispatch();

  const onSelect = (keys, info) => {
    dispatch(selected_Action(keys));
    
  };

  const onExpand = (keys) => {
    dispatch(expanded_Action(keys));
  };

  const onSearch = (value) => {
    dispatch(search_Action(value));
  };

  return (
    <CardWrapper>
      <SearchInput placeholder="" onSearch={onSearch} />

      <TreeWrapper
        multiple
        defaultExpandedKeys={expandedKeys}
        defaultSelectedKeys={selectedKeys}
        onSelect={onSelect}
        onExpand={onExpand}
        treeData={tree_list}
      />
    </CardWrapper>
  );
}

export default TreeMenu;
