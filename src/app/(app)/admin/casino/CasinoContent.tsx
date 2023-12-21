"use client";
import { useState, useEffect } from "react";

import { useModalContext } from "@/app/(app)/components/admin/contexts/ModalContext";
import CasinoTable from "@/app/(app)/components/admin/components/admin/casino/CasinoTable";
import Input from "@/app/(app)/components/admin/components/ui/Input";
import Pagination from "@/app/(app)/components/admin/components/ui/Pagination";
import ModalCasinoEdit from "@/app/(app)/components/admin/components/admin/casino/ModalCasinoEdit";

const CasinoContent = () => {
  const { openCasinoEditModal } = useModalContext();
  const [filter, setFilter] = useState("");

  const [casinoList, setCasinoList] = useState(casino_list);
  const [casinoSelected, setCasinoSelected] = useState(null);
  const [pageTotalCount, setPageTotalCount] = useState(2);
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <section className="flex flex-col gap-4 p-4">
      <div className="grid md:flex gap-1 items-center">
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
        <CasinoTable
          tableList={casinoList}
          onHandleEditClick={(item: any) => {
            setCasinoSelected(item);
            openCasinoEditModal();
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
      <ModalCasinoEdit item={casinoSelected} />
    </section>
  );
};

export default CasinoContent;

const casino_list = [
  {
    id: 1,
    name: "live_casino",
    display_name: "Live Casino",
    aggregator: "VIVO",
    order: 1,
    active: true,
    last_edit: "13/03 09:55",
    image_url: "https://example.com"
  },
  {
    id: 17,
    name: "live_casino",
    display_name: "Live Casino",
    aggregator: "VIVO",
    order: 1,
    active: true,
    last_edit: "13/03 09:55",
    image_url: "https://example.com"

  },
  {
    id: 31,
    name: "live_casino",
    display_name: "Live Casino",
    aggregator: "VIVO",
    order: 1,
    active: true,
    last_edit: "13/03 09:55",
    image_url: "https://example.com"

  },
  {
    id: 33,
    name: "live_casino",
    display_name: "Live Casino",
    aggregator: "VIVO",
    order: 1,
    active: false,
    last_edit: "13/03 09:55",
    image_url: "https://example.com"
  },
  {
    id: 164,
    name: "live_casino",
    display_name: "Live Casino",
    aggregator: "VIVO",
    order: 1,
    active: true,
    last_edit: "13/03 09:55",
    image_url: "https://example.com"
  },
  {
    id: 165,
    name: "live_casino",
    display_name: "Live Casino",
    aggregator: "VIVO",
    order: 1,
    active: true,
    last_edit: "13/03 09:55",
    image_url: "https://example.com"
  },
  {
    id: 259,
    name: "live_casino",
    display_name: "Live Casino",
    aggregator: "VIVO",
    order: 1,
    active: true,
    last_edit: "13/03 09:55",
    image_url: "https://example.com"
  }
];
