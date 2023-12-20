"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { toast } from "react-toastify";

import { getUsersByQuery } from "../../api/userManagement";
import { getTransactions } from "../../api/reports";
import TransactionTable from "@/app/(app)/components/admin/components/admin/reports/Transactions/TransactionTable";
import Pagination from "@/app/(app)/components/admin/components/ui/Pagination";

const Transactions = () => {
  const { data: session }: any = useSession();
  const searchParams = useSearchParams();
  const username = searchParams?.get("username");

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
  
  const [kind, setKind] = useState("All");
  const [type, setType] = useState("All");

  const [actionUser, setActionUser] = useState("");
  const [selectedActionUser, setSelectedActionUser]: any = useState({
    _id: "",
    username: "",
  });
  const [actionDescendants, setActionDescendants] = useState([]);
  const [actionDescendantListView, setActionDescendantListView] = useState(false);

  const [targetUser, setTargetUser] = useState("");
  const [selectedTargetUser, setSelectedTargetUser]: any = useState({
    _id: "",
    username: "",
  });
  const [targetDescendants, setTargetDescendants] = useState([]);
  const [targetDescendantListView, setTargetDescendantListView] = useState(false);

  const [pageTotalCount, setPageTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [transactionData, setTransactionData] = useState([]);

  const onHandleSearch = async () => {
    const _res = await getTransactions(
      session.user.token,
      session.user.role,
      selectedActionUser._id,
      selectedActionUser.username,
      selectedTargetUser._id,
      selectedTargetUser.username,
      startingOn,
      endingOn,
      type
    );
    if (_res?.status === 200) {
      setTransactionData(_res?.data);
      setPageTotalCount(Math.ceil(_res?.data.length/5));
    }
    else
      toast.error(_res?.data.message);
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
          {username !== null && (
            <div className="flex flex-col">
              <p className="text-sm text-white">Kind:</p>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm block focus:ring-0 focus:border-gray-300"
                onChange={(e) => setKind(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Sport">Sport</option>
                <option value="Slots">Slots</option>
                <option value="Casino">Casino</option>
                <option value="Poker">Poker</option>
                <option value="Internal">Internal</option>
                <option value="Voucher">Voucher</option>
                <option value="Payment">Payment</option>
                <option value="Virtual">Virtual</option>
                <option value="Lottery">Lottery</option>
                <option value="Egames">Egames</option>
              </select>
            </div>
          )}
          {username === null && (
            <>
              <div className="flex flex-col">
                <p className="text-sm text-white">Type:</p>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm block focus:ring-0 focus:border-gray-300"
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="In">Increase</option>
                  <option value="Out">Decrease</option>
                </select>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-white">Action User:</p>
                <div className="relative">
                  <input
                    type="text"
                    className="bg-white border-gray-300 w-48 h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300"
                    value={actionUser}
                    onChange={async (e) => {
                      setActionDescendantListView(false);
                      setActionUser(e.target.value);
                      const _res = await getUsersByQuery(
                        e.target.value,
                        session.user.token
                      );
                      setActionDescendants(_res);
                      setActionDescendantListView(true);
                    }}
                  />
                  <div
                    className={clsx(
                      "absolute right-0 flex-col bg-white rounded-sm",
                      actionDescendantListView === true ? "flex" : "hidden"
                    )}
                  >
                    {actionDescendants.map((item: any, index: number) => {
                      return (
                        <div
                          key={index}
                          className="hover:bg-red-400 px-4 cursor-pointer py-1"
                          onClick={() => {
                            setActionUser(item.username);
                            setSelectedActionUser(item);
                            setActionDescendantListView(false);
                          }}
                        >
                          {item.username}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-sm text-white">Target User:</p>
                <div className="relative">
                  <input
                    type="text"
                    className="bg-white border-gray-300 w-48 h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300"
                    value={targetUser}
                    onChange={async (e) => {
                      setTargetDescendantListView(false);
                      setTargetUser(e.target.value);
                      const _res = await getUsersByQuery(
                        e.target.value,
                        session.user.token
                      );
                      setTargetDescendants(_res);
                      setTargetDescendantListView(true);
                    }}
                  />
                  <div
                    className={clsx(
                      "absolute right-0 flex-col bg-white rounded-sm",
                      targetDescendantListView === true ? "flex" : "hidden"
                    )}
                  >
                    {targetDescendants.map((item: any, index: number) => {
                      return (
                        <div
                          key={index}
                          className="hover:bg-red-400 px-4 cursor-pointer py-1"
                          onClick={() => {
                            setTargetUser(item.username);
                            setSelectedTargetUser(item);
                            setTargetDescendantListView(false);
                          }}
                        >
                          {item.username}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
          {username !== null && (
            <div className="flex flex-col">
              <p className="text-sm text-white">Type:</p>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm block focus:ring-0 focus:border-gray-300"
                onChange={(e) => setType(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Bet">Bet</option>
                <option value="Win">Win</option>
                <option value="Rollback">Rollback</option>
                <option value="Cashout">Cashout</option>
                <option value="Deposit">Deposit</option>
                <option value="Withdraw">Withdraw</option>
                <option value="Convert">Convert</option>
                <option value="Cancel">Cancel</option>
                <option value="Void">Void</option>
                <option value="Merge Balance">Merge Balance</option>
                <option value="Pay">Pay</option>
                <option value="Pay Out">Pay Out</option>
                <option value="BETWIN">BETWIN</option>
                <option value="Cancel Withdraw">Cancel Withdraw</option>
              </select>
            </div>
          )}
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
      {transactionData?.length === 0 ? (
        <p className="text-lg font-bold text-center text-brand-button-text">
          No results
        </p>
      ) : (
        <section className="flex flex-col gap-4 pt-4">
          <TransactionTable
            currentPage={currentPage}
            transactionData={transactionData}
          />
          {pageTotalCount > 1 && (
            <div className="flex flex-row justify-center">
              <Pagination
                pageCount={pageTotalCount}
                gotoPage={(page: number) => setCurrentPage(page)}
              />
            </div>
          )}
        </section>
      )}
    </section>
  );
};

export default Transactions;
