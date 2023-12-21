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
import ExcludeEventsTable from "../../../components/admin/components/admin/tools/ExcludeEvents/ExcludeEventsTable";
import Input from "../../../components/admin/components/ui/Input";
import Pagination from "../../../components/admin/components/ui/Pagination";

const CountryGroups = () => {
  const { data: session } = useSession();

  const [excludeId, setExcludeId] = useState(0);
  const [showTable, setShowTable] = useState(false);

  const [searchList, setSearchList] = useState([]);
  const [pageTotalCount, setPageTotalCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <section className="flex flex-col gap-4 p-4">
      <section className="flex gap-1 justify-end items-end">
        <Input
          className="bg-white border-gray-300 h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300 text-sm"
          placeholder="Id"
          disable_value={false}
          value={excludeId}
          onHandleChange={(e: any) => {
            const regex = /^[0-9\b]+$/;
            if (e.target.value === "" || regex.test(e.target.value))
              setExcludeId(Number(e.target.value));
          }}
        />
        <button
          type="button"
          className={clsx(
            "px-4 py-1.5 text-brand-button-text",
            excludeId !== 0
              ? "hover:text-white hover:bg-green-600 bg-green-700"
              : "bg-green-800"
          )}
          disabled={excludeId === 0 ? true : false}
          onClick={() => {
            setSearchList(search_list);
            setShowTable(true);
          }}
        >
          Add Event
        </button>
      </section>
      {showTable === true && (
        <>
          <ExcludeEventsTable
            tableList={searchList}
            currentPage={currentPage}
          />
          {pageTotalCount > 1 && (
            <div className="flex flex-row justify-center">
              <Pagination
                pageCount={pageTotalCount}
                gotoPage={(page: number) => setCurrentPage(page)}
              />
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default CountryGroups;

const search_list: any = [
  {
    event: 22998059,
    agent: "cryptoRoshan",
    time: "07/09 22:44",
  },
];
