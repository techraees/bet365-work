"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Chevron from "@/components/ui/icons/chevron";

import { cn } from "@/lib/utils";
import Dialog from "@/components/Events/Dialog";
import MatchBody from "../League/Match/MatchBody";

const DetailSoccer = ({ odds, sport, currentdataId }: any) => {
  const router = useRouter();
  const [active, setActive] = useState("All");
  const [dialog, setDialog] = useState(false);

  console.log({ odds }, { currentdataId });
  let maindata = [] as any;
  let listOfData: any[] = [];
  odds?.map((item: any) => {
    if (item.length > 0) {
      listOfData.push(item[0]);
    }
  });

  if (listOfData && listOfData.length > 0) {
    console.log("LIST");
    listOfData?.map((item: any) => {
      if (item?.id === currentdataId) {
        console.log("pushed");
        maindata.push(item);
      }
    });
  }
  console.log("maindata", maindata);
  const soccerdata = maindata[0];
  const tabs = {
    soccer: [
      "All",
      "Bet Builder",
      "Asian Lines",
      "Corners/Cards",
      "Goals",
      "Half",
    ],
  };
  return (
    <div className="flex w-full flex-col">
      <div className="w-full bg-[linear-gradient(rgba(12,22,20,0.1),transparent_20px),radial-gradient(122%_370px_at_center_-220px,#009969_0,transparent_100%),linear-gradient(to_right_bottom,#0c1614,#084436)]">
        <button
          onClick={() => router.back()}
          className="w-[100%] text-[hsla(0,0%,100%,.8)] hover:text-[white] fill-[hsla(0,0%,100%,.8)] hover:fill-[white]"
        >
          <div className="flex items-center min-h-[45px] text-[12px]  px-[30px] py-0 mt-[5px]">
            <Chevron className="h-[5px] w-[8px] rotate-90" />
            <div className="pl-[5px]">{`Soccer - ${soccerdata?.league}`}</div>
          </div>
        </button>
        <div className=" relative flex items-center justify-between text-xl text-[white] font-bold px-[30px] py-0 mx-0 my-[5px] min-h-[55px] cursor-pointer">
          <div
            className="flex items-center  hover:underline"
            onClick={() => {
              setDialog(true);
            }}
          >
            {`${soccerdata?.localteam?.name} v ${soccerdata?.visitorteam?.name}`}
            <Chevron className="ml-[7px] fill-white h-[6px] w-[12px]" />
          </div>

          <div className="flex items-center">
            <div className="flex items-center text-[#282828] bg-[#ddd] text-xs px-1 rounded-[1px]">
              {soccerdata?.seconds}
            </div>
          </div>

          <Dialog
            grouped={odds}
            currentdataId={currentdataId}
            isOpen={dialog}
            currentGroupName={""}
            onClose={() => {
              console.log("close");
              setDialog(false);
            }}
          />
        </div>
        <div className="flex items-center min-h-[50px] text-[white]">
          <div className="flex items-center mx-[20px] relative w-full whitespace-nowrap overflow-scroll hidescroll">
            {tabs["soccer"]?.map((tab, index) => {
              return (
                <div
                  key={index}
                  className={cn(
                    "cursor-pointer flex items-center justify-center px-[10px] z-20",
                    active == tab
                      ? "text-[black] font-bold transition duration-300 ease-in-out self-center h-[26px] rounded-[13px] bg-[#00ffb6]"
                      : "h-[50px]"
                  )}
                  onClick={(e) => {
                    setActive(tab);
                  }}
                >
                  {tab}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-full">
        <MatchBody data={soccerdata} active={active} />
      </div>
    </div>
  );
};

export default DetailSoccer;
