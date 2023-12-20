"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Modal } from "antd";

import { getUserById, getUsersCreatedBy } from "@/app/(app)/admin/api/userManagement";
import UserTable from "./UserTable";
import { useModalContext } from "../../../../contexts/ModalContext";

function ModalAssign() {
  const { isAssignModalOpen, closeAssignModal } =
    useModalContext();
    const { data: session }: any = useSession();
  
    const [userList, setUserList] = useState([]);
    const [parentId, setParentId] = useState(0);
  
    //transfer
    const [selectedItem, setSelectedItem] = useState(null);
  
    useEffect(() => {
      if (session !== undefined) getUserInfo();
    }, [session]);
  
    const getUserInfo = async () => {
      const _userinfo = await getUserById(
        session.user._id,
        session.user.token,
        session.user.role
      );
      const _userList = [];
      _userList.push(_userinfo);
      setUserList([..._userList]);
    };
  
    const getChildren = async (username: string, id: number) => {
      const _childrenInfo = await getUsersCreatedBy(
        id,
        session.user.token,
        session.user.role
      );
      if (_childrenInfo.length !== 0) {
        const _newUserList = addUserList(userList, username, _childrenInfo);
        setUserList([..._newUserList]);
      }
    };
  
    const removeChildren = (username: string, id: number) => {
      const _newUserList = removeUserList(userList, username, id);
      setUserList([..._newUserList]);
    };
  
    const removeUserList = (userInfo_: any[], username: string, id: number) => {
      for (let i = 0; i < userInfo_.length; i++) {
        if (Array.isArray(userInfo_[i]) === true) {
          if (userInfo_[i][0].createdBy === String(id)) {
            userInfo_.splice(i, 1);
            break;
          } else {
            removeUserList(userInfo_[i], username, id);
            if (i === userInfo_.length - 1) break;
          }
        }
      }
      return userInfo_;
    };
  
    const addUserList = (
      userInfo_: any[],
      username: string,
      _childrenInfo: any[]
    ) => {
      for (let i = 0; i < userInfo_.length; i++) {
        if (Array.isArray(userInfo_[i]) === true) {
          addUserList(userInfo_[i], username, _childrenInfo);
          if (i === userInfo_.length - 1) break;
        }
        if (userInfo_[i].username === username) {
          userInfo_.splice(i + 1, 0, _childrenInfo);
          break;
        }
      }
      return userInfo_;
    };
  
    const createTable = (child: any, open: boolean, parentId: number) => {
      return (
        <>
          <td colSpan={3} className="p-2 border border-gray-600">
            <UserTable
              parentId_={parentId}
              child={child}
              createTable={createTable}
              getChildren={getChildren}
              removeChildren={removeChildren}
            />
          </td>
        </>
      );
    };

  return (
    <Modal
      title="Select User"
      open={isAssignModalOpen}
      onCancel={closeAssignModal}
      footer={[
        <div key="close" className="flex gap-2 justify-center">
          <button
            className="px-4 py-1.5 rounded-md bg-brand-dialog-button"
            onClick={closeAssignModal}
          >
            Close
          </button>
        </div>,
      ]}
    >
      <section className="p-4">
      <div className="relative overflow-x-auto">
          {userList.length !== 0 && (
            <UserTable
              parentId_={parentId}
              child={userList}
              createTable={createTable}
              getChildren={getChildren}
              removeChildren={removeChildren}
            />
          )}
        </div>
      </section>
    </Modal>
  );
}

export default ModalAssign;
