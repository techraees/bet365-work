"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import { getUserById, getUsersCreatedBy } from "../../api/userManagement";
import UsersTable from "../../../components/admin/components/admin/delay/Users/UsersTable";
import { useModalContext } from "../../../components/admin/contexts/ModalContext";
import ModalDelay from "../../../components/admin/components/admin/delay/Users/ModalDelay";

const Users = () => {
  const { data: session }: any = useSession();
  const { openDelayModal } = useModalContext();

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
        <td colSpan={7} className="p-2 border border-gray-600">
          <UsersTable
            parentId_={parentId}
            child={child}
            createTable={createTable}
            getChildren={getChildren}
            removeChildren={removeChildren}
            onHandleDelayClick={(name: string) => {
              setSelectedName(name);
              openDelayModal();
            }}
          />
        </td>
      </>
    );
  };

  return (
    <section className="flex flex-col w-full overflow-y-auto h-[calc(100vh-60px)] p-4">
      <div className="relative overflow-x-auto">
        {userList.length !== 0 && (
          <UsersTable
            parentId_={parentId}
            child={userList}
            createTable={createTable}
            getChildren={getChildren}
            removeChildren={removeChildren}
            onHandleDelayClick={(name: string) => {
              setSelectedName(name);
              openDelayModal();
            }}
          />
        )}
      </div>
      <ModalDelay tableList={search_list} userName={selectedName} />
    </section>
  );
};

export default Users;

const search_list = [
  {
    id: 1,
    content: [
      {
        id: "Single",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 2",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 3",
        pre: 5,
        live: 5,
      },
      {
        id: "System",
        pre: 5,
        live: 5,
      },
    ],
  },
  {
    id: 2,
    content: [
      {
        id: "Single",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 2",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 3",
        pre: 5,
        live: 5,
      },
      {
        id: "System",
        pre: 5,
        live: 5,
      },
    ],
  },
  {
    id: 3,
    content: [
      {
        id: "Single",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 2",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 3",
        pre: 5,
        live: 5,
      },
      {
        id: "System",
        pre: 5,
        live: 5,
      },
    ],
  },
  {
    id: 4,
    content: [
      {
        id: "Single",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 2",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 3",
        pre: 5,
        live: 5,
      },
      {
        id: "System",
        pre: 5,
        live: 5,
      },
    ],
  },
  {
    id: 5,
    content: [
      {
        id: "Single",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 2",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 3",
        pre: 5,
        live: 5,
      },
      {
        id: "System",
        pre: 5,
        live: 5,
      },
    ],
  },
  {
    id: 6,
    content: [
      {
        id: "Single",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 2",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 3",
        pre: 5,
        live: 5,
      },
      {
        id: "System",
        pre: 5,
        live: 5,
      },
    ],
  },
  {
    id: 7,
    content: [
      {
        id: "Single",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 2",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 3",
        pre: 5,
        live: 5,
      },
      {
        id: "System",
        pre: 5,
        live: 5,
      },
    ],
  },
  {
    id: 8,
    content: [
      {
        id: "Single",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 2",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 3",
        pre: 5,
        live: 5,
      },
      {
        id: "System",
        pre: 5,
        live: 5,
      },
    ],
  },
  {
    id: 9,
    content: [
      {
        id: "Single",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 2",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 3",
        pre: 5,
        live: 5,
      },
      {
        id: "System",
        pre: 5,
        live: 5,
      },
    ],
  },
  {
    id: 10,
    content: [
      {
        id: "Single",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 2",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 3",
        pre: 5,
        live: 5,
      },
      {
        id: "System",
        pre: 5,
        live: 5,
      },
    ],
  },
];
