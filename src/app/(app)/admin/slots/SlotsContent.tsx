"use client";
import { useState, useEffect } from "react";

import { useModalContext } from "../../components/admin/contexts/ModalContext";
import SlotsTable from "../../components/admin/components/admin/slots/SlotsTable";
import Input from "../../components/admin/components/ui/Input";
import Pagination from "../../components/admin/components/ui/Pagination";
import ModalGame from "../../components/admin/components/admin/slots/ModalGame";

const SlotsContent = () => {
  const { openGameModal } = useModalContext();
  const [provider, setProvider] = useState("Ekko");
  const [vendor, setVendor] = useState("egt");
  const [filter, setFilter] = useState("");

  const [slotList, setSlotList] = useState(slot_list);
  const [gameSelected, setGameSelected] = useState(null);
  const [pageTotalCount, setPageTotalCount] = useState(2);
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <section className="flex flex-col gap-4 p-4">
      <div className="grid md:flex gap-1 items-center">
        <div className="flex flex-col">
          <p className="text-sm text-white">Provider:</p>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm block focus:ring-0 focus:border-gray-300"
            onChange={(e) => setProvider(e.target.value)}
          >
            <option value="Ekko">Ekko</option>
            <option value="Gapi">Gapi</option>
            <option value="Gbs">Gbs</option>
            <option value="MGS">MGS</option>
            <option value="Riseup">Riseup</option>
            <option value="Softswiss">Softswiss</option>
          </select>
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-white">Vendor:</p>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm block focus:ring-0 focus:border-gray-300"
            onChange={(e) => setVendor(e.target.value)}
          >
            <option value="egt">egt</option>
            <option value="novomatic">novomatic</option>
            <option value="yggdrasil">yggdrasil</option>
            <option value="netent">netent</option>
            <option value="pragmatic">pragmatic</option>
            <option value="amatic">amatic</option>
            <option value="playngo">playngo</option>
            <option value="playtech">playtech</option>
            <option value="aristocrat">aristocrat</option>
            <option value="redtiger">redtiger</option>
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

const slot_list = [
  {
    id: 1,
    name: "Fruity Time",
    type: "slot",
    order: 1,
    listed: "Yes",
    open_count: 550,
    played: "06/09 20:03",
    changed: "",
    image_url: "https://example.com"
  },
  {
    id: 2,
    name: "Fruity Time",
    type: "slot",
    order: 1,
    listed: "Yes",
    open_count: 550,
    played: "06/09 20:03",
    changed: "",
    image_url: "https://example.com"
  },
  {
    id: 3,
    name: "Fruity Time",
    type: "slot",
    order: 1,
    listed: "Yes",
    open_count: 550,
    played: "06/09 20:03",
    changed: "",
    image_url: "https://example.com"
  },
  {
    id: 4,
    name: "Fruity Time",
    type: "slot",
    order: 1,
    listed: "Yes",
    open_count: 550,
    played: "06/09 20:03",
    changed: "",
    image_url: "https://example.com"
  },
  {
    id: 5,
    name: "Fruity Time",
    type: "slot",
    order: 1,
    listed: "Yes",
    open_count: 550,
    played: "06/09 20:03",
    changed: "",
    image_url: "https://example.com"
  },
  {
    id: 6,
    name: "Fruity Time",
    type: "slot",
    order: 1,
    listed: "Yes",
    open_count: 550,
    played: "06/09 20:03",
    changed: "",
    image_url: "https://example.com"
  },
  {
    id: 7,
    name: "Fruity Time",
    type: "slot",
    order: 1,
    listed: "Yes",
    open_count: 550,
    played: "06/09 20:03",
    changed: "",
    image_url: "https://example.com"
  }
];
