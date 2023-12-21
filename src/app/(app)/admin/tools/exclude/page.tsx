"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import clsx from "clsx";

import { useModalContext } from "../../../components/admin/contexts/ModalContext";
import {
  getUsersByQuery,
  getUserById,
  getUsersCreatedBy,
} from "../../api/userManagement";
import ModalExcludedBetTypes from "../../../components/admin/components/admin/tools/BetTypes/ModalExcludedBetTypes";
import Input from "../../../components/admin/components/ui/Input";

const Exclude = () => {
  const { data: session }: any = useSession();
  const { openExcludedBetTypesModal } = useModalContext();

  const [user, setUser] = useState("");
  const [descendants, setDescendants] = useState([]);
  const [descendantListView, setDescendantListView] = useState(false);

  const [eventId, setEventId] = useState("");

  return (
    <section className="flex flex-col gap-2 p-4">
      <div className="grid md:flex justify-between items-center w-full">
        <p className="text-sm text-white">
          Select the user you want to exclude bet types (If no user selected,
          bet types for this event will be excluded for all).
        </p>
        <button
          type="button"
          className="px-4 py-1.5 bg-green-700 hover:bg-green-600 text-brand-button-text hover:text-white"
          onClick={() => openExcludedBetTypesModal()}
        >
          Show All Excluded
        </button>
      </div>
      <div className="flex items-start">
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
      <div className="flex flex-col gap-1 items-start">
        <p className="text-sm text-white">Exclude bet types form an event.</p>
        <div className="flex gap-1 items-center">
          <Input
            className="bg-white border-gray-300 h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300 text-sm"
            placeholder="Event Id"
            disable_value={false}
            value={eventId}
            onHandleChange={(e: any) => setEventId(e.target.value)}
          />
          <button
            type="button"
            className={clsx("px-4 py-1.5 text-brand-button-text", eventId !=="" ? "hover:text-white hover:bg-green-600 bg-green-700" : "bg-green-800")}
            disabled={eventId === "" ? true : false}
          >
            Search
          </button>
        </div>
      </div>
      <ModalExcludedBetTypes />
    </section>
  );
};

export default Exclude;
