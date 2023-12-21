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
import EventStatisticsTable from "../../../components/admin/components/admin/tools/EventStatistics/EventStatisticsTable";
import Pagination from "../../../components/admin/components/ui/Pagination";
import Input from "../../../components/admin/components/ui/Input";

const EventStatistics = () => {
  const { data: session } = useSession();

  const [currentDate, setCurrentDate] = useState("");
  const [gameId, setGameId] = useState(0);
  const [searchList, setSearchList] = useState(search_list);
  const [pageTotalCount, setPageTotalCount] = useState(2);
  const [currentPage, setCurrentPage] = useState(0);

  const [selectedItem, setSelectedItem] = useState(null);

  const onHandleSearch = async () => {};

  return (
    <>
      <section className="flex flex-col gap-4 p-4">
        <section className="flex flex-col gap-4">
          <div className="grid md:flex gap-1 justify-center items-center">
            <input
              type="date"
              className="w-44 fill-blue-500 h-9 text-primary text-lg font-medium focus:outline-none border border-primary bg-white"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
            />
            <Input
              className="bg-white border-gray-300 h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300 text-sm"
              placeholder="Id"
              disable_value={false}
              value={gameId}
              onHandleChange={(e: any) => {
                const regex = /^[0-9\b]+$/;
                if (e.target.value === "" || regex.test(e.target.value))
                  setGameId(Number(e.target.value));
              }}
            />
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
        <EventStatisticsTable
          tableList={searchList}
          currentPage={currentPage}
        />
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

export default EventStatistics;

const search_list = [
  {
    sport: "Football",
    country: "Iceland",
    league: "Deild",
    start_date: "2023-09-07 23:59:00",
    games: "KH Hlidarendi - UMF Skallagrimur",
    status: "NSY"
  },
  {
    sport: "Football",
    country: "Iceland",
    league: "Deild",
    start_date: "2023-09-07 23:59:00",
    games: "KH Hlidarendi - UMF Skallagrimur",
    status: "NSY"
  },
  {
    sport: "Football",
    country: "Iceland",
    league: "Deild",
    start_date: "2023-09-07 23:59:00",
    games: "KH Hlidarendi - UMF Skallagrimur",
    status: "NSY"
  },
  {
    sport: "Football",
    country: "Iceland",
    league: "Deild",
    start_date: "2023-09-07 23:59:00",
    games: "KH Hlidarendi - UMF Skallagrimur",
    status: "inprogress"
  },
  {
    sport: "Football",
    country: "Iceland",
    league: "Deild",
    start_date: "2023-09-07 23:59:00",
    games: "KH Hlidarendi - UMF Skallagrimur",
    status: "inprogress"
  },
  {
    sport: "Football",
    country: "Iceland",
    league: "Deild",
    start_date: "2023-09-07 23:59:00",
    games: "KH Hlidarendi - UMF Skallagrimur",
    status: "Suspend"
  },
  {
    sport: "Football",
    country: "Iceland",
    league: "Deild",
    start_date: "2023-09-07 23:59:00",
    games: "KH Hlidarendi - UMF Skallagrimur",
    status: "inprogress"
  }
];
