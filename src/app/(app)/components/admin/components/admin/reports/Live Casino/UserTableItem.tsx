import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { toast } from "react-toastify";

import { getFinalcialReports } from "@/app/(app)/admin/api/reports";

interface UserTableItemProps {
  item_: any;
  startingOn: any;
  endingOn: any;
  getChildren: any;
  removeChildren: any;
  addGeneralTable: any;
  removeGeneralTable: any;
}

const UserTableItem = ({
  item_,
  startingOn,
  endingOn,
  getChildren,
  removeChildren,
  addGeneralTable,
  removeGeneralTable,
}: UserTableItemProps) => {
  const [vendorSelected, setVendorSelected] = useState();
  const { data: session }: any = useSession();

  const [financialReportData, setFinancialReportData] = useState(null);
  const [item, setItem]: any = useState(null);
  const [open, setOpen] = useState(false);

  const [totalIn, setTotalIn] = useState(0);
  const [totalOut, setTotalOut] = useState(0);
  const [totalGGR, setTotalGGR] = useState(0);

  useEffect(() => {
    if (item_ !== null) {
      setItem(item_);
      setVendorSelected(item_?.vendorsSelected);
      getFinancialReports();
    }
  }, [item_]);

  const getFinancialReports = async () => {
    const _res = await getFinalcialReports(
      session.user.token,
      session.user.role,
      item_?._id,
      startingOn,
      endingOn
    );

    setFinancialReportData(_res?.data);

    if (_res?.status === 200) {
      if (_res.data.live_casino !== undefined) {
        setTotalIn(_res.data.live_casino[0].overallTotal[0].total_in);
        setTotalOut(_res.data.live_casino[0].overallTotal[0].total_out);
        setTotalGGR(_res.data.live_casino[0].overallTotal[0].ggr);
      }
    } else toast.error(_res?.data.message);
  };

  return (
    <>
      {item !== null && (
        <>
          <td
            className={clsx(
              "border border-black !p-0",
              item?.role !== "User" ? "w-32" : "w-20"
            )}
          >
            <div className="flex">
              <div
                className={clsx(
                  "text-black border border-black w-20 py-1.5 cursor-pointer hover:bg-orange-400",
                  vendorSelected === true ? "bg-orange-400" : "bg-white"
                )}
                onClick={() => {
                  if (!vendorSelected)
                    addGeneralTable(item?.username, financialReportData);
                  else removeGeneralTable(item?.username, item?._id);
                  item.vendorsSelected = !item.vendorsSelected;
                  setVendorSelected(item.vendorsSelected);
                }}
              >
                Vendors
              </div>
              {item?.role !== "User" && (
                <div
                  className={clsx(
                    "px-2 py-1 border border-black",
                    item?.role === "User" && "bg-brand-dark-grey",
                    item?.role !== "User" &&
                      open === true &&
                      "bg-brand-yellow hover:bg-brand-yellow cursor-pointer text-black",
                    item?.role !== "User" &&
                      open === false &&
                      "bg-white hover:bg-brand-yellow cursor-pointer text-black"
                  )}
                  onClick={() => {
                    if (!open) getChildren(item?.username, item?._id);
                    else removeChildren(item?.username, item?._id);
                    setOpen(!open);
                  }}
                >
                  Users
                </div>
              )}
            </div>
          </td>
          <td className="px-2 py-1 border border-black">{item?.username}</td>
          <td className="px-2 py-1 border border-black">{item?.role}</td>
          <td className="px-2 py-1 border border-black">{totalIn?.toFixed(2)}</td>
          <td className="px-2 py-1 border border-black">{totalOut?.toFixed(2)}</td>
          <td className="px-2 py-1 border border-black">{totalGGR?.toFixed(2)}</td>
        </>
      )}
    </>
  );
};

export default UserTableItem;
