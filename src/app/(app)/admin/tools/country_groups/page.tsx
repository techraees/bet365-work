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
import CountryGroupTable from "../../../components/admin/components/admin/tools/Countries/CountryGroupTable";
import Input from "../../../components/admin/components/ui/Input";
import Pagination from "../../../components/admin/components/ui/Pagination";

const CountryGroups = () => {
  const { data: session } = useSession();

  const [groupName, setGroupName] = useState("");

  const [searchList, setSearchList] = useState(search_list);
  const [pageTotalCount, setPageTotalCount] = useState(2);
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <section className="flex flex-col gap-4 p-4">
      <section className="flex gap-1 items-end">
        <div className="flex flex-col">
          <p className="text-sm text-white">Group Name:</p>
          <Input
            className="bg-white border-gray-300 h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300 text-sm"
            placeholder="Group Name"
            disable_value={false}
            value={groupName}
            onHandleChange={(e: any) => setGroupName(e.target.value)}
          />
        </div>
        <button
          type="button"
          className={clsx(
            "px-4 py-1.5 text-brand-button-text",
            groupName !== ""
              ? "hover:text-white hover:bg-green-600 bg-green-700"
              : "bg-green-800"
          )}
          disabled={groupName === "" ? true : false}
        >
          Create Group
        </button>
      </section>
      <CountryGroupTable tableList={searchList} currentPage={currentPage} />
      <div className="flex flex-row justify-center">
        <Pagination
          pageCount={pageTotalCount}
          gotoPage={(page: number) => setCurrentPage(page)}
        />
      </div>
    </section>
  );
};

export default CountryGroups;

const search_list = [
  {
    id: 2,
    name: "Main Countries",
    order: 10,
    show_title: false,
    show_countries: true,
  },
  {
    id: 29,
    name: "Internationals",
    order: 15,
    show_title: true,
    show_countries: false,
  },
  {
    id: 13,
    name: "Rest of Europe",
    order: 20,
    show_title: true,
    show_countries: false,
  },
  {
    id: 14,
    name: "Asia",
    order: 30,
    show_title: true,
    show_countries: false,
  },
  {
    id: 17,
    name: "North and Central America",
    order: 40,
    show_title: true,
    show_countries: false,
  },
  {
    id: 28,
    name: "South America",
    order: 50,
    show_title: true,
    show_countries: false,
  },
  {
    id: 18,
    name: "Oceania",
    order: 60,
    show_title: true,
    show_countries: false,
  },
  {
    id: 19,
    name: "Africa",
    order: 70,
    show_title: true,
    show_countries: false,
  },
];
