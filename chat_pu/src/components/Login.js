import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Input, Button, Card, Row, Col } from "antd";
import styled from "styled-components";
import { loginAction } from "../reducers/user";
import { useDispatch } from "react-redux";

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 200px;
`;

const CardWrapper = styled(Card)`
  background-color: #f2f2f2;
`;

function Login() {
  const dispatch = useDispatch();

  const [id, onChangeid] = useState("");
  const [password, onChangePassword] = useState("");

  // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
  const handleInputId = (e) => {
    onChangeid(e.target.value);
  };

  const handleInputPw = (e) => {
    onChangePassword(e.target.value);
  };

  const onsubmitForm = () => {

    axios
      .post("/api/login", null, {
        params: {
          empno: id,
          passwd: password,
        },
      })
      .then(function (response) {
        response.data.result
          ? dispatch(loginAction(response.data.posts))
          : alert("아이디와 비밀번호를 확인해주세요");
      });
  };

  // useEffect(() => {
  //   axios.get("/sss/api/fnlttMultiAcnt.json?crtfc_key=eca02adc604b222887bb4f46c21a8bcf667ebeea&corp_code=00120571&bsns_year=2021&reprt_code=11011", null, {}).then(function (response) {
  //     console.log(response.data);
  //   });
  // }, []);

  return (
    <Row gutter={8}>
      <Col xs={24} md={6}></Col>

      <Col xs={24} md={12}>
        <FormWrapper onFinish={onsubmitForm}>
          <CardWrapper>
            <Form.Item>
              <label htmlFor="user-id">아이디</label>
              <br />
              <Input
                name="user-id"
                type="id"
                value={id}
                onChange={handleInputId}
                required
              />
            </Form.Item>
            <Form.Item>
              <label htmlFor="user-password">비밀번호</label>
              <br />
              <Input
                name="user-password"
                type="password"
                value={password}
                onChange={handleInputPw}
                required
              />
            </Form.Item>
            <ButtonWrapper>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  로그인
                </Button>
              </Form.Item>
            </ButtonWrapper>
          </CardWrapper>
        </FormWrapper>
      </Col>
    </Row>
  );
}

export default Login;
