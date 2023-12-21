"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import { useModalContext } from "../../../components/admin/contexts/ModalContext";
import {
  getUsersByQuery,
  getUserById,
  getUsersCreatedBy,
} from "../../api/userManagement";
import Pagination from "../../../components/admin/components/ui/Pagination";
import Input from "../../../components/admin/components/ui/Input";

const Logs = () => {
  const { data: session } = useSession();

  const [type, setType] = useState("All Types");
  const [action, setAction] = useState("All Actions");
  const [userId, setUserId] = useState(0);
  const [startingOn, setStartingOn] = useState("");
  const [endingOn, setEndingOn] = useState("");
  // const [searchList, setSearchList] = useState();
  // const [pageTotalCount, setPageTotalCount] = useState(2);
  // const [currentPage, setCurrentPage] = useState(0);

  // const [selectedItem, setSelectedItem] = useState(null);

  const onHandleSearch = async () => {};

  return (
    <>
      <section className="flex flex-col gap-4 p-4">
        <section className="flex flex-col gap-4">
          <div className="grid md:flex gap-1 justify-center items-center">
            <div className="flex flex-col">
              <p className="text-sm text-white">Type:</p>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm block focus:ring-0 focus:border-gray-300"
                onChange={(e) => setType(e.target.value)}
              >
                <option value="All Types">All Types</option>
                <option value="Bonus">Bonus</option>
                <option value="Bonus Prime">Bonus Prime</option>
                <option value="Rakes">Rakes</option>
                <option value="Commissions">Commissions</option>
                <option value="Taxes">Taxes</option>
                <option value="Slots">Slots</option>
                <option value="Casino">Casino</option>
                <option value="Events">Events</option>
                <option value="Delay">Delay</option>
                <option value="Limits">Limits</option>
                <option value="Users">Users</option>
                <option value="Coupons">Coupons</option>
                <option value="Bet Type">Bet Type</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-white">Action:</p>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm block focus:ring-0 focus:border-gray-300"
                onChange={(e) => setAction(e.target.value)}
              >
                <option value="All Types">All Types</option>
                <option value="Change">Change</option>
                <option value="Remove">Remove</option>
                <option value="Attach">Attach</option>
                <option value="Block">Block</option>
                <option value="Snapshot">Snapshot</option>
                <option value="Reset">Reset</option>
                <option value="Deposit">Deposit</option>
                <option value="Withdraw">Withdraw</option>
                <option value="Merge">Merge</option>
              </select>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-white">User:</p>
              <Input
                className="bg-white border-gray-300 h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300 text-sm"
                placeholder="Id"
                disable_value={false}
                value={userId}
                onHandleChange={(e: any) => {
                  const regex = /^[0-9\b]+$/;
                  if (e.target.value === "" || regex.test(e.target.value))
                    setUserId(Number(e.target.value));
                }}
              />
            </div>
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
          <div className="flex justify-center">
            <button
              className="w-16 h-8 text-sm rounded-md bg-brand-dialog-button hover:bg-white"
              onClick={onHandleSearch}
            >
              Search
            </button>
          </div>
        </section>
      </section>
    </>
  );
};

export default Logs;
