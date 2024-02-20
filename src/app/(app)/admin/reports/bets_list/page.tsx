"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { toast } from "react-toastify";

import { useModalContext } from "../../../components/admin/contexts/ModalContext";
import { getUsersByQuery } from "../../api/userManagement";
import { getCoupons } from "../../api/reports";
import ModalCoupon from "../../../components/admin/components/admin/reports/BetsList/ModalCoupon";

const BetsList = () => {
  const { data: session }: any = useSession();
  const { openCouponModal } = useModalContext();

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
  const [sumSymbol, setSumSymbol] = useState("All");
  const [sumOdds, setSumOdds] = useState(0);
  const [cashout, setCashout] = useState("All");
  const [bonus, setBonus] = useState("All");

  const [user, setUser] = useState({
    _id: "",
    username: "",
  });
  const [selectedUser, setSelectedUser]: any = useState({
    _id: "",
    username: "",
  });
  const [descendants, setDescendants] = useState([]);
  const [descendantListView, setDescendantListView] = useState(false);

  const [solo, setSolo] = useState(true);
  const [multiple, setMultiple] = useState(true);
  const [system, setSystem] = useState(true);
  const [pregame, setPregame] = useState(true);
  const [live, setLive] = useState(true);
  const [mix, setMix] = useState(true);
  const [won, setWon] = useState(true);
  const [lost, setLost] = useState(true);
  const [open, setOpen] = useState(true);

  const [betsList, setBetsList]: Array<any> = useState(null);
  const [totalInfo, setTotalInfo]: any = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const onHandleSearch = async () => {
    const _res = await getCoupons(
      session.user.token,
      session.user.role,
      selectedUser._id,
      startingOn,
      endingOn,
      solo,
      multiple,
      system,
      pregame,
      live,
      mix,
      won,
      lost,
      open,
      betSymbol,
      betCost,
      sumSymbol,
      sumOdds,
      cashout,
      bonus
    );
    if (_res?.status === 200) {
      setBetsList(_res.data);

      let _totalAmount = 0;
      let _totalPossibleWinnings = 0;
      let _totalWonAmount = 0;
      for (let i = 0; i < _res.data.length; i++) {
        _totalAmount += _res.data[i].stake;
        _totalPossibleWinnings += _res.data[i].possible_winnings;
        _totalWonAmount += _res.data[i].won_amount;
      }
      setTotalInfo({
        coupon_id: `Total: ${_res.data.length}`,
        type: "Open: 0",
        status: `Average: ${_totalAmount / _res.data.length}`,
        amount: _totalAmount,
        possible_winnings: _totalPossibleWinnings,
        won_amount: _totalWonAmount,
      });
    } else toast.error(_res?.data.message);
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
                  value={user.username}
                  onChange={async (e) => {
                    setDescendantListView(false);
                    setUser({
                      _id: "",
                      username: e.target.value,
                    });
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
                          setUser(item);
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
          <div className="flex flex-col md:flex-row gap-2 justify-center w-2/3 mx-auto">
            <div className="flex justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-100 focus:ring-0 focus:ring-offset-0"
                  onChange={() => setSolo(!solo)}
                  checked={solo === true ? true : false}
                />
                <label className="ml-0.5 text-sm font-medium text-white">
                  Solo
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
                  onChange={() => setPregame(!pregame)}
                  checked={pregame === true ? true : false}
                />
                <label className="ml-0.5 text-sm font-medium text-white">
                  Pregame
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-100 focus:ring-0 focus:ring-offset-0"
                  onChange={() => setLive(!live)}
                  checked={live === true ? true : false}
                />
                <label className="ml-0.5 text-sm font-medium text-white">
                  Live
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-100 focus:ring-0 focus:ring-offset-0"
                  onChange={() => setMix(!mix)}
                  checked={mix === true ? true : false}
                />
                <label className="ml-0.5 text-sm font-medium text-white">
                  Mix
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
                  onChange={() => setOpen(!open)}
                  checked={open === true ? true : false}
                />
                <label className="ml-0.5 text-sm font-medium text-white">
                  Open
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
        {betsList !== null && (
          <section className="pt-4 w-full overflow-scroll md:overflow-hidden">
            {betsList.length === 0 ? (
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
                      {totalInfo.coupon_id}
                    </td>
                    <td className="px-2 py-1 border border-gray-600 truncate">
                      {totalInfo.type}
                    </td>
                    <td className="px-2 py-1 border border-gray-600 truncate"></td>
                    <td className="px-2 py-1 border border-gray-600 truncate">
                      {totalInfo.status}
                    </td>
                    <td className="px-2 py-1 border border-gray-600 truncate">
                      {totalInfo.amount}
                    </td>
                    <td className="px-2 py-1 border border-gray-600 truncate">
                      {totalInfo.possible_winnings}
                    </td>
                    <td className="px-2 py-1 border border-gray-600 truncate">
                      {totalInfo.won_amount}
                    </td>
                  </tr>
                  {betsList.map((item: any, index: number) => {
                    return (
                      <tr
                        key={index}
                        className="bg-brand-dark-grey text-white"
                        onClick={() => {
                          setSelectedItem(item);
                          openCouponModal();
                        }}
                      >
                        <td className="px-2 py-1 border border-gray-600 truncate">
                          {item.placedBy}
                        </td>
                        <td className="px-2 py-1 border border-gray-600 truncate">
                          {item.timestamp}
                        </td>
                        <td className="px-2 py-1 border border-gray-600 truncate">
                          {item._id}
                        </td>
                        <td className="px-2 py-1 border border-gray-600 truncate">
                          {item.type}
                        </td>
                        <td className="px-2 py-1 border border-gray-600 truncate">
                          {item.coupon_type}
                        </td>
                        <td className="px-2 py-1 border border-gray-600 truncate">
                          {item.status}
                        </td>
                        <td className="px-2 py-1 border border-gray-600 truncate">
                          {item.stake}
                        </td>
                        <td className="px-2 py-1 border border-gray-600 truncate">
                          {item.possible_winnings}
                        </td>
                        <td className="px-2 py-1 border border-gray-600 truncate">
                          {item.won_amount}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </section>
        )}
        <ModalCoupon item={selectedItem} user={user} />
      </section>
    </>
  );
};

export default BetsList;
