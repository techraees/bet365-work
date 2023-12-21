"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { useModalContext } from "../../../components/admin/contexts/ModalContext";
import { getLeagues } from "../../api/tools";
import LeagueTable from "../../../components/admin/components/admin/tools/League/LeagueTable";
import Pagination from "../../../components/admin/components/ui/Pagination";

const League = () => {
  const { data: session }: any = useSession();
  const router = useRouter();
  const { openCasinoTransactionModal } = useModalContext();

  const [sport, setSport] = useState("Football");
  const [country, setCountry] = useState("All Countries");

  const [searchList, setSearchList] = useState(null);
  const [pageTotalCount, setPageTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const getLeaguesData = async () => {
      const _res = await getLeagues(session?.user.token, session?.user.role);
      if (_res?.status === 200) {
        setSearchList(_res.data);
        setPageTotalCount(_res.data.length);
      } else toast.error(_res?.data.error);
    };

    if (session?.user !== undefined) getLeaguesData();
  }, [session]);

  return (
    <section className="flex flex-col gap-4 p-4">
      <section className="flex justify-between items-end">
        <div className="grid md:flex gap-1 items-center">
          <div className="flex flex-col">
            <p className="text-sm text-white">Sport:</p>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm block focus:ring-0 focus:border-gray-300"
              onChange={(e) => setSport(e.target.value)}
            >
              <option value="Football">Football</option>
              <option value="Basketball">Basketball</option>
              <option value="Tennis">Tennis</option>
              <option value="Volleyball">Volleyball</option>
              <option value="Table Tennis">Table Tennis</option>
              <option value="Handball">Handball</option>
              <option value="Futsal">Futsal</option>
              <option value="Ice Hockey">Ice Hockey</option>
            </select>
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-white">Country:</p>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm block focus:ring-0 focus:border-gray-300"
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="All Countries">All Countries</option>
              <option value="International">International</option>
              <option value="Europe">Europe</option>
            </select>
          </div>
        </div>
        <div className="flex gap-1 items-center">
          <button
            type="button"
            className="px-4 py-1.5 bg-green-700 hover:bg-green-600 text-brand-button-text hover:text-white"
          >
            New Leagues
          </button>
        </div>
      </section>
      <LeagueTable tableList={searchList} currentPage={currentPage} />
      {pageTotalCount >= 2 && (
        <div className="flex flex-row justify-center">
          <Pagination
            pageCount={pageTotalCount}
            gotoPage={(page: number) => setCurrentPage(page)}
          />
        </div>
      )}
    </section>
  );
};

export default League;
