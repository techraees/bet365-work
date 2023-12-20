"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import clsx from "clsx";

import {
  getUsersByQuery,
  getUserById,
  getUsersCreatedBy,
} from "../../api/userManagement";
import Input from "@/app/(app)/components/admin/components/ui/Input";

const Users = () => {
  const { data: session } = useSession();

  const [startingOn, setStartingOn] = useState("");
  const [endingOn, setEndingOn] = useState("");
  const [bonus, setBonus] = useState("All Bonuses");
  const [status, setStatus] = useState("All Status");
  const [userId, setUserId] = useState("");

  const [betsList, setBetsList] = useState(bets_list);
  const [selectedItem, setSelectedItem] = useState(null);

  const onHandleSearch = async () => {};

  return (
    <>
      <section className="flex flex-col gap-4 p-4">
        <section className="flex flex-col gap-4">
          <div className="grid md:flex gap-1 items-end">
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
              <p className="text-sm text-white">Bonus:</p>
              <select
                className="bg-gray-50 border border-gray-300 h-9 text-gray-900 text-xs rounded-sm block focus:ring-0 focus:border-gray-300"
                onChange={(e) => setBonus(e.target.value)}
              >
                <option value="All Bonuses">All Bonuses</option>
                <option value="Loyalty">Loyalty</option>
                <option value="Deposit">Deposit</option>
                <option value="Registration">Registration</option>
              </select>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-white">Status:</p>
              <select
                className="bg-gray-50 border border-gray-300 h-9 text-gray-900 text-xs rounded-sm block focus:ring-0 focus:border-gray-300"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="All Status">All Status</option>
                <option value="Requested">Requested</option>
                <option value="Activated">Activated</option>
                <option value="Blocked">Blocked</option>
                <option value="Converted">Converted</option>
                <option value="Expired">Expired</option>
                <option value="Lost">Lost</option>
                <option value="Cancel">Cancel</option>
              </select>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-white">User Id:</p>
              <Input
                className="bg-white border-gray-300 w-24 h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300 text-sm"
                placeholder="User Id"
                disable_value={false}
                value={userId}
                onHandleChange={(e: any) => setUserId(e.target.value)}
              />
            </div>
            <button
              className="w-16 h-9 text-sm bg-[#333] hover:bg-[#444] text-white border border-black"
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
            <table className="w-full text-sm text-gray-400 bg-[#777] text-center">
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
                    Bonus
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
                    Converted
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1.5 border border-gray-600 truncate"
                  >
                    Requested
                  </th>
                  <th
                    scope="col"
                    className="px-2 py-1.5 border border-gray-600 truncate"
                  >
                    Expires
                  </th>
                  <th
                    scope="col"
                    className="w-6 px-2 py-1.5 border border-gray-600 truncate"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {betsList?.map((item: any, index: number) => {
                  return (
                    <tr key={index} className="text-white hover:cursor-pointer">
                      <td className="px-2 py-1 border border-gray-600 truncate">
                        {item.user}
                      </td>
                      <td className="px-2 py-1 border border-gray-600 truncate">
                        {item.bonus}
                      </td>
                      <td className="px-2 py-1 border border-gray-600 truncate">
                        {item.status}
                      </td>
                      <td className="px-2 py-1 border border-gray-600 truncate">
                        {item.amount}
                      </td>
                      <td className="px-2 py-1 border border-gray-600 truncate">
                        {item.converted}
                      </td>
                      <td className="px-2 py-1 border border-gray-600 truncate">
                        {item.requested}
                      </td>
                      <td className="px-2 py-1 border border-gray-600 truncate">
                        {item.expires}
                      </td>
                      <td className="w-6 px-1 py-1 border border-gray-600 truncate">
                        <div className="flex justify-end gap-1 w-full">
                          <button
                            type="button"
                            className="bg-brand-button text-brand-button-text hover:text-white px-2 md:px-4 h-8 border border-black"
                          >
                            Details
                          </button>
                          <button
                            type="button"
                            className="bg-brand-button text-brand-button-text hover:text-white px-2 md:px-4 h-8 border border-black"
                          >
                            Transactions
                          </button>
                          <button
                            type="button"
                            className="bg-brand-button text-brand-button-text hover:text-white px-2 md:px-4 h-8 border border-black"
                          >
                            Activate
                          </button>
                          <button
                            type="button"
                            className="bg-brand-button text-brand-button-text hover:text-white px-2 md:px-4 h-8 border border-black"
                          >
                            Block
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </section>
      </section>
    </>
  );
};

export default Users;

const bets_list = [
  {
    user: "cryptoRoshan",
    bonus: "bonus 10%",
    status: "Activated",
    amount: "0.00/21.41",
    converted: "0.00",
    requested: "07/09/2023",
    expires: "30/09/2023",
  },
];
