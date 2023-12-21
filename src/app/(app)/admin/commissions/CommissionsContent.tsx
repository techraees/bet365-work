"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import clsx from "clsx";

import {
  getUsersByQuery,
  getUserById,
} from "../api/userManagement";
import CommissionsTable from "../../components/admin/components/admin/commissions/CommissionsTable";
import Pagination from "../../components/admin/components/ui/Pagination";

const CommissionsContent = () => {
  const { data: session } = useSession();

  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState("");
  const [descendants, setDescendants] = useState([]);
  const [descendantListView, setDescendantListView] = useState(false);
  const [date, setDate] = useState("");
  const [pageTotalCount, setPageTotalCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

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

  return (
    <>
      <section className="flex flex-col gap-4 p-4">
        <section className="flex flex-col md:flex-row gap-2 justify-between items-center">
          <div className="flex flex-row gap-2 items-center">
            <p className="text-sm text-white">Agent Filters:</p>
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
          <div className="flex">
            <input
              type="date"
              className="w-44 fill-blue-500 h-9 text-primary text-lg font-medium focus:outline-none bg-white"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <button className="px-4 h-9 bg-green-700 hover:bg-green-600 text-white">
              Snapshot
            </button>
          </div>
        </section>
        <CommissionsTable tableList={userList} currentPage={currentPage} />
        {currentPage > 1 && (
          <div className="flex flex-row justify-center">
            <Pagination
              pageCount={pageTotalCount}
              gotoPage={(page: number) => setCurrentPage(page)}
            />
          </div>
        )}
      </section>
    </>
  );
};

export default CommissionsContent;
