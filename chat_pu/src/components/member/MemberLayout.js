import React from "react";
import { Row, Col } from "antd";
import TreeMenu from "./TreeMenu";
import { useSelector } from "react-redux";
import MemberTable from "./MemberTable";

const Member = () => {
  const { selectedKeys, searchkeys, tree_list } = useSelector((state) => state.member);

  return (
    <div>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {tree_list
          ? <>{<TreeMenu/>}</>
          : <></>}
        </Col>
        <Col xs={24} md={18}>
          {selectedKeys || searchkeys
          ? <>{<MemberTable/>}</>
          : <></>}
        </Col>
      </Row>
    </div>
  );
};

export default Member;
