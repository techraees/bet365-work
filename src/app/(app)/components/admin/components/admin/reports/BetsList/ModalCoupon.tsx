"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { Modal } from "antd";
import { useModalContext } from "../../../../contexts/ModalContext";

interface ModalCouponProps {
  item: any;
  user: any;
}

function ModalCoupon({ item, user }: ModalCouponProps) {
  const { data: session }: any = useSession();
  const { isCouponModalOpen, closeCouponModal } = useModalContext();
  const [totalSumOdds, setTotalSumOdds] = useState(0);
  const [readableDate, setReadableDate] = useState() as any;

  useEffect(() => {
    if (item !== null) {
      console.log(item);
      let _totalSumOdds = 0;
      for (let i = 0; i < item.selections.length; i++)
        _totalSumOdds += item.selections[i].value_eu;
      setTotalSumOdds(_totalSumOdds);

      var date = new Date();
      if (item.timestamp !== undefined) {
        // Convert to readable string (e.g., for the US locale)
        const readableString = date.toLocaleString("en-US", {
          timeZone: "Etc/GMT-2",
          dateStyle: "full",
          timeStyle: "long",
        });
        setReadableDate(readableString);
      } else {
        date = new Date();
      }
    }
  }, [item]);

  return (
    <Modal
      className="modal-coupon"
      title="Coupon"
      open={isCouponModalOpen}
      onCancel={closeCouponModal}
      footer={[
        <div key="close" className="flex justify-center">
          <button
            className="px-4 py-1.5 rounded-md bg-brand-dialog-button"
            onClick={closeCouponModal}
          >
            Close
          </button>
        </div>,
      ]}
    >
      <>
        {item !== null && user !== undefined && (
          <section className="px-4">
            <section className="flex flex-col gap-6 bg-brand-dialog items-center pt-4">
              <table className="w-full text-sm text-gray-400 text-center">
                <thead className="text-sm bg-[#222] text-white">
                  <tr>
                    <th
                      scope="col"
                      className="w-[40%] px-4 text-left py-1.5 border border-gray-600"
                    >
                      Id: {item._id}
                    </th>
                    <th
                      scope="col"
                      className="px-4 text-left py-1.5 border border-gray-600"
                    >
                      {item.coupon_type}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-brand-light-grey text-black text-xs text-left">
                  <tr>
                    <td className="px-4 py-1 border border-gray-600 truncate">
                      Date
                    </td>
                    <td className="px-4 py-1 border border-gray-600 truncate">
                      {readableDate}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-1 border border-gray-600 truncate">
                      Type
                    </td>
                    <td className="px-4 py-1 border border-gray-600 truncate">
                      {item.type}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-1 border border-gray-600 truncate">
                      User
                    </td>
                    <td className="px-4 py-1 border border-gray-600 truncate">
                      {item.placedBy}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-1 border border-gray-600 truncate">
                      Amount
                    </td>
                    <td className="px-4 py-1 border border-gray-600 truncate">
                      {item.stake}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-1 border border-gray-600 truncate">
                      Pos.Win.
                    </td>
                    <td className="px-4 py-1 border border-gray-600 truncate">
                      {item.possible_winnings}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-1 border border-gray-600 truncate">
                      Bet Win
                    </td>
                    <td className="px-4 py-1 border border-gray-600 truncate">
                      {item.won_amount}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-1 border border-gray-600 truncate">
                      Sum Odds
                    </td>
                    <td className="px-4 py-1 border border-gray-600 truncate">
                      {totalSumOdds}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-1 border border-gray-600 truncate">
                      Ip
                    </td>
                    <td className="px-4 py-1 border border-gray-600 truncate"></td>
                  </tr>
                  <tr>
                    <td className="px-4 py-1 border border-gray-600 truncate">
                      Status
                    </td>
                    <td className="!p-0 border border-gray-600 truncate">
                      <div
                        className={clsx(
                          "w-20 px-4 py-1 h-full text-center",
                          item.status === "Won"
                            ? "bg-green-700"
                            : item.status === "Lost"
                            ? "bg-brand-red"
                            : "bg-gray-500"
                        )}
                      >
                        {item.status}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-1 border border-gray-600 truncate">
                      Available Cashout
                    </td>
                    <td className="px-4 py-1 border border-gray-600 truncate"></td>
                  </tr>
                  <tr>
                    <td className="px-4 py-1 border border-gray-600 truncate">
                      Outright
                    </td>
                    <td className="px-4 py-1 border border-gray-600 truncate"></td>
                  </tr>
                </tbody>
              </table>
              <section className="w-full overflow-scroll md:overflow-hidden">
                <table className="w-full text-sm text-gray-400 text-center">
                  <thead className="text-sm bg-[#222] text-white">
                    <tr>
                      <th
                        scope="col"
                        className="px-2 py-1.5 border border-gray-600 truncate"
                      >
                        Game
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
                        Event
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-1.5 border border-gray-600 truncate"
                      >
                        Prediction
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-1.5 border border-gray-600 truncate"
                      >
                        Odds value
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-1.5 border border-gray-600 truncate"
                      >
                        Result
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-1.5 border border-gray-600 truncate"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-brand-light-grey text-black text-xs">
                    {item.selections.map((selection: any, index: number) => {
                      return (
                        <tr key={index}>
                          <td className="px-2 py-1 border border-gray-600 truncate">
                            {selection.event_id}
                          </td>
                          <td className="px-2 py-1 border border-gray-600 truncate"></td>
                          <td className="px-2 py-1 border border-gray-600 truncate">
                            {selection.event_name}
                          </td>
                          <td className="px-2 py-1 border border-gray-600 truncate">
                            {selection.odd_name} [{" "}
                            {selection.participant_header}{" "}
                            {selection.participant_name}{" "}
                            {selection.participant_handicap} ]
                          </td>
                          <td className="px-2 py-1 border border-gray-600 truncate">
                            {selection.value_eu}
                          </td>
                          <td className="px-2 py-1 border border-gray-600 truncate">
                            {selection.odd_id}
                          </td>
                          <td className="border border-gray-600 px-2 truncate">
                            <div
                              className={clsx(
                                "py-2",
                                selection.status === "WON" ||
                                  selection.status === "HALF WON" ||
                                  selection.status === "HALF LOST"
                                  ? "bg-green-700"
                                  : selection.status === "LOST"
                                  ? "bg-brand-red"
                                  : "bg-gray-500"
                              )}
                            >
                              {selection.status}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </section>
              <section className="hidden flex flex-col gap-2 w-full">
                <p className="text-lg text-brand-button-text font-bold">
                  Columns
                </p>
                <table className="w-full text-sm text-gray-400 text-center">
                  <thead className="text-sm bg-[#222] text-white">
                    <tr>
                      <th
                        scope="col"
                        className="px-2 py-1.5 border border-gray-600 truncate"
                      >
                        Column
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-1.5 border border-gray-600 truncate"
                      >
                        Combination
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-1.5 border border-gray-600 truncate"
                      >
                        Bet
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-1.5 border border-gray-600 truncate"
                      >
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-brand-light-grey text-black text-xs">
                    <tr>
                      <td className="px-4 py-1 border border-gray-600 truncate">
                        4
                      </td>
                      <td className="px-4 py-1 border border-gray-600 truncate">
                        15
                      </td>
                      <td className="px-4 py-1 border border-gray-600 truncate">
                        0.3
                      </td>
                      <td className="px-4 py-1 border border-gray-600 truncate">
                        4.50
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-1 border border-gray-600 truncate">
                        5
                      </td>
                      <td className="px-4 py-1 border border-gray-600 truncate">
                        6
                      </td>
                      <td className="px-4 py-1 border border-gray-600 truncate">
                        0.6
                      </td>
                      <td className="px-4 py-1 border border-gray-600 truncate">
                        3.60
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-1 border border-gray-600 truncate">
                        6
                      </td>
                      <td className="px-4 py-1 border border-gray-600 truncate">
                        1
                      </td>
                      <td className="px-4 py-1 border border-gray-600 truncate">
                        1
                      </td>
                      <td className="px-4 py-1 border border-gray-600 truncate">
                        1.00
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
            </section>
          </section>
        )}
      </>
    </Modal>
  );
}

export default ModalCoupon;
