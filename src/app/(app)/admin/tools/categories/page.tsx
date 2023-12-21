"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import { useModalContext } from "../../../components/admin/contexts/ModalContext";
import {
  getUsersByQuery,
  getUserById,
  getUsersCreatedBy,
} from "../../api/userManagement";
import CategoryTable from "../../../components/admin/components/admin/tools/BetTypes/CategoryTable";
import Input from "../../../components/admin/components/ui/Input";
import Pagination from "../../../components/admin/components/ui/Pagination";

const Categories = () => {
  const { data: session } = useSession();
  const { openCasinoTransactionModal } = useModalContext();

  const [sport, setSport] = useState("Football");
  const [categoryName, setCategoryName] = useState("");

  const [searchList, setSearchList] = useState(search_list);
  const [pageTotalCount, setPageTotalCount] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <section className="flex flex-col gap-4 p-4">
      <section className="flex justify-between">
        <div className="flex flex-col md:flex-row gap-1 justify-between items-center w-full">
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
          <div className="flex gap-1 items-center">
            <Input
              className="bg-white border-gray-300 h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300 text-sm"
              placeholder="Category Name"
              disable_value={false}
              value={categoryName}
              onHandleChange={(e: any) => setCategoryName(e.target.value)}
            />
            <button
              type="button"
              className="px-4 py-1.5 bg-green-700 hover:bg-green-600 text-brand-button-text hover:text-white"
            >
              Add Category
            </button>
          </div>
        </div>
      </section>
      <CategoryTable tableList={searchList} currentPage={currentPage} />
      <div className="flex flex-row justify-center">
        <Pagination
          pageCount={pageTotalCount}
          gotoPage={(page: number) => setCurrentPage(page)}
        />
      </div>
    </section>
  );
};

export default Categories;

const search_list = [
  {
    id: "1",
    name: "Main MArkets",
    changed: "31-10 13:49",
    order: 1
  },
  {
    id: "2",
    name: "Goal",
    changed: "31-10 13:49",
    order: 2
  },
  {
    id: "3",
    name: "Handicap",
    changed: "31-10 13:49",
    order: 3
  },
  {
    id: "4",
    name: "1st/2nd Half",
    changed: "31-10 13:49",
    order: 4
  },
  {
    id: "5",
    name: "Corners",
    changed: "31-10 13:49",
    order: 5
  },
  {
    id: "26",
    name: "Cards",
    changed: "31-10 13:49",
    order: 6
  },
  {
    id: "6",
    name: "Teams",
    changed: "31-10 13:49",
    order: 7
  },
  {
    id: "28",
    name: "Combo",
    changed: "31-10 13:49",
    order: 8
  },
  {
    id: "29",
    name: "Minutes",
    changed: "31-10 13:49",
    order: 9
  },
  {
    id: "7",
    name: "Scorers",
    changed: "31-10 13:49",
    order: 10
  },
  {
    id: "27",
    name: "Specials",
    changed: "31-10 13:49",
    order: 11
  }
];
