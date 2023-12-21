"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";

import SortGroupsTable from "../../../components/admin/components/admin/limits/SortGroups/SortGroupsTable";
import Pagination from "../../../components/admin/components/ui/Pagination";

const SortGroups = () => {
  const { data: session } = useSession();

  const [sport, setSport] = useState("Select Sport");
  const [country, setCountry] = useState("Select Country");

  const [searchList, setSearchList] = useState(search_list);
  const [pageTotalCount, setPageTotalCount] = useState(2);
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <section className="flex flex-col gap-4 p-4">
      <section className="flex gap-1 justify-center items-center">
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm block focus:ring-0 focus:border-gray-300"
          onChange={(e) => setSport(e.target.value)}
        >
          <option value="Select Sport">Select Sport</option>
          <option value="Football">Football</option>
          <option value="Basketball">Basketball</option>
          <option value="Tennis">Tennis</option>
          <option value="Volleyball">Volleyball</option>
          <option value="Table Tennis">Table Tennis</option>
          <option value="Handball">Handball</option>
          <option value="Futsal">Futsal</option>
          <option value="Ice Hockey">Ice Hockey</option>
        </select>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm block focus:ring-0 focus:border-gray-300"
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="Select Country">Select Country</option>
          <option value="Africa">Africa</option>
          <option value="Albania">Albania</option>
          <option value="Algeria">Algeria</option>
        </select>
      </section>
      <SortGroupsTable tableList={searchList} currentPage={currentPage} />
      <div className="flex flex-row justify-center">
        <Pagination
          pageCount={pageTotalCount}
          gotoPage={(page: number) => setCurrentPage(page)}
        />
      </div>
    </section>
  );
};

export default SortGroups;

const search_list = [
  {
    sport: "Football",
    country: "Argentina",
    id: 1683,
    league: "Copa Argentina",
    group: "Group 3"
  },
  {
    sport: "Football",
    country: "Argentina",
    id: 1683,
    league: "Copa Argentina",
    group: "Group 3"
  },
  {
    sport: "Football",
    country: "Argentina",
    id: 1683,
    league: "Copa Argentina",
    group: "Group 3"
  },
  {
    sport: "Football",
    country: "Argentina",
    id: 1683,
    league: "Copa Argentina",
    group: "Group 3"
  },
  {
    sport: "Football",
    country: "Argentina",
    id: 1683,
    league: "Copa Argentina",
    group: "Group 3"
  },
  {
    sport: "Football",
    country: "Argentina",
    id: 1683,
    league: "Copa Argentina",
    group: "Group 3"
  },
  {
    sport: "Football",
    country: "Argentina",
    id: 1683,
    league: "Copa Argentina",
    group: "Group 3"
  }
];