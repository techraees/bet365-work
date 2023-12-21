import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useModalContext } from '../../components/admin/contexts/ModalContext';

function ModalLimitUser() {
  const { isLimitUserModalOpen, closeLimitUserModal } = useModalContext();

  const handleOk = () => {
    closeLimitUserModal();
  };

  const handleCancel = () => {
    closeLimitUserModal();
  };

  return (
    <div>
      <Modal
        className='rounded-none'
        title="Limit User Modal"
        open={isLimitUserModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
}

export default ModalLimitUser;
