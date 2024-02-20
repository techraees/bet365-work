"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { toast } from "react-toastify";

import * as env from "@/app/env";
import { useModalContext } from "../../../components/admin/contexts/ModalContext";
import { getUsersByQuery } from "../../api/userManagement";
import { getLiveCasinoTransactions } from "../../api/tools";
import ModalGameTransaction from "../../../components/admin/components/admin/tools/SlotsTransactions/ModalGameTransaction";
import Input from "../../../components/admin/components/ui/Input";
import Pagination from "../../../components/admin/components/ui/Pagination";
import { start } from "repl";

const SlotTransactions = () => {
  const { data: session }: any = useSession();
  const { openGameTransactionModal } = useModalContext();

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

  const [betSymbol, setBetSymbol] = useState("All");
  const [betCost, setBetCost] = useState(0);
  const [winSymbol, setWinSymbol] = useState("All");
  const [winAmount, setWinAmount] = useState(0);
  const [userId, setUserId] = useState("");
  const [vendors, setVendors] = useState("All");

  const [user, setUser] = useState("");
  const [searchList, setSearchList] = useState(null);
  const [descendants, setDescendants] = useState([]);
  const [descendantListView, setDescendantListView] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const [pageTotalCount, setPageTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const [totalUserCount, setTotalUserCount] = useState(0);
  const [totalBetAmount, setTotalBetAmount] = useState(0);
  const [totalWinAmount, setTotalWinAmount] = useState(0);
  const [totalBalanceAmount, setTotalBalanceAmount] = useState(0);
  const [totalGameCount, setTotalGameCount] = useState(0);

  const onHandleSearch = async () => {
    const _res = await getLiveCasinoTransactions(
      session.user.token,
      session.user.role,
      user,
      startingOn,
      endingOn,
      betSymbol,
      betCost,
      winSymbol,
      winAmount
    );
    if (_res?.status === 200) {
      console.log({dataz:_res.data})
      // Calculating unique user IDs, total bets, wins, and new balance
      const uniqueUserIds = new Set(_res.data.map((item:any) => item.user_id)).size;
      const totalBet = _res.data.reduce((acc:any, item:any) => acc + item.bet, 0);
      const totalWin = _res.data.reduce((acc:any, item:any) => acc + item.win, 0);
      const totalNewBalance = _res.data.reduce((acc:any, item:any) => acc + item.new_balance, 0);
      setTotalUserCount(uniqueUserIds);
      setTotalBalanceAmount(totalNewBalance);
      setTotalWinAmount(totalWin);
      setTotalBetAmount(totalBet);
      setPageTotalCount(Math.ceil(_res.data.length / env.PAGE_ITEMCOUNT));
      setSearchList(_res.data);

    } else toast.error(_res?.data.error);
  };

  return (
    <>
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
            <div className="flex flex-col">
              <p className="text-sm text-white">Bets:</p>
              <div className="flex">
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm block focus:ring-0 focus:border-gray-300"
                  onChange={(e) => setBetSymbol(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="<">&#60;</option>
                  <option value=">">&gt;</option>
                </select>
                <Input
                  className="bg-white border-gray-300 w-24 h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300 text-sm"
                  placeholder="Amount"
                  value={betCost}
                  disable_value={false}
                  onHandleChange={(e: any) => {
                    const regex = /^[0-9\b]+$/;
                    if (e.target.value === "" || regex.test(e.target.value))
                      setBetCost(Number(e.target.value));
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-white">Win:</p>
              <div className="flex">
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm block focus:ring-0 focus:border-gray-300"
                  onChange={(e) => setWinSymbol(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="<">&#60;</option>
                  <option value=">">&gt;</option>
                </select>
                <Input
                  className="bg-white border-gray-300 w-24 h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300 text-sm"
                  placeholder="Amount"
                  value={winAmount}
                  disable_value={false}
                  onHandleChange={(e: any) => {
                    const regex = /^[0-9\b]+$/;
                    if (e.target.value === "" || regex.test(e.target.value))
                      setWinAmount(Number(e.target.value));
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-white">User Id:</p>
              <Input
                className="bg-white border-gray-300 w-24 h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300 text-sm"
                placeholder=""
                disable_value={false}
                value={userId}
                onHandleChange={(e: any) => setUserId(e.target.value)}
              />
            </div>
            {/* <div className="flex flex-col">
              <p className="text-sm text-white">Vendors:</p>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm block focus:ring-0 focus:border-gray-300"
                onChange={(e) => setVendors(e.target.value)}
              >
                <option value="All">All</option>
                <option value="egt">egt</option>
                <option value="netent">netent</option>
              </select>
            </div> */}
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
          <div className="flex justify-center ">
            <button
              className="w-16 h-8 text-sm rounded-md bg-brand-dialog-button hover:bg-white"
              onClick={onHandleSearch}
            >
              Search
            </button>
          </div>
        </section>
        {searchList !== null && (
          <section className="pt-4 w-full overflow-scroll md:overflow-hidden">
            {(searchList as Array<any>)?.length === 0 ? (
              <p className="text-lg font-bold text-center text-brand-button-text">
                No results
              </p>
            ) : (
              <table className="w-full text-sm text-gray-400 text-center">
                <thead className="text-sm bg-brand-yellow text-black">
                  <tr>
                    <th
                      scope="col"
                      className="px-2 py-1.5 border border-gray-600 truncate"
                    >
                      Id
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-1.5 border border-gray-600 truncate"
                    >
                      User
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-1.5 border border-gray-600 truncate"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-1.5 border border-gray-600 truncate"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-1.5 border border-gray-600 truncate"
                    >
                      Bet
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-1.5 border border-gray-600 truncate"
                    >
                      Win
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-1.5 border border-gray-600 truncate"
                    >
                      Balance
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-1.5 border border-gray-600 truncate"
                    >
                      Vendor
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-1.5 border border-gray-600 truncate"
                    >
                      Game
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-brand-dark-grey text-white">
                    <td className="px-2 py-1 border border-gray-600 truncate"></td>
                    <td className="px-2 py-1 border border-gray-600 truncate">
                      Players: {totalUserCount}
                    </td>
                    <td className="px-2 py-1 border border-gray-600 truncate"></td>
                    <td className="px-2 py-1 border border-gray-600 truncate"></td>
                    <td className="px-2 py-1 border border-gray-600 truncate">
                      Total Bet: {totalBetAmount.toFixed(2)}
                    </td>
                    <td className="px-2 py-1 border border-gray-600 truncate">
                      Total Win: {totalWinAmount.toFixed(2)}
                    </td>
                    <td className="px-2 py-1 border border-gray-600 truncate">
                      Total: {totalBalanceAmount.toFixed(2)}
                    </td>
                    <td className="px-2 py-1 border border-gray-600 truncate"></td>
                    <td className="px-2 py-1 border border-gray-600 truncate">
                      Games: {totalGameCount}
                    </td>
                  </tr>
                  {(searchList as Array<any>).map((item: any, index: number) => {
                    if (
                      index >= currentPage * env.PAGE_ITEMCOUNT &&
                      index < (currentPage + 1) * env.PAGE_ITEMCOUNT
                    )
                      return (
                        <tr
                          key={index}
                          className="text-white bg-[#777] hover:cursor-pointer"
                          onClick={() => {
                            setSelectedItem(item);
                            openGameTransactionModal();
                          }}
                        >
                          <td className="px-2 py-1 border border-gray-600 truncate">
                            {item._id}
                          </td>
                          <td className="px-2 py-1 border border-gray-600 truncate">
                            {item.user_id}
                          </td>
                          <td className="px-2 py-1 border border-gray-600 truncate">
                            {new Date(item.updated_at).toString()}
                          </td>
                          <td className="px-2 py-1 border border-gray-600 truncate">
                            {item.label}
                          </td>
                          <td className="px-2 py-1 border border-gray-600 truncate">
                            {item.bet}
                          </td>
                          <td className="px-2 py-1 border border-gray-600 truncate">
                            {item.win}
                          </td>
                          <td className="px-2 py-1 border border-gray-600 truncate">
                            {item.new_balance}
                          </td>
                          <td className="px-2 py-1 border border-gray-600 truncate">
                            {item.label}
                          </td>
                          <td className="px-2 py-1 border border-gray-600 truncate">
                            {item.game_id}
                          </td>
                        </tr>
                      );
                  })}
                </tbody>
              </table>
            )}
          </section>
        )}
      </section>
      {pageTotalCount >= 2 && (
        <div className="flex flex-row justify-center">
          <Pagination
            pageCount={pageTotalCount}
            gotoPage={(page: number) => setCurrentPage(page)}
          />
        </div>
      )}
      <ModalGameTransaction item={selectedItem} />
    </>
  );
};

export default SlotTransactions;
