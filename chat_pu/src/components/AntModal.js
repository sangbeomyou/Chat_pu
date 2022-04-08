import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import styled from "styled-components";


const AntModal = ({title, content, ButtoOnclick, css}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const ButtonWrapper = styled(Button)`
    ${css}
  `;

    const showModal = () => {
      setIsModalVisible(true)
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
      ButtoOnclick();
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
  
    return (
      <div>
      <ButtonWrapper type="primary" onClick={showModal}>
        {title}
      </ButtonWrapper>
      <Modal okText="확인" cancelText="취소" title="" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>{content}</p>
      </Modal>
      </div>
    );
  };
  
  export default AntModal;