"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import { getUsersCreatedBy } from "../api/userManagement";
import UserTable from "../../components/admin/components/table/UserTable";
import { useModalContext } from "../../components/admin/contexts/ModalContext";
import ModalTransfer from "./ModalTransfer";
import ModalNewUser from "./ModalNewUser";
import ModalBlockUser from "./ModalBlockUser";

const UserPage = () => {
  const { data: session }: any = useSession();
  const { openNewUserModal } = useModalContext();

  const [userList, setUserList] = useState([]);
  const [parentId, setParentId] = useState(0);

  //transfer
  const [selectedItem, setSelectedItem] = useState(null);
  const [blockStatus, setBlockStatus] = useState(null);

  useEffect(() => {
    if (session !== undefined) getUserInfo();
  }, [session]);

  const getUserInfo = async () => {
    const _userinfo = await getUsersCreatedBy(
      session.user._id,
      session.user.token,
      session.user.role
    );
    // const _userList = [];
    // _userList.push(_userinfo);
    setUserList([..._userinfo]);
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
        <td colSpan={7} className="p-2 border border-gray-600">
          <UserTable
            parentId_={parentId}
            child={child}
            createTable={createTable}
            getChildren={getChildren}
            removeChildren={removeChildren}
            onHandleTransfer={(item: any) => setSelectedItem(item)}
            onHandleBlock={(item: any, blockStatus: any) => {
              setSelectedItem(item);
              setBlockStatus(blockStatus);
            }}
          />
        </td>
      </>
    );
  };

  return (
    <section className="flex flex-col w-full overflow-y-auto h-[calc(100vh-60px)]">
      <p className="text-lg text-white bg-brand-title p-4">Users</p>
      <section className="flex flex-col gap-4 p-3">
        <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
          <input
            type="text"
            className="bg-white h-8 p-2 focus:outline-none focus:ring-0"
            placeholder="Filter Children"
          />
          <div className="flex gap-2">
            <button
              type="button"
              className="bg-brand-button text-brand-button-text hover:text-white px-4 h-9 border border-black"
              onClick={() => openNewUserModal()}
            >
              New user
            </button>
            <button
              type="button"
              className="bg-brand-button text-brand-button-text hover:text-white px-4 h-9 border border-black"
            >
              Transfer
            </button>
          </div>
        </div>
        <div className="relative overflow-x-auto">
          {userList.length !== 0 && (
            <UserTable
              parentId_={parentId}
              child={userList}
              createTable={createTable}
              getChildren={getChildren}
              removeChildren={removeChildren}
              onHandleTransfer={(item: any) => setSelectedItem(item)}
              onHandleBlock={(item: any, blockStatus: any) => {
                setSelectedItem(item);
                setBlockStatus(blockStatus);
              }}
            />
          )}
          <ModalTransfer item={selectedItem} handleConfirm={() => getUserInfo()} />
          <ModalNewUser />
          <ModalBlockUser item={selectedItem} blockStatus={blockStatus} onhandleFullBlock={() => getUserInfo()} />
        </div>
      </section>
    </section>
  );
};

export default UserPage;
