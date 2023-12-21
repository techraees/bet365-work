"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import { getUserById, getUsersCreatedBy } from "../../api/userManagement";
import UsersTable from "../../../components/admin/components/admin/limits/Users/UsersTable";
import { useModalContext } from "../../../components/admin/contexts/ModalContext";
import ModalLimit from "../../../components/admin/components/admin/limits/Users/ModalLimit";

const Users = () => {
  const { data: session }: any = useSession();
  const { openLimitModal } = useModalContext();

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
            onHandleLimitClick={(name: string) => {
              setSelectedName(name);
              openLimitModal();
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
            onHandleLimitClick={(name: string) => {
              setSelectedName(name);
              openLimitModal();
            }}
          />
        )}
      </div>
      <ModalLimit tableList={search_list} userName={selectedName} />
    </section>
  );
};

export default Users;

const search_list = [
  {
    id: 1,
    content: [
      {
        pre_id: "Single",
        pre_bet: 1000,
        pre_win: 4500,
        live_id: "Single",
        live_bet: 1000,
        live_win: 4000
      },
      {
        pre_id: "Multiple 2",
        pre_bet: 1000,
        pre_win: 7000,
        live_id: "Multiple 2",
        live_bet: 1000,
        live_win: 6500
      },
      {
        pre_id: "Multiple 3",
        pre_bet: 1000,
        pre_win: 8000,
        live_id: "Multiple 3",
        live_bet: 1000,
        live_win: 7500
      },
      {
        pre_id: "Multiple 4",
        pre_bet: 1000,
        pre_win: 10000,
        live_id: "Multiple 4",
        live_bet: 1000,
        live_win: 9500
      },
      {
        pre_id: "Multiple 5+",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "Multiple 5+",
        live_bet: 1000,
        live_win: 11000
      },
      {
        pre_id: "System",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "System",
        live_bet: 1000,
        live_win: 11000
      }
    ]
  },
  {
    id: 2,
    content: [
      {
        pre_id: "Single",
        pre_bet: 1000,
        pre_win: 4500,
        live_id: "Single",
        live_bet: 1000,
        live_win: 4000
      },
      {
        pre_id: "Multiple 2",
        pre_bet: 1000,
        pre_win: 7000,
        live_id: "Multiple 2",
        live_bet: 1000,
        live_win: 6500
      },
      {
        pre_id: "Multiple 3",
        pre_bet: 1000,
        pre_win: 8000,
        live_id: "Multiple 3",
        live_bet: 1000,
        live_win: 7500
      },
      {
        pre_id: "Multiple 4",
        pre_bet: 1000,
        pre_win: 10000,
        live_id: "Multiple 4",
        live_bet: 1000,
        live_win: 9500
      },
      {
        pre_id: "Multiple 5+",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "Multiple 5+",
        live_bet: 1000,
        live_win: 11000
      },
      {
        pre_id: "System",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "System",
        live_bet: 1000,
        live_win: 11000
      }
    ]
  },
  {
    id: 3,
    content: [
      {
        pre_id: "Single",
        pre_bet: 1000,
        pre_win: 4500,
        live_id: "Single",
        live_bet: 1000,
        live_win: 4000
      },
      {
        pre_id: "Multiple 2",
        pre_bet: 1000,
        pre_win: 7000,
        live_id: "Multiple 2",
        live_bet: 1000,
        live_win: 6500
      },
      {
        pre_id: "Multiple 3",
        pre_bet: 1000,
        pre_win: 8000,
        live_id: "Multiple 3",
        live_bet: 1000,
        live_win: 7500
      },
      {
        pre_id: "Multiple 4",
        pre_bet: 1000,
        pre_win: 10000,
        live_id: "Multiple 4",
        live_bet: 1000,
        live_win: 9500
      },
      {
        pre_id: "Multiple 5+",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "Multiple 5+",
        live_bet: 1000,
        live_win: 11000
      },
      {
        pre_id: "System",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "System",
        live_bet: 1000,
        live_win: 11000
      }
    ]
  },
  {
    id: 4,
    content: [
      {
        pre_id: "Single",
        pre_bet: 1000,
        pre_win: 4500,
        live_id: "Single",
        live_bet: 1000,
        live_win: 4000
      },
      {
        pre_id: "Multiple 2",
        pre_bet: 1000,
        pre_win: 7000,
        live_id: "Multiple 2",
        live_bet: 1000,
        live_win: 6500
      },
      {
        pre_id: "Multiple 3",
        pre_bet: 1000,
        pre_win: 8000,
        live_id: "Multiple 3",
        live_bet: 1000,
        live_win: 7500
      },
      {
        pre_id: "Multiple 4",
        pre_bet: 1000,
        pre_win: 10000,
        live_id: "Multiple 4",
        live_bet: 1000,
        live_win: 9500
      },
      {
        pre_id: "Multiple 5+",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "Multiple 5+",
        live_bet: 1000,
        live_win: 11000
      },
      {
        pre_id: "System",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "System",
        live_bet: 1000,
        live_win: 11000
      }
    ]
  },
  {
    id: 5,
    content: [
      {
        pre_id: "Single",
        pre_bet: 1000,
        pre_win: 4500,
        live_id: "Single",
        live_bet: 1000,
        live_win: 4000
      },
      {
        pre_id: "Multiple 2",
        pre_bet: 1000,
        pre_win: 7000,
        live_id: "Multiple 2",
        live_bet: 1000,
        live_win: 6500
      },
      {
        pre_id: "Multiple 3",
        pre_bet: 1000,
        pre_win: 8000,
        live_id: "Multiple 3",
        live_bet: 1000,
        live_win: 7500
      },
      {
        pre_id: "Multiple 4",
        pre_bet: 1000,
        pre_win: 10000,
        live_id: "Multiple 4",
        live_bet: 1000,
        live_win: 9500
      },
      {
        pre_id: "Multiple 5+",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "Multiple 5+",
        live_bet: 1000,
        live_win: 11000
      },
      {
        pre_id: "System",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "System",
        live_bet: 1000,
        live_win: 11000
      }
    ]
  },
  {
    id: 6,
    content: [
      {
        pre_id: "Single",
        pre_bet: 1000,
        pre_win: 4500,
        live_id: "Single",
        live_bet: 1000,
        live_win: 4000
      },
      {
        pre_id: "Multiple 2",
        pre_bet: 1000,
        pre_win: 7000,
        live_id: "Multiple 2",
        live_bet: 1000,
        live_win: 6500
      },
      {
        pre_id: "Multiple 3",
        pre_bet: 1000,
        pre_win: 8000,
        live_id: "Multiple 3",
        live_bet: 1000,
        live_win: 7500
      },
      {
        pre_id: "Multiple 4",
        pre_bet: 1000,
        pre_win: 10000,
        live_id: "Multiple 4",
        live_bet: 1000,
        live_win: 9500
      },
      {
        pre_id: "Multiple 5+",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "Multiple 5+",
        live_bet: 1000,
        live_win: 11000
      },
      {
        pre_id: "System",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "System",
        live_bet: 1000,
        live_win: 11000
      }
    ]
  },
  {
    id: 7,
    content: [
      {
        pre_id: "Single",
        pre_bet: 1000,
        pre_win: 4500,
        live_id: "Single",
        live_bet: 1000,
        live_win: 4000
      },
      {
        pre_id: "Multiple 2",
        pre_bet: 1000,
        pre_win: 7000,
        live_id: "Multiple 2",
        live_bet: 1000,
        live_win: 6500
      },
      {
        pre_id: "Multiple 3",
        pre_bet: 1000,
        pre_win: 8000,
        live_id: "Multiple 3",
        live_bet: 1000,
        live_win: 7500
      },
      {
        pre_id: "Multiple 4",
        pre_bet: 1000,
        pre_win: 10000,
        live_id: "Multiple 4",
        live_bet: 1000,
        live_win: 9500
      },
      {
        pre_id: "Multiple 5+",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "Multiple 5+",
        live_bet: 1000,
        live_win: 11000
      },
      {
        pre_id: "System",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "System",
        live_bet: 1000,
        live_win: 11000
      }
    ]
  },
  {
    id: 8,
    content: [
      {
        pre_id: "Single",
        pre_bet: 1000,
        pre_win: 4500,
        live_id: "Single",
        live_bet: 1000,
        live_win: 4000
      },
      {
        pre_id: "Multiple 2",
        pre_bet: 1000,
        pre_win: 7000,
        live_id: "Multiple 2",
        live_bet: 1000,
        live_win: 6500
      },
      {
        pre_id: "Multiple 3",
        pre_bet: 1000,
        pre_win: 8000,
        live_id: "Multiple 3",
        live_bet: 1000,
        live_win: 7500
      },
      {
        pre_id: "Multiple 4",
        pre_bet: 1000,
        pre_win: 10000,
        live_id: "Multiple 4",
        live_bet: 1000,
        live_win: 9500
      },
      {
        pre_id: "Multiple 5+",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "Multiple 5+",
        live_bet: 1000,
        live_win: 11000
      },
      {
        pre_id: "System",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "System",
        live_bet: 1000,
        live_win: 11000
      }
    ]
  },
  {
    id: 9,
    content: [
      {
        pre_id: "Single",
        pre_bet: 1000,
        pre_win: 4500,
        live_id: "Single",
        live_bet: 1000,
        live_win: 4000
      },
      {
        pre_id: "Multiple 2",
        pre_bet: 1000,
        pre_win: 7000,
        live_id: "Multiple 2",
        live_bet: 1000,
        live_win: 6500
      },
      {
        pre_id: "Multiple 3",
        pre_bet: 1000,
        pre_win: 8000,
        live_id: "Multiple 3",
        live_bet: 1000,
        live_win: 7500
      },
      {
        pre_id: "Multiple 4",
        pre_bet: 1000,
        pre_win: 10000,
        live_id: "Multiple 4",
        live_bet: 1000,
        live_win: 9500
      },
      {
        pre_id: "Multiple 5+",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "Multiple 5+",
        live_bet: 1000,
        live_win: 11000
      },
      {
        pre_id: "System",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "System",
        live_bet: 1000,
        live_win: 11000
      }
    ]
  },
  {
    id: 10,
    content: [
      {
        pre_id: "Single",
        pre_bet: 1000,
        pre_win: 4500,
        live_id: "Single",
        live_bet: 1000,
        live_win: 4000
      },
      {
        pre_id: "Multiple 2",
        pre_bet: 1000,
        pre_win: 7000,
        live_id: "Multiple 2",
        live_bet: 1000,
        live_win: 6500
      },
      {
        pre_id: "Multiple 3",
        pre_bet: 1000,
        pre_win: 8000,
        live_id: "Multiple 3",
        live_bet: 1000,
        live_win: 7500
      },
      {
        pre_id: "Multiple 4",
        pre_bet: 1000,
        pre_win: 10000,
        live_id: "Multiple 4",
        live_bet: 1000,
        live_win: 9500
      },
      {
        pre_id: "Multiple 5+",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "Multiple 5+",
        live_bet: 1000,
        live_win: 11000
      },
      {
        pre_id: "System",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "System",
        live_bet: 1000,
        live_win: 11000
      }
    ]
  }
]