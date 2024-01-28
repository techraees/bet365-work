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
import { getEvents } from "../../api/events";
import Input from "../../../components/admin/components/ui/Input";

const EventStatistics = () => {
  const { data: session } = useSession();

  const [currentDate, setCurrentDate] = useState("");
  const [gameId, setGameId] = useState(0);
  const [pageTotalCount, setPageTotalCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const [events, setEvents] = useState<any>([]);
  const [uniqueSports, setUniqueSports] = useState<any>([]);
  const [uniqueStatuses, setUniqueStatuses] = useState<any>([]);
  const [selectedSport, setSelectedSport] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const [filteredEvents, setFilteredEvents] = useState([]);
  var total_number_of_elements_per_page = 50;
  useEffect(() => {
    var total_pages =
      (filteredEvents.length > 0 ? filteredEvents.length : events.length) /
      total_number_of_elements_per_page;
    total_pages = Math.ceil(total_pages);
    setPageTotalCount(total_pages);
  }, [filteredEvents, events]);

  // useEffect to call getEvents
  useEffect(() => {
    if (session === undefined) {
      return;
    }
    async function fetchEvents() {
      try {
        const fetchedEvents = await getEvents(
          //@ts-ignore
          session?.user?.token,
          //@ts-ignore
          session?.user?.role
        );
        setEvents(fetchedEvents);
        const sportsSet = new Set(fetchedEvents.map((item: any) => item.sport));
        const statusesSet = new Set(
          fetchedEvents.map((item: any) => item.status)
        );
        setUniqueSports(["All", ...Array.from(sportsSet)]);
        setUniqueStatuses(["All", ...Array.from(statusesSet)]);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    fetchEvents();
  }, [session]);

  useEffect(() => {
    // Filter events based on selected sport and status
    const filtered = events.filter(
      (item: any) =>
        (selectedSport === "All" || item.sport === selectedSport) &&
        (selectedStatus === "All" || item.status === selectedStatus)
    );
    setFilteredEvents(filtered);
  }, [selectedSport, selectedStatus, events]);

  const handleSportChange = (e: any) => {
    const sport = e.target.value;
    setSelectedSport(sport);
  };

  const handleStatusChange = (e: any) => {
    const status = e.target.value;
    setSelectedStatus(status);
  };

  const onHandleSearch = async () => {};

  var targetEvents = [];
  if (filteredEvents.length > 0) {
    targetEvents = filteredEvents;
  } else {
    targetEvents = events;
  }

  return (
    <>
      <section className="flex flex-col gap-4 p-4">
        <section className="flex flex-col gap-2">
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
          <div className="grid md:flex gap-1 justify-center items-center">
            <div className="flex">
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm block focus:ring-0 focus:border-gray-300"
                onChange={handleSportChange}
                // onChange={(e) => setBetSymbol(e.target.value)}
              >
                {uniqueSports.map((sport: any) => (
                  <option key={sport} value={sport}>
                    {sport}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:flex gap-1 justify-center items-center">
            <div className="flex">
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm block focus:ring-0 focus:border-gray-300"
                onChange={handleStatusChange}
                // onChange={(e) => setBetSymbol(e.target.value)}
              >
                {uniqueStatuses.map((status: any) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
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
        <EventStatisticsTable
          tableList={targetEvents}
          currentPage={currentPage}
          numberOfElementsPerPage={total_number_of_elements_per_page}
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
