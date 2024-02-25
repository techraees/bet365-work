import React, { useEffect, useState } from "react";
import BetItemHeader from "./BetItemHeader/BetItemHeader";
import BetItemInnerView from "./BetItemInnerView/BetItemInnerView";
import { clearInterval } from "timers";
import { getLiveOddsEvents } from "@/api";
import { useSession } from "next-auth/react";

type Props = {
  coupon: any;
};

const written = [
  "",
  "Single",
  "Double",
  "Triple",
  "Tetrades",
  "Pentades",
  "Eksades",
  "Efatades",
  "Oktades",
];

export default function BetItem({ coupon }: Props) {
  const [events, setEvents] = useState<any>([]);
  const { data: session } = useSession();
  const userdata = session as any;
  const [collapse, setCollapse] = useState<boolean>(false);
  const [timerId, setTimerId] = useState<any>(null);

  useEffect(() => {
    if(coupon.isLive) {
      const token = userdata?.user?.token || "";
      const interval = setInterval(
        () => {
          getLiveOddsEvents(
            coupon.selections.map((selection: any) => selection.event_id),
            token
          )
          .then(async (res) => {
            const liveEvents = await res.json();

            console.log('-------@live events@-------', liveEvents);
            if (liveEvents && !liveEvents.message) setEvents(liveEvents);
          })
          .catch((e) => {
            console.log("-----fetch error----", e);
          });
        },
        2000
      );
      setTimerId(interval);
    }
    return () => {
      if(timerId)
        clearInterval(timerId);
    };
  }, []);

  return (
    <div
      className="mb-2.5 pb-[15px] rounded-[5px]"
      style={{
        background: "linear-gradient(to bottom right, #303d39, #353535)",
      }}
    >
      <BetItemHeader
        stake={coupon.stake}
        headerText={
          coupon.type == "Solo" ? "Single" : written[coupon.selections.length] ?? ""
        }
        couponID={coupon._id}
        onClick={() => {setCollapse(!collapse)}}
        collapsed={collapse}
      />
      { !collapse && <BetItemInnerView coupon={coupon} events={events} />}
    </div>
  );
}
