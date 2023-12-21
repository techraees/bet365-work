"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

import { useModalContext } from "../../../components/admin/contexts/ModalContext";
import {
  getUsersByQuery,
  getUserById,
  getUsersCreatedBy,
} from "../../api/userManagement";
import LocationTable from "../../../components/admin/components/admin/tools/Locations/LocationTable";
import DuplicateTable from "../../../components/admin/components/admin/tools/Locations/DuplicateTable";
import Pagination from "../../../components/admin/components/ui/Pagination";
import Input from "../../../components/admin/components/ui/Input";

const Locations = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [ipAddress, setIpAddress] = useState("");
  const [startingOn, setStartingOn] = useState("");
  const [endingOn, setEndingOn] = useState("");
  const [locationTableView, setLocationTableView] = useState(false);
  const [duplicateTableView, setDuplicateTableView] = useState(false);

  const [searchList, setSearchList] = useState([]);
  const [pageTotalCount, setPageTotalCount] = useState(2);
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <section className="flex flex-col gap-4 p-4">
      <section className="flex justify-between">
        <div className="grid md:flex gap-1 items-end">
          <div className="flex flex-col">
            <p className="text-sm text-white">Ip Address:</p>
            <Input
              className="bg-white border-gray-300 w-24 h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300 text-sm"
              placeholder="Ip"
              disable_value={false}
              value={ipAddress}
              onHandleChange={(e: any) => setIpAddress(e.target.value)}
            />
          </div>
          <button
            type="button"
            className={clsx(
              "px-4 py-1.5 text-brand-button-text",
              ipAddress !== ""
                ? "hover:text-white hover:bg-green-600 bg-green-700"
                : "bg-green-800"
            )}
            disabled={ipAddress === "" ? true : false}
            onClick={() => {
              setSearchList(search_location_list);
              setDuplicateTableView(false);
              setLocationTableView(true);
            }}
          >
            Search
          </button>
        </div>
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
          <button
            type="button"
            className="px-4 py-1.5 bg-green-700 hover:bg-green-600 text-brand-button-text hover:text-white"
            onClick={() => {
              setSearchList(search_duplicate_table);
              setLocationTableView(false);
              setDuplicateTableView(true);
            }}
          >
            Find Duplicates
          </button>
        </div>
      </section>
      {locationTableView === true && (
        <>
          <LocationTable tableList={searchList} currentPage={currentPage} />
          <div className="flex flex-row justify-center">
            <Pagination
              pageCount={pageTotalCount}
              gotoPage={(page: number) => setCurrentPage(page)}
            />
          </div>
        </>
      )}
      {duplicateTableView === true && (
        <>
          <DuplicateTable
            tableList={searchList}
            currentPage={currentPage}
            onHandleClick={() => {
              setSearchList(search_location_list);
              setDuplicateTableView(false);
              setLocationTableView(true);
            }}
          />
          <div className="flex flex-row justify-center">
            <Pagination
              pageCount={pageTotalCount}
              gotoPage={(page: number) => setCurrentPage(page)}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default Locations;

const search_location_list: any = [
  {
    ip: "91.140.28.138",
    user: "tolis11",
    type: "Player",
    city: "Thessaloniki",
    platform: "Mac",
    device: "Mobile",
    browser: "Safari: 16.6",
    time: "05/09 23:18",
  },
  {
    ip: "91.140.28.138",
    user: "tolis11",
    type: "Player",
    city: "Thessaloniki",
    platform: "Mac",
    device: "Mobile",
    browser: "Safari: 16.6",
    time: "05/09 23:18",
  },
  {
    ip: "91.140.28.138",
    user: "tolis11",
    type: "Player",
    city: "Thessaloniki",
    platform: "Mac",
    device: "Mobile",
    browser: "Safari: 16.6",
    time: "05/09 23:18",
  },
  {
    ip: "91.140.28.138",
    user: "tolis11",
    type: "Player",
    city: "Thessaloniki",
    platform: "Mac",
    device: "Mobile",
    browser: "Safari: 16.6",
    time: "05/09 23:18",
  },
  {
    ip: "91.140.28.138",
    user: "tolis11",
    type: "Player",
    city: "Thessaloniki",
    platform: "Mac",
    device: "Mobile",
    browser: "Safari: 16.6",
    time: "05/09 23:18",
  },
  {
    ip: "91.140.28.138",
    user: "tolis11",
    type: "Player",
    city: "Thessaloniki",
    platform: "Mac",
    device: "Mobile",
    browser: "Safari: 16.6",
    time: "05/09 23:18",
  },
  {
    ip: "91.140.28.138",
    user: "tolis11",
    type: "Player",
    city: "Thessaloniki",
    platform: "Mac",
    device: "Mobile",
    browser: "Safari: 16.6",
    time: "05/09 23:18",
  },
  {
    ip: "91.140.28.138",
    user: "tolis11",
    type: "Player",
    city: "Thessaloniki",
    platform: "Mac",
    device: "Mobile",
    browser: "Safari: 16.6",
    time: "05/09 23:18",
  },
];

const search_duplicate_table: any = [
  {
    ip: "109.242.25.184",
    users: 11,
  },
  {
    ip: "109.242.25.184",
    users: 11,
  },
  {
    ip: "109.242.25.184",
    users: 11,
  },
  {
    ip: "109.242.25.184",
    users: 11,
  },
  {
    ip: "109.242.25.184",
    users: 11,
  },
  {
    ip: "109.242.25.184",
    users: 11,
  },
  {
    ip: "109.242.25.184",
    users: 11,
  },
  {
    ip: "109.242.25.184",
    users: 11,
  },
  {
    ip: "109.242.25.184",
    users: 11,
  },
];
