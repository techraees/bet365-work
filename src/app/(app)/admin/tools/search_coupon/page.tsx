"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

import { useModalContext } from "../../../components/admin/contexts/ModalContext";
import { searchCoupon, getCoupon } from "../../api/tools";
import ModalSearchCoupon from "../../../components/admin/components/admin/tools/SearchCoupon/ModalSearchCoupon";
import ModalDetails from "../../../components/admin/components/admin/tools/SearchCoupon/ModalDetails";
import Input from "../../../components/admin/components/ui/Input";

const SearchCoupon = () => {
  const { data: session }: any = useSession();
  const { openSearchCouponModal, openDetailsModal } = useModalContext();

  const [date, setDate] = useState(
    new Date().getFullYear() +
      "-" +
      String(new Date().getMonth() + 1).padStart(2, "0") +
      "-" +
      String(new Date().getDate()).padStart(2, "0")
  );
  const [sport, setSport] = useState("Select Sport");
  const [country, setCountry] = useState("All Countries");
  const [league, setLeague] = useState("All League");
  const [gameId, setGameId] = useState("");

  const [couponList, setCouponList] = useState(null);

  const [selectedItem, setSelectedItem] = useState(null);
  const [couponData, setCouponData] = useState(null);

  const onHandleSearch = async () => {
    const _res = await searchCoupon(
      session.user.token,
      session.user.role,
      gameId,
      league,
      sport
    );
    if (_res?.status === 200) {
      setCouponList(_res.data);
    } else toast.error(_res?.data.error);
  };

  const getCouponData = async (event_name: string) => {
    const _res = await getCoupon(session.user.token, session.user.role, event_name);
    if (_res?.status === 200) {
      setCouponData(_res.data);
      openSearchCouponModal();
    } else toast.error(_res?.data.error);
  }

  return (
    <>
      <section className="flex flex-col gap-4 p-4">
        <section className="flex flex-col gap-4">
          <div className="grid md:flex gap-1 justify-center items-center">
            <input
              type="date"
              className="w-44 fill-blue-500 h-9 text-primary text-lg font-medium focus:outline-none border border-primary bg-white"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm block focus:ring-0 focus:border-gray-300"
              onChange={(e) => setSport(e.target.value)}
            >
              <option value="Select Sport">Select Sport</option>
              <option value="Football">Football</option>
              <option value="Basketball">Basketball</option>
              <option value="Tennis">Tennis</option>
              <option value="Volleyball">Volleyball</option>
              <option value="Table Tennis">Table Tennis</option>
              <option value="Handball">Handball</option>
              <option value="Hutsal">Hutsal</option>
              <option value="Ice Hockey">Ice Hockey</option>
            </select>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm block focus:ring-0 focus:border-gray-300"
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="All Countries">All Countries</option>
              <option value="Europe">Europe</option>
              <option value="England">England</option>
            </select>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-sm block focus:ring-0 focus:border-gray-300"
              onChange={(e) => setLeague(e.target.value)}
            >
              <option value="All League">All League</option>
              <option value="Serie B">Serie B</option>
              <option value="U20 Campeonato Cariioca">
                U20 Campeonato Cariioca
              </option>
            </select>
            <Input
              className="bg-white border-gray-300 w-24 h-9 p-2 focus:ring-0 rounded-sm focus:border-gray-300 text-sm"
              placeholder="Game Id"
              disable_value={false}
              value={gameId}
              onHandleChange={(e: any) => setGameId(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button
              className="w-16 h-8 text-sm rounded-md bg-brand-dialog-button hover:bg-white"
              onClick={onHandleSearch}
            >
              Search
            </button>
          </div>
        </section>
        {couponList !== null && (
          <section className="pt-4 w-full overflow-scroll md:overflow-hidden">
            {(couponList as Array<any>).length === 0 ? (
              <p className="text-lg font-bold text-center text-brand-button-text">
                No results
              </p>
            ) : (
              <table className="w-full text-sm text-gray-400 text-center">
                <thead className="text-sm bg-brand-yellow text-black">
                  <tr>
                    <th
                      scope="col"
                      className="px-10 py-1.5 border border-gray-600"
                    >
                      {"Games (" + (couponList as Array<any>).length + ")"}
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-1.5 border border-gray-600 truncate"
                    >
                      Sport
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-1.5 border border-gray-600 truncate"
                    >
                      Country
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-1.5 border border-gray-600 truncate"
                    >
                      League
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-1.5 border border-gray-600 truncate"
                    >
                      Start Date
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-1.5 border border-gray-600 truncate"
                    >
                      Coupons
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-1.5 border border-gray-600 truncate"
                    >
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(couponList as Array<any>)?.map((item: any, index: number) => {
                    return (
                      <tr key={index} className="text-white bg-[#666]">
                        <td className="px-2 py-1 border border-gray-600 truncate">
                          {item.game_id + " " + item.event_name}
                        </td>
                        <td className="px-2 py-1 border border-gray-600 truncate">
                          {item.sport}
                        </td>
                        <td className="px-2 py-1 border border-gray-600 truncate">
                          {item.country}
                        </td>
                        <td className="px-2 py-1 border border-gray-600 truncate">
                          {item.league}
                        </td>
                        <td className="px-2 py-1 border border-gray-600 truncate">
                          {item.date}
                        </td>
                        <td className="border border-gray-600 w-36">
                          <div
                            className="py-1 bg-green-700 cursor-pointer"
                            onClick={() => {
                              setSelectedItem(item);
                              getCouponData(item.event_name);
                            }}
                          >
                            {item.coupons}
                          </div>
                        </td>
                        <td className="border border-gray-600 w-36">
                          <div
                            className="py-1 bg-green-700 cursor-pointer"
                            onClick={() => {
                              setSelectedItem(item);
                              openDetailsModal();
                            }}
                          >
                            Details
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </section>
        )}
      </section>
      <ModalSearchCoupon item={selectedItem} couponData={couponData} />
      <ModalDetails item={selectedItem} />
    </>
  );
};

export default SearchCoupon;
