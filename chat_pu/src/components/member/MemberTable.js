import React from "react";
import axios from "axios";
import { Table, Card } from "antd";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import MemberInfo from "./MemberInfo";
import { memberinfo_Action } from "../../reducers/member";

const CardWrapper = styled(Card)`
  margin-top: 10px;
`;

const columns = [
  {
    title: "이름",
    dataIndex: "UserName",
    key: "UserName",
  },
  {
    title: "직책",
    dataIndex: "JikChaek",
    key: "JikChaek",
  },
  {
    title: "직위",
    dataIndex: "JikWi",
    key: "JikWi",
  },
  {
    title: "부서명",
    dataIndex: "DeptName",
    key: "DeptName",
  },
];

function MemberCard() {
  const dispatch = useDispatch();
  
  const { member_list, selectedKeys, searchkeys, member_info } = useSelector(
    (state) => state.member
  );

  const select_items = member_list.filter((item) =>
    searchkeys
      ? item.UserName.includes(searchkeys) || item.DeptName.includes(searchkeys)
      : item.DeptId === selectedKeys[0]
  );

  const onRowClick = (record) => {
    axios
      .post("/api/member_info", null, {
        params: {
          empno: record.EmpId,
        },
      })
      .then(function (response) {
        response.data.result
          ? dispatch(memberinfo_Action(response.data.posts))
          : alert("서버 오류입니다.");
      });
  };

  return (
    <>
      <CardWrapper>
        <Table
          columns={columns}
          dataSource={select_items}
          pagination={false}
          onRow={(record) => ({
            onClick: () => {
              onRowClick(record);
            },
          })}
        />
      </CardWrapper>
      {member_info ? <>{<MemberInfo />}</> : <></>}
    </>
  );
}

export default MemberCard;
