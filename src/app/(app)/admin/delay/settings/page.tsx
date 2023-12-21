"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";

import GroupTable from "../../../components/admin/components/admin/delay/Settings/GroupTable";

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
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {searchList.map((item: any, index: number) => {
          return (
            <section key={index} className="flex flex-col gap-2">
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
        id: "Single",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 2",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 3",
        pre: 5,
        live: 5,
      },
      {
        id: "System",
        pre: 5,
        live: 5,
      },
    ],
  },
  {
    id: 2,
    content: [
      {
        id: "Single",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 2",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 3",
        pre: 5,
        live: 5,
      },
      {
        id: "System",
        pre: 5,
        live: 5,
      },
    ],
  },
  {
    id: 3,
    content: [
      {
        id: "Single",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 2",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 3",
        pre: 5,
        live: 5,
      },
      {
        id: "System",
        pre: 5,
        live: 5,
      },
    ],
  },
  {
    id: 4,
    content: [
      {
        id: "Single",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 2",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 3",
        pre: 5,
        live: 5,
      },
      {
        id: "System",
        pre: 5,
        live: 5,
      },
    ],
  },
  {
    id: 5,
    content: [
      {
        id: "Single",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 2",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 3",
        pre: 5,
        live: 5,
      },
      {
        id: "System",
        pre: 5,
        live: 5,
      },
    ],
  },
  {
    id: 6,
    content: [
      {
        id: "Single",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 2",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 3",
        pre: 5,
        live: 5,
      },
      {
        id: "System",
        pre: 5,
        live: 5,
      },
    ],
  },
  {
    id: 7,
    content: [
      {
        id: "Single",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 2",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 3",
        pre: 5,
        live: 5,
      },
      {
        id: "System",
        pre: 5,
        live: 5,
      },
    ],
  },
  {
    id: 8,
    content: [
      {
        id: "Single",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 2",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 3",
        pre: 5,
        live: 5,
      },
      {
        id: "System",
        pre: 5,
        live: 5,
      },
    ],
  },
  {
    id: 9,
    content: [
      {
        id: "Single",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 2",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 3",
        pre: 5,
        live: 5,
      },
      {
        id: "System",
        pre: 5,
        live: 5,
      },
    ],
  },
  {
    id: 10,
    content: [
      {
        id: "Single",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 2",
        pre: 5,
        live: 5,
      },
      {
        id: "Multiple 3",
        pre: 5,
        live: 5,
      },
      {
        id: "System",
        pre: 5,
        live: 5,
      },
    ],
  },
];
