"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { toast } from "react-toastify";

import { getUsersCreatedBy } from "@/app/(app)/admin/api/userManagement";
import { getFinalcialReports } from "@/app/(app)/admin/api/reports";

import GeneralTable from "@/app/(app)/components/admin/components/admin/reports/FinancialReport/GeneralTable";
import UserTable from "@/app/(app)/components/admin/components/admin/reports/FinancialReport/UserTable";

const FinancialReport = () => {
  const { data: session }: any = useSession();

  const [startingOn, setStartingOn] = useState(
    new Date().getFullYear() +
      "-" +
      String(new Date().getMonth() + 1).padStart(2, "0") +
      "-" +
      String(new Date().getDate()).padStart(2, "0")
  );
  const [endingOn, setEndingOn] = useState(
    new Date().getFullYear() +
      "-" +
      String(new Date().getMonth() + 1).padStart(2, "0") +
      "-" +
      String(new Date().getDate()).padStart(2, "0")
  );

  const [prSelected, setPrSelected] = useState(false);
  const [userList, setUserList]: Array<any> = useState(null);

  const [totaltax, setTotalTax] = useState(0);
  const [totalggr, setTotalGGR] = useState(0);
  const [totalto, setTotalTo] = useState(0);
  const [totalbonus, setTotalBonus] = useState(0);
  const [totalconverted, setTotalConverted] = useState(0);
  const [totalngr, setTotalNGR] = useState(0);
  const [totalhands, setTotalHands] = useState(0);
  const [totalpartner, setTotalPartner] = useState(0);

  const getTotalFinancialReportData = async () => {
    const _res = await getFinalcialReports(
      session.user.token,
      session.user.role,
      session.user._id,
      startingOn,
      endingOn
    );

    if (_res?.status === 200) {
      // ggr
      let ggr = 0;
      if (_res.data.pre !== undefined && _res.data.pre.length > 0)
        ggr += _res.data.pre[0].overallTotal[0].ggr;
      if (_res.data.live !== undefined && _res.data.live.length > 0)
        ggr += _res.data.live[0].overallTotal[0].ggr;
      if (_res.data.slots !== undefined && _res.data.slots.length > 0)
        ggr += _res.data.slots[0].overallTotal[0].ggr;
      if (_res.data.casino !== undefined && _res.data.casino.length > 0)
        ggr += _res.data.casino[0].overallTotal[0].ggr;
      if (
        _res.data.sports_betting !== undefined &&
        _res.data.sports_betting.length > 0
      )
        ggr +=
          _res.data.sports_betting[_res.data.sports_betting.length - 1].ggr;
      setTotalGGR(ggr);
    } else toast.error(_res?.data.error);
  };

  const getUserInfo = async () => {
    const _userinfo = await getUsersCreatedBy(
      session.user._id,
      session.user.token,
      session.user.role
    );
    const _userList = [];
    for (let i = 0; i < _userinfo.length; i++) _userinfo[i].prSelected = false;
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
      _childrenInfo[i].prSelected = false;
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

  const onHandleSearch = () => {
    getTotalFinancialReportData();
    getUserInfo();
  };

  return (
    <>
      <section className="flex flex-col gap-4 p-4">
        <section className="flex flex-col gap-4">
          <div className="flex gap-1 justify-center items-center">
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
          </div>
          <div className="flex justify-center ">
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
            <div className="w-full overflow-x-scroll md:overflow-hidden">
              <table className="w-full text-sm text-white text-center">
                <thead className="text-sm bg-[#222] uppercase">
                  <tr>
                    <th
                      scope="col"
                      className="px-2 py-1.5 border border-black"
                    ></th>
                    <th scope="col" className="px-2 py-1.5 border border-black">
                      tax
                    </th>
                    <th scope="col" className="px-2 py-1.5 border border-black">
                      ggr
                    </th>
                    <th scope="col" className="px-2 py-1.5 border border-black">
                      t.o.
                    </th>
                    <th scope="col" className="px-2 py-1.5 border border-black">
                      bonus
                    </th>
                    <th scope="col" className="px-2 py-1.5 border border-black">
                      converted
                    </th>
                    <th scope="col" className="px-2 py-1.5 border border-black">
                      ngr
                    </th>
                    <th scope="col" className="px-2 py-1.5 border border-black">
                      hands
                    </th>
                    <th scope="col" className="px-2 py-1.5 border border-black">
                      to partners
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-brand-dark-grey border border-black">
                    <td
                      className={clsx(
                        "px-6 py-1 border border-black cursor-pointer hover:bg-brand-yellow text-black w-14",
                        prSelected === true ? "bg-brand-yellow" : "bg-white"
                      )}
                      onClick={() => setPrSelected(!prSelected)}
                    >
                      Pr
                    </td>
                    <td className="px-2 py-1 border border-black">
                      {totaltax}
                    </td>
                    <td className="px-2 py-1 border border-black bg-brand-plus-cell">
                      {totalggr}
                    </td>
                    <td className="px-2 py-1 border border-black">{totalto}</td>
                    <td className="px-2 py-1 border border-black">
                      {totalbonus}
                    </td>
                    <td className="px-2 py-1 border border-black">
                      {totalconverted}
                    </td>
                    <td className="px-2 py-1 border border-black bg-brand-plus-cell">
                      {totalngr}
                    </td>
                    <td className="px-2 py-1 border border-black">
                      {totalhands}
                    </td>
                    <td className="px-2 py-1 border border-black">
                      {totalpartner}
                    </td>
                  </tr>
                  {prSelected === true && (
                    <tr className="bg-brand-dark-grey border border-black">
                      <td colSpan={9} className="p-4">
                        <GeneralTable item_={session.user} startingOn={startingOn} endingOn={endingOn} />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
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
          </section>
        )}
      </section>
    </>
  );
};

export default FinancialReport;
