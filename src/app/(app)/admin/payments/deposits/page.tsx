"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import clsx from "clsx";

import { useModalContext } from "../../../components/admin/contexts/ModalContext";
import {
  getUsersByQuery,
  getUserById,
  getUsersCreatedBy,
} from "../../api/userManagement";
import ModalCoupon from "../../../components/admin/components/admin/reports/BetsList/ModalCoupon";

const Deposits = () => {
  const { data: session }: any = useSession();
  const { openCouponModal } = useModalContext();

  const [startingOn, setStartingOn] = useState("");
  const [endingOn, setEndingOn] = useState("");
  const [betSymbol, setBetSymbol] = useState("All");
  const [betCost, setBetCost] = useState(0);
  const [sumSymbol, setSumSymbol] = useState("All");
  const [sumOdds, setSumOdds] = useState(0);
  const [cashout, setCashout] = useState("All");
  const [bonus, setBonus] = useState("All");
  // user type
  const [superAgent, setSuperAgent] = useState("All Agents");
  const [type7, setType7] = useState("All Agents");
  const [type5, setType5] = useState("All Agents");
  const [type3, setType3] = useState("All Agents");
  const [user, setUser] = useState("");
  const [descendants, setDescendants] = useState([]);
  const [descendantListView, setDescendantListView] = useState(false);

  const [single, setSingle] = useState(true);
  const [multiple, setMultiple] = useState(true);
  const [system, setSystem] = useState(true);
  const [pre, setPre] = useState(true);
  const [inPlay, setInPlay] = useState(true);
  const [current, setCurrent] = useState(true);
  const [won, setWon] = useState(true);
  const [lost, setLost] = useState(true);
  const [checking, setChecking] = useState(true);

  const [superAgentList, setSuperAgentList] = useState([]);
  const [type7List, setType7List] = useState([]);
  const [type5List, setType5List] = useState([]);
  const [type3List, setType3List] = useState([]);
  const [userList, setUserList] = useState([]);

  const [betsList, setBetsList] = useState(bets_list);
  const [selectedItem, setSelectedItem] = useState(null);

  const onHandleSearch = async () => {};

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
              <p className="text-sm text-white">Bet Cost:</p>
              <div className="flex">
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm block focus:ring-0 focus:border-gray-300"
                  onChange={(e) => setBetSymbol(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="<">&#60;</option>
                  <option value=">">&gt;</option>
                </select>
                <input
                  type="text"
                  className="bg-white border-gray-300 w-24 h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300"
                  placeholder="Amount"
                  value={betCost}
                  onChange={(e) => {
                    const regex = /^[0-9\b]+$/;
                    if (e.target.value === "" || regex.test(e.target.value))
                      setBetCost(Number(e.target.value));
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-white">Sum Odds:</p>
              <div className="flex">
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm block w-18 focus:ring-0 focus:border-gray-300"
                  onChange={(e) => setSumSymbol(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="<">&#60;</option>
                  <option value=">">&gt;</option>
                </select>
                <input
                  type="text"
                  className="bg-white border-gray-300 w-24 h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300"
                  placeholder="Total"
                  value={sumOdds}
                  onChange={(e) => {
                    const regex = /^[0-9\b]+$/;
                    if (e.target.value === "" || regex.test(e.target.value))
                      setSumOdds(Number(e.target.value));
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-white">Cashout:</p>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm block focus:ring-0 focus:border-gray-300"
                onChange={(e) => setCashout(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Without Cashout">Without Cashout</option>
                <option value="Only Cashout">Only Cashout</option>
              </select>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-white">Bonus:</p>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm block focus:ring-0 focus:border-gray-300"
                onChange={(e) => setBonus(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Without Cashout">Without Bonus</option>
                <option value="Only Cashout">Only Bonus</option>
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
                <div className={clsx("absolute right-0 flex-col bg-white rounded-sm", descendantListView === true ? "flex" : "hidden")}>
                  {descendants.map((item: any, index: number) => {
                    return (
                      <div key={index} className="hover:bg-red-400 px-4 cursor-pointer py-1" onClick={() => {
                        setUser(item.username);
                        setDescendantListView(false);
                      }}>{item.username}</div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2 justify-center w-2/3 mx-auto">
            <div className="flex justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-100 focus:ring-0 focus:ring-offset-0"
                  onChange={() => setSingle(!single)}
                  checked={single === true ? true : false}
                />
                <label className="ml-0.5 text-sm font-medium text-white">
                  Single
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-100 focus:ring-0 focus:ring-offset-0"
                  onChange={() => setMultiple(!multiple)}
                  checked={multiple === true ? true : false}
                />
                <label className="ml-0.5 text-sm font-medium text-white">
                  Multiple
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-100 focus:ring-0 focus:ring-offset-0"
                  onChange={() => setSystem(!system)}
                  checked={system === true ? true : false}
                />
                <label className="ml-0.5 text-sm font-medium text-white">
                  System
                </label>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-100 focus:ring-0 focus:ring-offset-0"
                  onChange={() => setPre(!pre)}
                  checked={pre === true ? true : false}
                />
                <label className="ml-0.5 text-sm font-medium text-white">
                  Pre
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-100 focus:ring-0 focus:ring-offset-0"
                  onChange={() => setInPlay(!inPlay)}
                  checked={inPlay === true ? true : false}
                />
                <label className="ml-0.5 text-sm font-medium text-white">
                  In-Play
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-100 focus:ring-0 focus:ring-offset-0"
                  onChange={() => setCurrent(!current)}
                  checked={current === true ? true : false}
                />
                <label className="ml-0.5 text-sm font-medium text-white">
                  Current
                </label>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-100 focus:ring-0 focus:ring-offset-0"
                  onChange={() => setWon(!won)}
                  checked={won === true ? true : false}
                />
                <label className="ml-0.5 text-sm font-medium text-white">
                  Won
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-100 focus:ring-0 focus:ring-offset-0"
                  onChange={() => setLost(!lost)}
                  checked={lost === true ? true : false}
                />
                <label className="ml-0.5 text-sm font-medium text-white">
                  Lost
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-100 focus:ring-0 focus:ring-offset-0"
                  onChange={() => setChecking(!checking)}
                  checked={checking === true ? true : false}
                />
                <label className="ml-0.5 text-sm font-medium text-white">
                  Checking
                </label>
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
        <section className="pt-4 w-full overflow-scroll md:overflow-hidden">
          {betsList?.length === 0 ? (
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
                    Coupon ID
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
                    Pre/Live
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1.5 border border-gray-600 truncate"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1.5 border border-gray-600 truncate"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1.5 border border-gray-600 truncate"
                  >
                    Pos.Win.
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1.5 border border-gray-600 truncate"
                  >
                    Bet Win
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-brand-dark-grey text-white">
                  <td className="px-2 py-1 border border-gray-600 truncate"></td>
                  <td className="px-2 py-1 border border-gray-600 truncate"></td>
                  <td className="px-2 py-1 border border-gray-600 truncate">
                    {total_info.coupon_id}
                  </td>
                  <td className="px-2 py-1 border border-gray-600 truncate">
                    {total_info.type}
                  </td>
                  <td className="px-2 py-1 border border-gray-600 truncate"></td>
                  <td className="px-2 py-1 border border-gray-600 truncate">
                    {total_info.status}
                  </td>
                  <td className="px-2 py-1 border border-gray-600 truncate">
                    {total_info.amount}
                  </td>
                  <td className="px-2 py-1 border border-gray-600 truncate">
                    {total_info.pos_win}
                  </td>
                  <td className="px-2 py-1 border border-gray-600 truncate">
                    {total_info.bet_win}
                  </td>
                </tr>
                {betsList?.map((item: any, index: number) => {
                  return (
                    <tr
                      key={index}
                      className="bg-brand-red text-white hover:cursor-pointer"
                      onClick={() => {
                        setSelectedItem(item);
                        openCouponModal();
                      }}
                    >
                      <td className="px-2 py-1 border border-gray-600 truncate">
                        {item.user}
                      </td>
                      <td className="px-2 py-1 border border-gray-600 truncate">
                        {item.date}
                      </td>
                      <td className="px-2 py-1 border border-gray-600 truncate">
                        {item.coupon_id}
                      </td>
                      <td className="px-2 py-1 border border-gray-600 truncate">
                        {item.type}
                      </td>
                      <td className="px-2 py-1 border border-gray-600 truncate">
                        {item.pre_live}
                      </td>
                      <td className="px-2 py-1 border border-gray-600 truncate">
                        {item.status}
                      </td>
                      <td className="px-2 py-1 border border-gray-600 truncate">
                        {item.amount}
                      </td>
                      <td className="px-2 py-1 border border-gray-600 truncate">
                        {item.pos_win}
                      </td>
                      <td className="px-2 py-1 border border-gray-600 truncate">
                        {item.bet_win}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </section>
        <ModalCoupon item={selectedItem} user={user} />
      </section>
    </>
  );
};

export default Deposits;

const bets_list = [
  {
    user: "cryptoRoshan",
    date: "03/09 03:17",
    coupon_id: "422442",
    type: "multiple",
    pre_live: "Bonus Pre",
    status: "Lost",
    amount: "20.00",
    pos_win: "0.00",
    bet_win: "0.00",
  },
  {
    user: "cryptoRoshan",
    date: "03/09 03:17",
    coupon_id: "422442",
    type: "multiple",
    pre_live: "Bonus Pre",
    status: "Lost",
    amount: "20.00",
    pos_win: "0.00",
    bet_win: "0.00",
  },
];

const total_info = {
  coupon_id: "Total: 2",
  type: "Open: 0",
  status: "Average: 20.00",
  amount: "40.00",
  pos_win: "0.00",
  bet_win: "0.00",
};
