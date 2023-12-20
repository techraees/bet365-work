"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useModalContext } from "../../../components/admin/contexts/ModalContext";
import ModalBonusSystemNew from "@/app/(app)/components/admin/components/admin/bonuses/BonusSystem/ModalBonusSystemNew";
import ModalBonusSystemEdit from "@/app/(app)/components/admin/components/admin/bonuses/BonusSystem/ModalBonusSystemEdit";
import ModalAssign from "@/app/(app)/components/admin/components/admin/bonuses/BonusSystem/ModalAssign";

const BonusSystem = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const { openBonusSystemNewModal, openBonusSystemEditModal, openAssignModal } =
    useModalContext();

  //transfer
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <section className="flex flex-col gap-4 p-4">
      <section className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-col md:flex-row gap-1">
          <button className="w-fit px-4 py-1.5 border border-black bg-green-700 hover:bg-green-600 text-white">
            Show Important
          </button>
          <button className="w-fit px-4 py-1.5 border border-black bg-[#333] hover:bg-[#444] text-white">
            Show hidden
          </button>
          <button className="w-fit px-4 py-1.5 border border-black bg-[#333] hover:bg-[#444] text-white">
            Show All
          </button>
        </div>
        <div className="flex gap-1">
          <button
            className="w-fit px-4 py-1.5 bg-green-700 hover:bg-green-600 text-white"
            onClick={() => openBonusSystemNewModal()}
          >
            New Bonus
          </button>
          <button
            className="w-fit px-4 py-1.5 bg-green-700 hover:bg-green-600 text-white"
            onClick={() => router.push("/admin/bonuses/users")}
          >
            Users
          </button>
        </div>
      </section>
      <section className="w-full overflow-x-scroll md:overflow-hidden">
        <table className="w-full text-sm text-gray-400 text-center">
          <thead className="text-sm bg-brand-yellow text-black">
            <tr>
              <th
                scope="col"
                className="px-2 py-1.5 border border-gray-600 truncate"
              >
                Id
              </th>
              <th
                scope="col"
                className="px-2 py-1.5 border border-gray-600 truncate"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-2 py-1.5 border border-gray-600 truncate"
              >
                Type
              </th>
              <th
                scope="col"
                className="px-2 py-1.5 border border-gray-600 truncate"
              >
                Changed
              </th>
              <th
                scope="col"
                className="px-2 py-1.5 border border-gray-600 truncate"
              >
                Active
              </th>
              <th
                scope="col"
                className="px-2 py-1.5 border border-gray-600 truncate"
              ></th>
            </tr>
          </thead>
          <tbody>
            {search_list.map((item: any, index: number) => {
              return (
                <tr key={index} className="bg-[#666] text-white">
                  <td className="px-2 py-1.5 border border-gray-600 truncate">
                    {item.id}
                  </td>
                  <td className="px-2 py-1.5 border border-gray-600 truncate">
                    {item.name}
                  </td>
                  <td className="px-2 py-1.5 border border-gray-600 truncate">
                    {item.type}
                  </td>
                  <td className="px-2 py-1.5 border border-gray-600 truncate">
                    {item.changed}
                  </td>
                  <td className="px-2 py-1.5 border border-gray-600 truncate">
                    {item.active === true && (
                      <svg
                        className="w-3 h-3 text-green-400 mx-auto"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 16 12"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5.917 5.724 10.5 15 1.5"
                        />
                      </svg>
                    )}
                  </td>
                  <td className="w-6 px-1 py-1 border border-gray-600 truncate">
                    <div className="flex gap-1">
                      <button
                        type="button"
                        className="bg-brand-button text-brand-button-text hover:text-white px-2 md:px-4 h-8 border border-black"
                        onClick={() => {
                          setSelectedItem(item);
                          openBonusSystemEditModal();
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="bg-brand-button text-brand-button-text hover:text-white px-2 md:px-4 h-8 border border-black"
                        onClick={() => openAssignModal()}
                      >
                        Assign
                      </button>
                      <button
                        type="button"
                        className="bg-brand-button text-brand-button-text hover:text-white px-2 md:px-4 h-8 border border-black"
                      >
                        Hide
                      </button>
                      <button
                        type="button"
                        className="bg-brand-button text-brand-button-text hover:text-white px-2 md:px-4 h-8 border border-black"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
      <ModalBonusSystemNew />
      <ModalBonusSystemEdit item={selectedItem} />
      <ModalAssign />
    </section>
  );
};

export default BonusSystem;

const search_list = [
  {
    id: 1,
    name: "bonus 10%",
    type: "Loyalty",
    changed: "03/07 10:59",
    active: true,
  },
  {
    id: 20,
    name: "bonus hand 10%",
    type: "Loyalty",
    changed: "03/07 10:59",
    active: false,
  },
  {
    id: 21,
    name: "bonus hand 250 - 10%",
    type: "Loyalty",
    changed: "03/07 10:59",
    active: false,
  },
  {
    id: 22,
    name: "bonus hand 120 - 10%",
    type: "Loyalty",
    changed: "03/07 10:59",
    active: false,
  },
  {
    id: 25,
    name: "Test Loyalty",
    type: "Loyalty",
    changed: "03/07 10:59",
    active: true,
  },
  {
    id: 26,
    name: "Test Deposit 2",
    type: "Loyalty",
    changed: "03/07 10:59",
    active: true,
  },
];
