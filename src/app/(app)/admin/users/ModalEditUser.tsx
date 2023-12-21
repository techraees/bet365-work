import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import { useModalContext } from '../../components/admin/contexts/ModalContext';

function ModalEditUser() {
  const { isEditUserModalOpen, closeEditUserModal } = useModalContext();

  const handleOk = () => {
    closeEditUserModal();
  };

  const handleCancel = () => {
    closeEditUserModal();
  };

  return (
    <div>
      <Modal
        className='rounded-none'
        title="Edit User"
        open={isEditUserModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <div key="submit" className='flex flex-row items-center justify-center'>
            <Button onClick={handleOk}>
              Submit
            </Button>
          </div>
        ]}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
}

export default ModalEditUser;
