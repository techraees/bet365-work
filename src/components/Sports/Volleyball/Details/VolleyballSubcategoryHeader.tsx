import Event from "@/components/Events/Event";
import StarOutlineIcon from "@/components/ui/icons/star-outline";
import React from "react";
import VolleyballEvent from "../VolleyballEvent";

interface GropedEventsInterface {
  name: string;
  events: any;
  sport: string;
  subcategory?: string;
}
const VolleyballSubcategoryHeader: React.FC<GropedEventsInterface> = ({
  name,
  events,
  sport,
  subcategory,
}) => {
  // Must be deleted before git
  const handleDataRecieve = () => {
    const data: any[] = [];
    events.forEach((element: any) => {
      for (const key in element) {
        if (key === "odds") {
          const odds = element[key];
          for (const key2 in odds) {
            const newObj = odds[key2];
            for (const key3 in newObj.participants) {
              const lastObj = newObj.participants[key3];
              data.push(lastObj.value_eu);
            }
          }
        }
      }
    });
    return data;
  };

  return (
    <div className="flex flex-col text-xs font-bold text-white mb-[5px]">
      <div
        className={`grid grid-cols-11 h-[35px] w-full px-8 bg-[hsla(0,0%,100%,.1)] justify-center`}
      >
        <div className="col-span-5 flex items-center  gap-4">
     
          <StarOutlineIcon className=" hover:fill-[#333] fill-transparent cursor-pointer" />
          {name}
        </div>
        {subcategory === "matchTotal" ? (
          <div className="col-span-5 flex">
            <div className="flex flex-1 items-center justify-center">Over</div>
            <div className="flex flex-1 items-center justify-center">Under</div>
          </div>
        ) : (
          <div className="col-span-5 flex">
            <div className="flex flex-1 items-center justify-center">1</div>
            <div className="flex flex-1 items-center justify-center">2</div>
          </div>
        )}
        <div className="flex items-center justify-center"></div>
      </div>
      {events.map((event: any, index: number) => (
        <VolleyballEvent
          key={index}
          data={event}
          sport={sport}
          subcategory={subcategory}
        />
      ))}
    </div>
  );
};

export default VolleyballSubcategoryHeader;
