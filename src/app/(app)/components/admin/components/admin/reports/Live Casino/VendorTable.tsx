import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

import { getFinalcialReports } from "@/app/(app)/admin/api/reports";

interface VendorTableProps {
  item_: any;
  startingOn: string;
  endingOn: string;
}

const VendorTable = ({ item_, startingOn, endingOn }: VendorTableProps) => {
  const { data: session }: any = useSession();

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
      if (_res.data.live_casino !== undefined)
        setFinancialData(_res.data.live_casino[0]?.totalsPerLiveCasino);
    } else toast.error(_res?.data.message);
  };

  if(financialData == null){

    return null;
  }
  console.log({ss2:financialData})
  return (
    <table className="w-full text-sm text-white text-center">
      <thead className="text-sm bg-[#222]">
        <tr>
          <th scope="col" className="px-2 py-1.5 border border-black">
            Vendor
          </th>
          <th scope="col" className="px-2 py-1.5 border border-black">
            IN
          </th>
          <th scope="col" className="px-2 py-1.5 border border-black">
            OUT
          </th>
          <th scope="col" className="px-2 py-1.5 border border-black">
            GGR
          </th>
        </tr>
      </thead>

      <tbody>
        {financialData?.map((item: any, index: number) => {
          return (
            <tr key={index} className="bg-brand-dark-grey">
              <td className="px-2 py-1 border border-black">{item?._id}</td>
              <td className="px-2 py-1 border border-black">{item?.total_in.toFixed(2)}</td>
              <td className="px-2 py-1 border border-black">{item?.total_out.toFixed(2)}</td>
              <td className="px-2 py-1 border border-black">{item?.ggr.toFixed(2)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default VendorTable;
