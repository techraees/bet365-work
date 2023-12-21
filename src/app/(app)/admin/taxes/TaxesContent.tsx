"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import { getUserById, getUsersCreatedBy } from "../api/userManagement";
import UsersTable from "../../components/admin/components/admin/taxes/UsersTable";
import { useModalContext } from "../../components/admin/contexts/ModalContext";
import ModalTaxesSettings from "../../components/admin/components/admin/taxes/ModalTaxesSettings";

const TaxesContent = () => {
  const { data: session }: any = useSession();
  const { openTaxesSettingsModal } = useModalContext();

  const [userList, setUserList] = useState([]);
  const [parentId, setParentId] = useState(0);

  //transfer
  const [selectedName, setSelectedName] = useState("");

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
    setUserList(([..._userList] as any));
  };

  const getChildren = async (username: string, id: number) => {
    const _childrenInfo = await getUsersCreatedBy(
      id,
      session.user.token,
      session.user.role
    );
    if (_childrenInfo.length !== 0) {
      const _newUserList = addUserList(userList, username, _childrenInfo);
      setUserList(([..._newUserList] as any));
    }
  };

  const removeChildren = (username: string, id: number) => {
    const _newUserList = removeUserList(userList, username, id);
    setUserList(([..._newUserList] as any));
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

  const createTable = (child: any, parentId: number) => {
    return (
      <>
        <td colSpan={3} className="p-2 border border-gray-600">
          <UsersTable
            parentId_={parentId}
            child={child}
            createTable={createTable}
            getChildren={getChildren}
            removeChildren={removeChildren}
            onHandleSettingsClick={(name: string) => {
              setSelectedName(name);
              openTaxesSettingsModal();
            }}
          />
        </td>
      </>
    );
  };

  return (
    <section className="flex flex-col gap-4  w-full overflow-y-auto h-[calc(100vh-60px)] p-4">
      <section className="flex justify-end">
        <button className="w-fit px-4 py-1.5 bg-green-700 hover:bg-green-600 text-white" onClick={() => {
          setSelectedName("");
          openTaxesSettingsModal();
        }}>
          Settings
        </button>
      </section>
      <div className="relative overflow-x-auto">
        {userList.length !== 0 && (
          <UsersTable
            parentId_={parentId}
            child={userList}
            createTable={createTable}
            getChildren={getChildren}
            removeChildren={removeChildren}
            onHandleSettingsClick={(name: string) => {
              setSelectedName(name);
              openTaxesSettingsModal();
            }}
          />
        )}
      </div>
      <ModalTaxesSettings name={selectedName} />
    </section>
  );
};

export default TaxesContent;
