"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import { useModalContext } from "../../../components/admin/contexts/ModalContext";
import SportsTable from "../../../components/admin/components/admin/tools/Sports/SportsTable";
import Pagination from "../../../components/admin/components/ui/Pagination";

const Sports = () => {
  const { data: session } = useSession();
  const { openCasinoTransactionModal } = useModalContext();

  const [sport, setSport] = useState("Football");
  const [country, setCountry] = useState("All Countries");

  const [searchList, setSearchList] = useState(search_list);
  const [pageTotalCount, setPageTotalCount] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <section className="flex flex-col gap-4 p-4">
      <SportsTable tableList={searchList} currentPage={currentPage} />
      <div className="flex flex-row justify-center">
        <Pagination
          pageCount={pageTotalCount}
          gotoPage={(page: number) => setCurrentPage(page)}
        />
      </div>
    </section>
  );
};

export default Sports;

const search_list = [
  {
    sport_id: 6046,
    sport: "Football",
    active: true,
    order: 10
  },
  {
    sport_id: 48242,
    sport: "Basketball",
    active: true,
    order: 20
  },
  {
    sport_id: 54094,
    sport: "Tennis",
    active: true,
    order: 30
  },
  {
    sport_id: 154830,
    sport: "Volleyball",
    active: true,
    order: 40
  },
  {
    sport_id: 265917,
    sport: "Table Tennis",
    active: true,
    order: 50
  },
  {
    sport_id: 55,
    sport: "Handball",
    active: true,
    order: 60
  },
  {
    sport_id: 131506,
    sport: "American Football",
    active: false,
    order: 60
  },
  {
    sport_id: 65,
    sport: "Futsal",
    active: true,
    order: 70
  },
  {
    sport_id: 35232,
    sport: "Ice Hockey",
    active: true,
    order: 80
  },
  {
    sport_id: 94,
    sport: "Rugby League",
    active: false,
    order: 90
  },
  {
    sport_id: 56,
    sport: "Baseball",
    active: false,
    order: 100
  },
  {
    sport_id: 61,
    sport: "Rugby Union",
    active: false,
    order: 110
  }
];
