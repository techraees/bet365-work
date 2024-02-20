import { useState, useEffect } from "react";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

import { getFinalcialReports } from "@/app/(app)/admin/api/reports";

interface GeneralTableProps {
  item_: any;
  startingOn: string;
  endingOn: string;
}

const GeneralTable = ({ item_, startingOn, endingOn }: GeneralTableProps) => {
  const { data: session }: any = useSession();

  const [slotIn, setSlotIn] = useState(0);
  const [slotOut, setSlotOut] = useState(0);
  const [slotGGR, setSlotGGR] = useState(0);

  const [casinoIn, setCasinoIn] = useState(0);
  const [casinoOut, setCasinoOut] = useState(0);
  const [casinoGGR, setCasinoGGR] = useState(0);

  const [share, setShare] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [converted, setConverted] = useState(0);
  const [ngr, setNGR] = useState(0);
  const [open, setOpen] = useState(0);
  const [sumOpen, setSumOpen] = useState(0);

  const [financialData, setFinancialData]: any = useState(null);

  useEffect(() => {
    if (item_ !== null) {
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

    if (_res?.status === 200) {
      if (_res.data.slots !== undefined && _res.data.slots.length > 0) {
        setFinancialData(_res.data);
        setSlotIn(_res.data.slots[0].overallTotal[0].total_in);
        setSlotOut(_res.data.slots[0].overallTotal[0].total_out);
        setSlotGGR(_res.data.slots[0].overallTotal[0].ggr);
      }

      if (
        _res.data.live_casino !== undefined &&
        _res.data.live_casino.length > 0
      ) {
        console.log({ ss: _res.data.live_casino });
        setCasinoIn(_res.data.live_casino[0]?.overallTotal[0]?.total_in);
        setCasinoOut(_res.data.live_casino[0]?.overallTotal[0]?.total_out);
        setCasinoGGR(_res.data.live_casino[0]?.overallTotal[0]?.ggr);
      }
    } else toast.error(_res?.data.message);
  };

  return (
    <table className="w-full text-sm text-white text-center">
      <thead className="text-sm bg-[#222] uppercase">
        <tr>
          <th scope="col" className="py-1.5 border border-black"></th>
          <th scope="col" className="px-2 py-1.5 border border-black">
            in
          </th>
          <th scope="col" className="px-2 py-1.5 border border-black">
            out
          </th>
          <th scope="col" className="px-2 py-1.5 border border-black">
            ggr
          </th>
          <th scope="col" className="px-2 py-1.5 border border-black">
            share
          </th>
          <th scope="col" className="px-2 py-1.5 border border-black">
            bonus
          </th>
          <th scope="col" className="px-2 py-1.5 border border-black">
            converted
          </th>
          <th scope="col" className="px-2 py-1.5 border border-black">
            ngr
          </th>
          <th scope="col" className="px-2 py-1.5 border border-black">
            open
          </th>
          <th scope="col" className="px-2 py-1.5 border border-black">
            sum open
          </th>
        </tr>
      </thead>
      <tbody>
        {
          <tr className="bg-brand-dark-grey">
            <td className="px-2 py-1 border border-black">Live Casino</td>

            <td className="px-2 py-1 border border-black">
              {casinoIn.toFixed(2)}
            </td>
            <td className="px-2 py-1 border border-black">
              {casinoOut.toFixed(2)}
            </td>
            <td
              className={clsx(
                "px-2 py-1 border border-black",
                casinoGGR === 0
                  ? "bg-brand-dark-grey"
                  : casinoGGR > 0
                  ? "bg-brand-plus-cell"
                  : "bg-brand-minus-cell"
              )}
            >
              {casinoGGR.toFixed(2)}
            </td>
            <td className="px-2 py-1 border border-black">0</td>
            <td className="px-2 py-1 border border-black">0</td>
            <td className={clsx("px-2 py-1 border border-black")}>0</td>
            <td className="px-2 py-1 border border-black">0</td>
            <td className="px-2 py-1 border border-black">0</td>
            <td className="px-2 py-1 border border-black">0</td>
          </tr>
        }
        {
          <tr className="bg-brand-dark-grey">
            <td className="px-2 py-1 border border-black">Slots</td>

            <td className="px-2 py-1 border border-black">
              {slotIn.toFixed(2)}
            </td>
            <td className="px-2 py-1 border border-black">
              {slotOut.toFixed(2)}
            </td>
            <td
              className={clsx(
                "px-2 py-1 border border-black",
                slotGGR === 0
                  ? "bg-brand-dark-grey"
                  : slotGGR > 0
                  ? "bg-brand-plus-cell"
                  : "bg-brand-minus-cell"
              )}
            >
              {slotGGR.toFixed(2)}
            </td>
            <td className="px-2 py-1 border border-black">0</td>
            <td className="px-2 py-1 border border-black">0</td>
            <td className={clsx("px-2 py-1 border border-black")}>0</td>
            <td className="px-2 py-1 border border-black">0</td>
            <td className="px-2 py-1 border border-black">0</td>
            <td className="px-2 py-1 border border-black">0</td>
          </tr>
        }
        {financialData !== null && (
          <>
            {financialData?.sports_betting.map((item: any, index: number) => {
              if (index !== financialData?.sports_betting.length - 1)
                return (
                  <tr key={index} className="bg-brand-dark-grey">
                    <td className="px-2 py-1 border border-black">
                      {item._id.coupon_type}
                    </td>
                    <td className="px-2 py-1 border border-black">
                      {item.total_in.toFixed(2)}
                    </td>
                    <td className="px-2 py-1 border border-black">
                      {item.total_out.toFixed(2)}
                    </td>
                    <td
                      className={clsx(
                        "px-2 py-1 border border-black",
                        item.ggr === 0
                          ? "bg-brand-dark-grey"
                          : item.ggr > 0
                          ? "bg-brand-plus-cell"
                          : "bg-brand-minus-cell"
                      )}
                    >
                      {item.ggr.toFixed(2)}
                    </td>
                    <td className="px-2 py-1 border border-black">
                      {item.share}
                    </td>
                    <td className="px-2 py-1 border border-black">
                      {item.bonus}
                    </td>
                    <td
                      className={clsx(
                        "px-2 py-1 border border-black",
                        item.converted === 0 || item.converted === undefined
                          ? "bg-brand-dark-grey"
                          : item.converted > 0
                          ? "bg-brand-plus-cell"
                          : "bg-brand-minus-cell"
                      )}
                    >
                      {item.converted === undefined ? 0 : item.converted}
                    </td>
                    <td className="px-2 py-1 border border-black">
                      {item.ngr === undefined ? 0 : item.ngr}
                    </td>
                    <td className="px-2 py-1 border border-black">
                      {item.open}
                    </td>
                    <td className="px-2 py-1 border border-black">
                      {item.sumOpen}
                    </td>
                  </tr>
                );
            })}
            {/* {financialData.slots !== undefined &&
              financialData.slots.length > 0 && (
                <tr className="bg-brand-dark-grey">
                  <td className="px-2 py-1 border border-black">
                    {financialData.slots[0].totalsPerSlot.length > 1
                      ? "Slots"
                      : "Slots"}
                  </td>
                  <td className="px-2 py-1 border border-black">
                    {slotIn.toFixed(2)}
                  </td>
                  <td className="px-2 py-1 border border-black">
                    {slotOut.toFixed(2)}
                  </td>
                  <td
                    className={clsx(
                      "px-2 py-1 border border-black",
                      slotGGR === 0
                        ? "bg-brand-dark-grey"
                        : slotGGR > 0
                        ? "bg-brand-plus-cell"
                        : "bg-brand-minus-cell"
                    )}
                  >
                    {slotGGR.toFixed(2)}
                  </td>
                  <td className="px-2 py-1 border border-black">{share}</td>
                  <td className="px-2 py-1 border border-black">{bonus}</td>
                  <td
                    className={clsx(
                      "px-2 py-1 border border-black",
                      converted !== 0 ? "bg-brand-plus-cell" : ""
                    )}
                  >
                    {converted}
                  </td>
                  <td className="px-2 py-1 border border-black">{ngr}</td>
                  <td className="px-2 py-1 border border-black">{open}</td>
                  <td className="px-2 py-1 border border-black">{sumOpen}</td>
                </tr>
              )} */}
          </>
        )}
      </tbody>
    </table>
  );
};

export default GeneralTable;
