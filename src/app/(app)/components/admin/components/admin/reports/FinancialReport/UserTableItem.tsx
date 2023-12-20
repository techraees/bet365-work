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
  const [prSelected, setPrSelected] = useState();
  const { data: session }: any = useSession();

  const [financialReportData, setFinancialReportData] = useState(null);
  const [item, setItem]: any = useState(null);
  const [open, setOpen] = useState(false);

  const [tax, setTax] = useState(0);
  const [ggr, setGGR] = useState(0);
  const [to, setTo] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [converted, setConverted] = useState(0);
  const [ngr, setNGR] = useState(0);
  const [hands, setHands] = useState(0);
  const [partner, setPartner] = useState(0);

  useEffect(() => {
    if (item_ !== null) {
      setItem(item_);
      setPrSelected(item_.prSelected);
      getFinancialReports();
    }
  }, [item_]);

  const getFinancialReports = async () => {
    const _res = await getFinalcialReports(
      session.user.token,
      session.user.role,
      item_._id,
      startingOn,
      endingOn
    );

    setFinancialReportData(_res?.data);

    if (_res?.status === 200) {
      // ggr
      let ggr = 0;
      if (_res.data.pre !== undefined && _res.data.pre.length > 0)
        ggr += _res.data.pre[0].overallTotal[0].ggr;
      if (_res.data.live !== undefined && _res.data.live.length > 0)
        ggr += _res.data.live[0].overallTotal[0].ggr;
      if (_res.data.slots !== undefined && _res.data.slots.length > 0)
        ggr += _res.data.slots[0].overallTotal[0].ggr;
      if (_res.data.casino !== undefined && _res.data.casino.length > 0)
        ggr += _res.data.casino[0].overallTotal[0].ggr;
      if (
        _res.data.sports_betting !== undefined &&
        _res.data.sports_betting.length > 0
      )
        ggr += _res.data.sports_betting[_res.data.sports_betting.length - 1].ggr;
      setGGR(ggr);
    } else toast.error(_res?.data.message);
  };

  return (
    <>
      {item !== null && (
        <>
          <td
            className={clsx(
              "px-6 py-1 border border-black cursor-pointer hover:bg-brand-yellow text-black w-14",
              prSelected === true ? "bg-brand-yellow" : "bg-white"
            )}
            onClick={() => {
              if (!prSelected)
                addGeneralTable(item.username, financialReportData);
              else removeGeneralTable(item.username, item._id);
              item.prSelected = !item.prSelected;
              setPrSelected(item.prSelected);
            }}
          >
            Pr
          </td>
          <td
            className={clsx(
              "px-2 py-1 border border-black",
              item.role === "User" && "bg-brand-dark-grey",
              item.role !== "User" &&
                open === true &&
                "bg-brand-yellow hover:bg-brand-yellow cursor-pointer text-black",
              item.role !== "User" &&
                open === false &&
                "bg-white hover:bg-brand-yellow cursor-pointer text-black"
            )}
            onClick={() => {
              if (item.role !== "User") {
                if (!open) getChildren(item.username, item._id);
                else removeChildren(item.username, item._id);
                setOpen(!open);
              }
            }}
          >
            {item.username}
          </td>
          <td className="px-2 py-1 border border-black">{item.role}</td>
          <td className="px-2 py-1 border border-black">{tax}</td>
          <td
            className={clsx(
              "px-2 py-1 border border-black",
              ggr === 0
                ? "bg-brand-dark-grey"
                : ggr > 0
                ? "bg-brand-plus-cell"
                : "bg-brand-minus-cell"
            )}
          >
            {ggr.toFixed(2)}
          </td>
          <td className="px-2 py-1 border border-black">{to}</td>
          <td className="px-2 py-1 border border-black">{bonus}</td>
          <td className="px-2 py-1 border border-black">{converted}</td>
          <td
            className={clsx(
              "px-2 py-1 border border-black",
              ngr === 0
                ? "bg-brand-dark-grey"
                : ggr > 0
                ? "bg-brand-plus-cell"
                : "bg-brand-minus-cell"
            )}
          >
            {ngr}
          </td>
          <td className="px-2 py-1 border border-black">{hands}</td>
          <td className="px-2 py-1 border border-black">{partner}</td>
        </>
      )}
    </>
  );
};

export default UserTableItem;
