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
import CasinoTransactionsTable from "../../../components/admin/components/admin/tools/CasinoTransactions/CasinoTransactionsTable";
import Input from "../../../components/admin/components/ui/Input";
import Pagination from "../../../components/admin/components/ui/Pagination";

const CasinoTransactions = () => {
  const { data: session }: any = useSession();
  const { openCasinoTransactionModal } = useModalContext();

  const [startingOn, setStartingOn] = useState("");
  const [endingOn, setEndingOn] = useState("");
  const [cashout, setCashout] = useState("All");
  const [bonus, setBonus] = useState("All");
  const [betSymbol, setBetSymbol] = useState("All");
  const [betCost, setBetCost] = useState(0);
  const [winSymbol, setWinSymbol] = useState("All");
  const [winAmount, setWinAmount] = useState(0);
  const [userId, setUserId] = useState("");
  const [providers, setProviders] = useState("All");

  const [user, setUser] = useState("");
  const [searchList, setSearchList] = useState(search_list);
  const [descendants, setDescendants] = useState([]);
  const [descendantListView, setDescendantListView] = useState(false);

  const [pageTotalCount, setPageTotalCount] = useState(2);
  const [currentPage, setCurrentPage] = useState(0);

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
            <div className="flex flex-col">
              <p className="text-sm text-white">Providers:</p>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm block focus:ring-0 focus:border-gray-300"
                onChange={(e) => setProviders(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Live Casino">Live Casino</option>
                <option value="Evolution">Evolution</option>
                <option value="BBTECH">BBTECH</option>
                <option value="Betsoft">Betsoft</option>
                <option value="Spinomenal">Spinomenal</option>
                <option value="Tom Horn">Tom Horn</option>
                <option value="Arrow's Edge">Arrow&apos;s Edge</option>
                <option value="7Mojos">7Mojos</option>
                <option value="Leap">Leap</option>
                <option value="Red Rake">Red Rake</option>
                <option value="Booongo">Booongo</option>
                <option value="Playson">Playson</option>
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
        <CasinoTransactionsTable tableList={searchList} currentPage={currentPage} />
        <div className="flex flex-row justify-center">
          <Pagination
            pageCount={pageTotalCount}
            gotoPage={(page: number) => setCurrentPage(page)}
          />
        </div>
      </section>
    </>
  );
};

export default CasinoTransactions;

const search_list = [
  {
    id: "17179924",
    user: "cryptoRoshan",
    date: "07/09 12:31:56",
    type: "BETWIN",
    bet_amount: "0.20",
    win_amount: "0.18",
    balance: "7.20",
    vendor: "ekko",
    game: "9k Yeti",
    round: "1084171997",
    description: "GameRound TableID=3"
  },
  {
    id: "17179924",
    user: "cryptoRoshan",
    date: "07/09 12:31:56",
    type: "BETWIN",
    bet_amount: "0.20",
    win_amount: "0.18",
    balance: "7.20",
    vendor: "ekko",
    game: "9k Yeti",
    round: "1084171997",
    description: "GameRound TableID=3"
  },
  {
    id: "17179924",
    user: "cryptoRoshan",
    date: "07/09 12:31:56",
    type: "BETWIN",
    bet_amount: "0.20",
    win_amount: "0.18",
    balance: "7.20",
    vendor: "ekko",
    game: "9k Yeti",
    round: "1084171997",
    description: "GameRound TableID=3"
  },
  {
    id: "17179924",
    user: "cryptoRoshan",
    date: "07/09 12:31:56",
    type: "BETWIN",
    bet_amount: "0.20",
    win_amount: "0.18",
    balance: "7.20",
    vendor: "ekko",
    game: "9k Yeti",
    round: "1084171997",
    description: "GameRound TableID=3"
  },
  {
    id: "17179924",
    user: "cryptoRoshan",
    date: "07/09 12:31:56",
    type: "BETWIN",
    bet_amount: "0.20",
    win_amount: "0.18",
    balance: "7.20",
    vendor: "ekko",
    game: "9k Yeti",
    round: "1084171997",
    description: "GameRound TableID=3"
  },
  {
    id: "17179924",
    user: "cryptoRoshan",
    date: "07/09 12:31:56",
    type: "BETWIN",
    bet_amount: "0.20",
    win_amount: "0.18",
    balance: "7.20",
    vendor: "ekko",
    game: "9k Yeti",
    round: "1084171997",
    description: "GameRound TableID=3"
  },
  {
    id: "17179924",
    user: "cryptoRoshan",
    date: "07/09 12:31:56",
    type: "BETWIN",
    bet_amount: "0.20",
    win_amount: "0.18",
    balance: "7.20",
    vendor: "ekko",
    game: "9k Yeti",
    round: "1084171997",
    description: "GameRound TableID=3"
  },
  {
    id: "17179924",
    user: "cryptoRoshan",
    date: "07/09 12:31:56",
    type: "BETWIN",
    bet_amount: "0.20",
    win_amount: "0.18",
    balance: "7.20",
    vendor: "ekko",
    game: "9k Yeti",
    round: "1084171997",
    description: "GameRound TableID=3"
  }
];
