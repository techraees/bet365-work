import React from 'react';
import { EditFilled, EuroOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import ModalEditUser from './ModalEditUser';
import ModalTransfer from './ModalTransfer';
import ModalLimitUser from './ModalLimitUser';
import { ModalProvider, useModalContext } from '@/contexts/ModalContext';

interface UserTabProps {
  id: number;
  username: string;
}

function UserTabTitleNode(props: UserTabProps) {
  const { openEditUserModal, openTransferModal, openLimitUserModal } = useModalContext();

  return (
    <div className='flex flex-row space-x-4'>
      <div className=''>
        [{props.id}] - {props.username}
      </div>
      <div>
        <EditFilled className='hover:text-[#00dfa9]' onClick={openEditUserModal} />
      </div>
      <div>
        <EuroOutlined className='hover:text-[#00dfa9]' onClick={openTransferModal} />
      </div>
      <div>
        <UserDeleteOutlined className='hover:text-[#FF0000]' onClick={openLimitUserModal} />
      </div>

      <ModalEditUser />
      <ModalTransfer />
      <ModalLimitUser />
    </div>
  );
}

export default UserTabTitleNode;
