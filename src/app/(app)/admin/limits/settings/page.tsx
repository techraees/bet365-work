"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";

import GroupTable from "../../../components/admin/components/admin/limits/Settings/GroupTable";

const Settings = () => {
  const { data: session } = useSession();

  const [sport, setSport] = useState("Football");
  const [group, setGroup] = useState("All Groups");

  const [searchList, setSearchList] = useState(search_list);

  return (
    <section className="flex flex-col gap-4 p-4">
      <section className="flex gap-1 items-center">
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
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm block focus:ring-0 focus:border-gray-300"
          onChange={(e) => setGroup(e.target.value)}
        >
          <option value="All Groups">All Groups</option>
          <option value="Group 1">Group 1</option>
          <option value="Group 2">Group 2</option>
          <option value="Group 3">Group 3</option>
          <option value="Group 4">Group 4</option>
          <option value="Group 5">Group 5</option>
          <option value="Group 6">Group 6</option>
          <option value="Group 7">Group 7</option>
          <option value="Group 8">Group 8</option>
          <option value="Group 9">Group 9</option>
          <option value="Group 10">Group 10</option>
        </select>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {searchList.map((item: any, index: number) => {
          return (
            <section key={index} className="flex flex-col gap-4">
              <GroupTable tableList={item} />
              <button className="w-fit mx-auto px-4 py-1.5 rounded-md bg-brand-dialog-button">
                Confirm
              </button>
            </section>
          );
        })}
      </section>
    </section>
  );
};

export default Settings;

const search_list = [
  {
    id: 1,
    content: [
      {
        pre_id: "Single",
        pre_bet: 1000,
        pre_win: 4500,
        live_id: "Single",
        live_bet: 1000,
        live_win: 4000,
      },
      {
        pre_id: "Multiple 2",
        pre_bet: 1000,
        pre_win: 7000,
        live_id: "Multiple 2",
        live_bet: 1000,
        live_win: 6500,
      },
      {
        pre_id: "Multiple 3",
        pre_bet: 1000,
        pre_win: 8000,
        live_id: "Multiple 3",
        live_bet: 1000,
        live_win: 7500,
      },
      {
        pre_id: "Multiple 4",
        pre_bet: 1000,
        pre_win: 10000,
        live_id: "Multiple 4",
        live_bet: 1000,
        live_win: 9500,
      },
      {
        pre_id: "Multiple 5+",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "Multiple 5+",
        live_bet: 1000,
        live_win: 11000,
      },
      {
        pre_id: "System",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "System",
        live_bet: 1000,
        live_win: 11000,
      },
    ],
  },
  {
    id: 2,
    content: [
      {
        pre_id: "Single",
        pre_bet: 1000,
        pre_win: 4500,
        live_id: "Single",
        live_bet: 1000,
        live_win: 4000,
      },
      {
        pre_id: "Multiple 2",
        pre_bet: 1000,
        pre_win: 7000,
        live_id: "Multiple 2",
        live_bet: 1000,
        live_win: 6500,
      },
      {
        pre_id: "Multiple 3",
        pre_bet: 1000,
        pre_win: 8000,
        live_id: "Multiple 3",
        live_bet: 1000,
        live_win: 7500,
      },
      {
        pre_id: "Multiple 4",
        pre_bet: 1000,
        pre_win: 10000,
        live_id: "Multiple 4",
        live_bet: 1000,
        live_win: 9500,
      },
      {
        pre_id: "Multiple 5+",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "Multiple 5+",
        live_bet: 1000,
        live_win: 11000,
      },
      {
        pre_id: "System",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "System",
        live_bet: 1000,
        live_win: 11000,
      },
    ],
  },
  {
    id: 3,
    content: [
      {
        pre_id: "Single",
        pre_bet: 1000,
        pre_win: 4500,
        live_id: "Single",
        live_bet: 1000,
        live_win: 4000,
      },
      {
        pre_id: "Multiple 2",
        pre_bet: 1000,
        pre_win: 7000,
        live_id: "Multiple 2",
        live_bet: 1000,
        live_win: 6500,
      },
      {
        pre_id: "Multiple 3",
        pre_bet: 1000,
        pre_win: 8000,
        live_id: "Multiple 3",
        live_bet: 1000,
        live_win: 7500,
      },
      {
        pre_id: "Multiple 4",
        pre_bet: 1000,
        pre_win: 10000,
        live_id: "Multiple 4",
        live_bet: 1000,
        live_win: 9500,
      },
      {
        pre_id: "Multiple 5+",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "Multiple 5+",
        live_bet: 1000,
        live_win: 11000,
      },
      {
        pre_id: "System",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "System",
        live_bet: 1000,
        live_win: 11000,
      },
    ],
  },
  {
    id: 4,
    content: [
      {
        pre_id: "Single",
        pre_bet: 1000,
        pre_win: 4500,
        live_id: "Single",
        live_bet: 1000,
        live_win: 4000,
      },
      {
        pre_id: "Multiple 2",
        pre_bet: 1000,
        pre_win: 7000,
        live_id: "Multiple 2",
        live_bet: 1000,
        live_win: 6500,
      },
      {
        pre_id: "Multiple 3",
        pre_bet: 1000,
        pre_win: 8000,
        live_id: "Multiple 3",
        live_bet: 1000,
        live_win: 7500,
      },
      {
        pre_id: "Multiple 4",
        pre_bet: 1000,
        pre_win: 10000,
        live_id: "Multiple 4",
        live_bet: 1000,
        live_win: 9500,
      },
      {
        pre_id: "Multiple 5+",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "Multiple 5+",
        live_bet: 1000,
        live_win: 11000,
      },
      {
        pre_id: "System",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "System",
        live_bet: 1000,
        live_win: 11000,
      },
    ],
  },
  {
    id: 5,
    content: [
      {
        pre_id: "Single",
        pre_bet: 1000,
        pre_win: 4500,
        live_id: "Single",
        live_bet: 1000,
        live_win: 4000,
      },
      {
        pre_id: "Multiple 2",
        pre_bet: 1000,
        pre_win: 7000,
        live_id: "Multiple 2",
        live_bet: 1000,
        live_win: 6500,
      },
      {
        pre_id: "Multiple 3",
        pre_bet: 1000,
        pre_win: 8000,
        live_id: "Multiple 3",
        live_bet: 1000,
        live_win: 7500,
      },
      {
        pre_id: "Multiple 4",
        pre_bet: 1000,
        pre_win: 10000,
        live_id: "Multiple 4",
        live_bet: 1000,
        live_win: 9500,
      },
      {
        pre_id: "Multiple 5+",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "Multiple 5+",
        live_bet: 1000,
        live_win: 11000,
      },
      {
        pre_id: "System",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "System",
        live_bet: 1000,
        live_win: 11000,
      },
    ],
  },
  {
    id: 6,
    content: [
      {
        pre_id: "Single",
        pre_bet: 1000,
        pre_win: 4500,
        live_id: "Single",
        live_bet: 1000,
        live_win: 4000,
      },
      {
        pre_id: "Multiple 2",
        pre_bet: 1000,
        pre_win: 7000,
        live_id: "Multiple 2",
        live_bet: 1000,
        live_win: 6500,
      },
      {
        pre_id: "Multiple 3",
        pre_bet: 1000,
        pre_win: 8000,
        live_id: "Multiple 3",
        live_bet: 1000,
        live_win: 7500,
      },
      {
        pre_id: "Multiple 4",
        pre_bet: 1000,
        pre_win: 10000,
        live_id: "Multiple 4",
        live_bet: 1000,
        live_win: 9500,
      },
      {
        pre_id: "Multiple 5+",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "Multiple 5+",
        live_bet: 1000,
        live_win: 11000,
      },
      {
        pre_id: "System",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "System",
        live_bet: 1000,
        live_win: 11000,
      },
    ],
  },
  {
    id: 7,
    content: [
      {
        pre_id: "Single",
        pre_bet: 1000,
        pre_win: 4500,
        live_id: "Single",
        live_bet: 1000,
        live_win: 4000,
      },
      {
        pre_id: "Multiple 2",
        pre_bet: 1000,
        pre_win: 7000,
        live_id: "Multiple 2",
        live_bet: 1000,
        live_win: 6500,
      },
      {
        pre_id: "Multiple 3",
        pre_bet: 1000,
        pre_win: 8000,
        live_id: "Multiple 3",
        live_bet: 1000,
        live_win: 7500,
      },
      {
        pre_id: "Multiple 4",
        pre_bet: 1000,
        pre_win: 10000,
        live_id: "Multiple 4",
        live_bet: 1000,
        live_win: 9500,
      },
      {
        pre_id: "Multiple 5+",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "Multiple 5+",
        live_bet: 1000,
        live_win: 11000,
      },
      {
        pre_id: "System",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "System",
        live_bet: 1000,
        live_win: 11000,
      },
    ],
  },
  {
    id: 8,
    content: [
      {
        pre_id: "Single",
        pre_bet: 1000,
        pre_win: 4500,
        live_id: "Single",
        live_bet: 1000,
        live_win: 4000,
      },
      {
        pre_id: "Multiple 2",
        pre_bet: 1000,
        pre_win: 7000,
        live_id: "Multiple 2",
        live_bet: 1000,
        live_win: 6500,
      },
      {
        pre_id: "Multiple 3",
        pre_bet: 1000,
        pre_win: 8000,
        live_id: "Multiple 3",
        live_bet: 1000,
        live_win: 7500,
      },
      {
        pre_id: "Multiple 4",
        pre_bet: 1000,
        pre_win: 10000,
        live_id: "Multiple 4",
        live_bet: 1000,
        live_win: 9500,
      },
      {
        pre_id: "Multiple 5+",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "Multiple 5+",
        live_bet: 1000,
        live_win: 11000,
      },
      {
        pre_id: "System",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "System",
        live_bet: 1000,
        live_win: 11000,
      },
    ],
  },
  {
    id: 9,
    content: [
      {
        pre_id: "Single",
        pre_bet: 1000,
        pre_win: 4500,
        live_id: "Single",
        live_bet: 1000,
        live_win: 4000,
      },
      {
        pre_id: "Multiple 2",
        pre_bet: 1000,
        pre_win: 7000,
        live_id: "Multiple 2",
        live_bet: 1000,
        live_win: 6500,
      },
      {
        pre_id: "Multiple 3",
        pre_bet: 1000,
        pre_win: 8000,
        live_id: "Multiple 3",
        live_bet: 1000,
        live_win: 7500,
      },
      {
        pre_id: "Multiple 4",
        pre_bet: 1000,
        pre_win: 10000,
        live_id: "Multiple 4",
        live_bet: 1000,
        live_win: 9500,
      },
      {
        pre_id: "Multiple 5+",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "Multiple 5+",
        live_bet: 1000,
        live_win: 11000,
      },
      {
        pre_id: "System",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "System",
        live_bet: 1000,
        live_win: 11000,
      },
    ],
  },
  {
    id: 10,
    content: [
      {
        pre_id: "Single",
        pre_bet: 1000,
        pre_win: 4500,
        live_id: "Single",
        live_bet: 1000,
        live_win: 4000,
      },
      {
        pre_id: "Multiple 2",
        pre_bet: 1000,
        pre_win: 7000,
        live_id: "Multiple 2",
        live_bet: 1000,
        live_win: 6500,
      },
      {
        pre_id: "Multiple 3",
        pre_bet: 1000,
        pre_win: 8000,
        live_id: "Multiple 3",
        live_bet: 1000,
        live_win: 7500,
      },
      {
        pre_id: "Multiple 4",
        pre_bet: 1000,
        pre_win: 10000,
        live_id: "Multiple 4",
        live_bet: 1000,
        live_win: 9500,
      },
      {
        pre_id: "Multiple 5+",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "Multiple 5+",
        live_bet: 1000,
        live_win: 11000,
      },
      {
        pre_id: "System",
        pre_bet: 1000,
        pre_win: 12000,
        live_id: "System",
        live_bet: 1000,
        live_win: 11000,
      },
    ],
  },
];
