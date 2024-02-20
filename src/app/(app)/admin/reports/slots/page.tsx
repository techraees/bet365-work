"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import { toast } from "react-toastify";

import {
  getUserById,
  getUsersCreatedBy,
  getUsersByQuery,
} from "../../api/userManagement";

import { getFinalcialReports } from "../../api/reports";

import VendorTable from "@/app/(app)/components/admin/components/admin/reports/Slots/VendorTable";
import UserTable from "@/app/(app)/components/admin/components/admin/reports/Slots/UserTable";
import { start } from "repl";

function formatDate(date:any) {
  const year = date.getFullYear();
  // Pad the month and day with a leading zero if they are less than 10
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

const Slots = () => {
  const searchParams = useSearchParams();
  const username = searchParams?.get("username");
  const { data: session }: any = useSession();
  
  const today = new Date();

  const [startingOn, setStartingOn] = useState(formatDate(today));
  const [endingOn, setEndingOn] = useState(formatDate(today));
  
  const [provider, setProvider] = useState("All");
  const [vendor, setVendor] = useState("All");
  const [bonus, setBonus] = useState("Without Bonus");

  const [user, setUser] = useState("");
  const [selectedUser, setSelectedUser]: any = useState({
    _id: "",
    username: "",
  });
  const [descendants, setDescendants] = useState([]);
  const [descendantListView, setDescendantListView] = useState(false);

  const [vendorsSelected, setVendorsSelected] = useState(false);
  const [userList, setUserList]: Array<any> = useState(null);

  const [totalVendors, setTotalVendors] = useState(0);
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [totalGames, setTotalGames] = useState(0);
  const [totalIn, setTotalIn] = useState(0);
  const [totalOut, setTotalOut] = useState(0);
  const [totalGGR, setTotalGGR] = useState(0);

  const getUserInfo = async () => {
    let userid = 0;
    if (selectedUser.username !== "") {
      userid = selectedUser._id;
    }
    else
      userid = session.user._id;

    const _userinfo = await getUsersCreatedBy(
      userid,
      session.user.token,
      session.user.role
    );
    const _userList = [];
    for (let i = 0; i < _userinfo.length; i++)
      _userinfo[i].vendorsSelected = false;
    _userList.push(_userinfo);
    setUserList(..._userList);
  };

  const getChildren = async (username: string, id: number) => {
    const _childrenInfo = await getUsersCreatedBy(
      id,
      session.user.token,
      session.user.role
    );
    for (let i = 0; i < _childrenInfo.length; i++)
      _childrenInfo[i].vendorsSelected = false;
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

  const addGeneralTable = (username: string) => {
    const _newUserList = _addGeneralTable(userList, username);
    setUserList([..._newUserList]);
  };

  const _addGeneralTable = (userInfo_: any[], username: string) => {
    for (let i = 0; i < userInfo_.length; i++) {
      if (Array.isArray(userInfo_[i]) === true) {
        _addGeneralTable(userInfo_[i], username);
        if (i === userInfo_.length - 1) break;
      }
      if (userInfo_[i].username === username) {
        userInfo_.splice(i + 1, 0, {
          _id: userInfo_[i]._id,
          generalTable: true,
        });
        break;
      }
    }
    return userInfo_;
  };

  const removeGeneralTable = (username: string, id: number) => {
    const _newUserList = _removeGeneralTable(userList, username, id);
    setUserList([..._newUserList]);
  };

  const _removeGeneralTable = (
    userInfo_: any[],
    username: string,
    id: number
  ) => {
    for (let i = 0; i < userInfo_.length; i++) {
      if (Array.isArray(userInfo_[i]) === true) {
        if (userInfo_[i][0].createdBy !== String(id)) {
          _removeGeneralTable(userInfo_[i], username, id);
          if (i === userInfo_.length - 1) break;
        }
      } else {
        if (userInfo_[i]._id === id) {
          if (userInfo_[i + 1].generalTable === undefined)
            userInfo_.splice(i + 2, 1);
          else userInfo_.splice(i + 1, 1);
        }
      }
    }
    return userInfo_;
  };

  const createTable = (child: any, parentId: number) => {
    return (
      <>
        <td colSpan={11} className="p-4 border border-black">
          <UserTable
            parentId_={parentId}
            child={child}
            startingOn={startingOn}
            endingOn={endingOn}
            createTable={createTable}
            getChildren={getChildren}
            removeChildren={removeChildren}
            addGeneralTable={addGeneralTable}
            removeGeneralTable={removeGeneralTable}
          />
        </td>
      </>
    );
  };

  const onHandleSearch = async () => {
    getTotalFinancialReportData();
    getUserInfo();
  };

  const getTotalFinancialReportData = async () => {
    let userid = 0;
    if (selectedUser.username !== "") {
      userid = selectedUser._id;
    }
    else
      userid = session.user._id;

    const _res = await getFinalcialReports(
      session.user.token,
      session.user.role,
      userid,
      startingOn,
      endingOn
    );

    if (_res?.status === 200) {
      if (_res.data.slots !== undefined) {
        setTotalVendors(_res.data.slots[0].totalsPerSlot.length);
        setTotalIn(_res.data.slots[0].overallTotal[0].total_in);
        setTotalOut(_res.data.slots[0].overallTotal[0].total_out);
        setTotalGGR(_res.data.slots[0].overallTotal[0].ggr);
      }
    } else toast.error(_res?.data.error);
  };

  return (
    <section className="flex flex-col gap-4 p-4">
      <section className="flex flex-col gap-4">
        <div className="grid md:flex gap-1 justify-center items-center">
          <div className="flex flex-col">
            <p className="text-sm text-white">From:</p>
              <input
                type="date"
                className="w-44 fill-blue-500 h-9 text-primary text-lg font-medium focus:outline-none border border-primary bg-white"
                value={startingOn}
                onChange={(e) => setStartingOn(e.target.value)}
              />
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-white">To:</p>
              <input
                type="date"
                className="w-44 fill-blue-500 h-9 text-primary text-lg font-medium focus:outline-none border border-primary bg-white"
                value={endingOn}
                onChange={(e) => setEndingOn(e.target.value)}
              />
          </div>
          {username === null && (
            <div className="flex flex-col">
              <p className="text-sm text-white">Provider:</p>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm block focus:ring-0 focus:border-gray-300"
                onChange={(e) => setProvider(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Ekko">Ekko</option>
                <option value="Gapi">Gapi</option>
                <option value="Gbs">Gbs</option>
              </select>
            </div>
          )}
          {provider !== "All" && (
            <div className="flex flex-col">
              <p className="text-sm text-white">Vendor:</p>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm block focus:ring-0 focus:border-gray-300"
                onChange={(e) => setVendor(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Ekko">amatic</option>
                <option value="Gapi">egt</option>
                <option value="Gbs">netent</option>
              </select>
            </div>
          )}
          <div className="flex flex-col">
            <p className="text-sm text-white">Bonus:</p>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm block focus:ring-0 focus:border-gray-300"
              onChange={(e) => setBonus(e.target.value)}
            >
              <option value="Without Bonus">Without Bonus</option>
              <option value="Only Bonus">Only Bonus</option>
            </select>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col">
            <p className="text-sm text-white">User:</p>
            <div className="relative">
              <input
                type="text"
                className="bg-white border-gray-300 w-48 h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300"
                value={user}
                onChange={async (e) => {
                  setDescendantListView(false);
                  setUser(e.target.value);
                  const _res = await getUsersByQuery(
                    e.target.value,
                    session.user.token
                  );
                  setDescendants(_res);
                  setDescendantListView(true);
                }}
              />
              <div
                className={clsx(
                  "absolute right-0 flex-col bg-white rounded-sm",
                  descendantListView === true ? "flex" : "hidden"
                )}
              >
                {descendants.map((item: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className="hover:bg-red-400 px-4 cursor-pointer py-1"
                      onClick={() => {
                        setUser(item.username);
                        setSelectedUser(item);
                        setDescendantListView(false);
                      }}
                    >
                      {item.username}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="w-16 h-8 text-sm rounded-md bg-brand-dialog-button hover:bg-white"
            onClick={onHandleSearch}
          >
            Search
          </button>
        </div>
      </section>
      {userList !== null && (
        <section className="flex flex-col gap-4 pt-4">
          <div className="flex flex-col items-center gap-2">
            <p className="text-xl font-semibold text-white">Vendors Summary</p>
            <div className="w-full overflow-x-scroll md:overflow-hidden">
              <table className="w-full text-sm text-white text-center">
                <thead className="text-sm text-black bg-brand-yellow uppercase">
                  <tr>
                    <th
                      scope="col"
                      className="px-2 py-1.5 border border-gray-600 truncate"
                    ></th>
                    <th
                      scope="col"
                      className="px-2 py-1.5 border border-gray-600 truncate"
                    >
                      vendors
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-1.5 border border-gray-600 truncate"
                    >
                      players
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-1.5 border border-gray-600 truncate"
                    >
                      games
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-1.5 border border-gray-600 truncate"
                    >
                      in
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-1.5 border border-gray-600 truncate"
                    >
                      out
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-1.5 border border-gray-600 truncate"
                    >
                      ggr
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-brand-dark-grey border border-gray-600">
                    <td
                      className={clsx(
                        "px-6 py-1 border border-gray-600 cursor-pointer hover:bg-orange-400 text-black w-14",
                        vendorsSelected === true ? "bg-orange-400" : "bg-white"
                      )}
                      onClick={() => setVendorsSelected(!vendorsSelected)}
                    >
                      Vendors
                    </td>
                    <td className="px-2 py-1 border border-gray-600 truncate">
                      {totalVendors}
                    </td>
                    <td className="px-2 py-1 border border-gray-600 truncate">
                      {totalPlayers}
                    </td>
                    <td className="px-2 py-1 border border-gray-600 truncate">
                      {totalGames}
                    </td>
                    <td className="px-2 py-1 border border-gray-600 truncate">
                      {totalIn.toFixed(2)}
                    </td>
                    <td className="px-2 py-1 border border-gray-600 truncate">
                    {totalOut.toFixed(2)}
                    </td>
                    <td className="px-2 py-1 border border-gray-600 truncate">
                      {totalGGR.toFixed(2)}
                    </td>
                  </tr>
                  {vendorsSelected === true && (
                    <tr className="bg-brand-dark-grey border border-gray-600">
                      <td colSpan={7} className="p-4">
                        <VendorTable item_={session.user} startingOn={startingOn} endingOn={endingOn} />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-xl font-semibold text-white">By Agents</p>
            <UserTable
              parentId_={0}
              child={userList}
              startingOn={startingOn}
              endingOn={endingOn}
              createTable={createTable}
              getChildren={getChildren}
              removeChildren={removeChildren}
              addGeneralTable={addGeneralTable}
              removeGeneralTable={removeGeneralTable}
            />
          </div>
        </section>
      )}
    </section>
  );
};

export default Slots;
