"use client";
import { useState, useEffect } from "react";

import { useModalContext } from "../../components/admin/contexts/ModalContext";
import SlotsTable from "../../components/admin/components/admin/slots/SlotsTable";
import Input from "../../components/admin/components/ui/Input";
import Pagination from "../../components/admin/components/ui/Pagination";
import ModalGame from "../../components/admin/components/admin/slots/ModalGame";
import { getSlots } from "../api/tools";
import { useSession } from "next-auth/react";

const SlotsContent = () => {
  const { openGameModal } = useModalContext();
  const [provider, setProvider] = useState("Ekko");
  const [vendor, setVendor] = useState("egt");
  const [vendorsList, setVendorsList] = useState([]);
  const [filter, setFilter] = useState("");

  const { data: session }: any = useSession();
  const [slotList, setSlotList] = useState([] as any);
  const [gameSelected, setGameSelected] = useState(null);
  const [pageTotalCount, setPageTotalCount] = useState(2);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    // Define an async function inside useEffect
    async function fetchSlots() {
      const slots = await getSlots(session.user.token, session.user.role); // Call getSlots and wait for the data
      setSlotList(slots?.data); // Update the state with the fetched slots
      var slot_api = slots?.data;
      const uniqueLabels = [
        ...new Set(slot_api.map((obj: any) => obj.label)),
      ] as any;
      setVendorsList(uniqueLabels);
      console.log({ llz: uniqueLabels });

      setPageTotalCount(slots?.data.length / 100);
    }

    fetchSlots(); // Execute the function defined above
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <section className="flex flex-col gap-4 p-4">
      <div className="grid md:flex gap-1 items-center">
        <div className="flex flex-col">
          <p className="text-sm text-white">Vendor:</p>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm block focus:ring-0 focus:border-gray-300"
            onChange={(e) => setVendor(e.target.value)}
          >
            {vendorsList.map((vendor) => (
              <option key={vendor} value={vendor}>
                {vendor}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-white">Filter:</p>
          <Input
            className="bg-white border-gray-300 w-48 h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300 text-black"
            placeholder="Name"
            value={filter}
            disable_value={false}
            onHandleChange={(value: string) => setFilter(value)}
          />
        </div>
      </div>
      <section className="flex flex-col gap-4 pt-4">
        <SlotsTable
          tableList={slotList}
          onHandleEditClick={(item: any) => {
            setGameSelected(item);
            openGameModal();
          }}
          currentPage={currentPage}
        />
        {pageTotalCount > 1 && (
          <div className="flex flex-row justify-center">
            <Pagination
              pageCount={pageTotalCount}
              gotoPage={(page: number) => setCurrentPage(page)}
            />
          </div>
        )}
      </section>
      <ModalGame item={gameSelected} />
    </section>
  );
};

export default SlotsContent;
