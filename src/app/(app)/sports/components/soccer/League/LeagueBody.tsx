import React, { useState } from "react";
import Stats from "@/components/Sports/Soccer/stats";
import Chevron from "@/components/ui/icons/chevron";
import { cn } from "@/lib/utils";
import { Categoryoptions } from "./maps";
import DialogForCategory from "./DialogForCategory";
import OutsideClickHandler from "react-outside-click-handler";
import { useRouter, usePathname } from "next/navigation";

const LeagueBody = ({ leagueSelectedGames, active }: any) => {
  const [category, setCategory] = useState({
    isOpen: false,
    outer: "Popular",
    inner: "Full Time Result",
    list: Categoryoptions,
  });

  const dates = {} as any;
  if (leagueSelectedGames && leagueSelectedGames.length > 0) {
    leagueSelectedGames?.map((data: any) => {
      if (
        dates &&
        dates[data?.formatted_date] &&
        dates[data?.formatted_date].length > 0
      ) {
        dates[data?.formatted_date].push(data);
      } else {
        dates[data?.formatted_date] = [data];
      }
    });
  } else {
    return null;
  }

  // console.log({ dates, category })
  return (
    <div className="bg-[#383838]">
      <div className=" relative flex items-center justify-between text-xl text-brand-green-light hover:text-white font-bold px-[30px] py-0 min-h-[55px] cursor-pointer">
        <OutsideClickHandler
          onOutsideClick={() => {
            setCategory({
              ...category,
              isOpen: false,
            });
          }}
        >
          <div
            className="flex items-center  hover:underline"
            onClick={() => {
              setCategory({
                ...category,
                isOpen: true,
              });
            }}
          >
            {category?.inner}
            <Chevron className="ml-[7px] fill-white h-[6px] w-[12px]" />
          </div>
          {category.isOpen && (
            <DialogForCategory category={category} setCategory={setCategory} />
          )}
        </OutsideClickHandler>
      </div>
      <div>
        <CategoryBased dates={dates} active={category.inner} />
      </div>
    </div>
  );
};

export default LeagueBody;

const CategoryBased = ({ dates, active }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      {dates &&
        Object.keys(dates).map((date: any) => {
          // console.log({ dd: dates });
          return (
            <div key={date}>
              <div className="h-[30px] bg-[#ffffff12] text-[white] text-[12px] font-[700] pl-[30px] flex items-center">
                <div className="flex flex-1 items-center">{date}</div>
                <div className="flex flex-1 items-center">
                  <div className="flex flex-1 items-center justify-center">
                    1
                  </div>
                  <div className="flex flex-1 items-center justify-center">
                    X
                  </div>
                  <div className="flex flex-1 items-center justify-center">
                    2
                  </div>
                </div>
                <div className="w-[65px] h-full hidden md:flex"></div>
              </div>
              {dates[date].map((data: any, index: number) => {
                const item = [] as any;
                item.push(data?.odds.main.sp.full_time_result.odds[0].odds);
                item.push(data?.odds.main.sp.full_time_result.odds[1].odds);
                item.push(data?.odds.main.sp.full_time_result.odds[2].odds);
                return (
                  <div
                    key={index}
                    className={cn(
                      "text-xs h-[70px] flex text-[white] items-center min-h-[70px] pl-[10px] md:pl-[30px] overflow-hidden",
                      index == 0
                        ? ""
                        : "border-t border-solid border-t-[#ffffff1a]"
                    )}
                  >
                    <div
                      onClick={() => {
                        // console.log({data})
                        router.push(`${pathname}/${data.id}`);
                      }}
                      className="flex flex-1 items-center justify-between cursor-pointer overflow-hidden"
                    >
                      <div className="flex-1 flex items-center overflow-hidden">
                        <div className=" hidden md:flex">{data?.time}</div>
                        <div className="flex flex-col md:ml-5 font-[700] leading-[25px] hover:text-brand-green-light overflow-hidden">
                          <div className=" truncate">
                            {data?.localteam?.name}
                          </div>
                          <div className=" truncate">
                            {data?.visitorteam?.name}
                          </div>
                          <div className="text-[10px] font-[500] leading-3 flex md:hidden">
                            {data?.time}
                          </div>
                        </div>
                      </div>
                      <div className="flex ml-[auto]">
                        <Stats />
                      </div>
                    </div>
                    <div className="bg-[#ffffff1a] h-[49px] w-[1px]"></div>

                    <div className="flex-1 flex h-full justify-center items-center text-[13px] cursor-pointer">
                      {item.map((column: any, index: number) => {
                        return (
                          <div
                            key={index}
                            className="flex flex-1 h-full justify-center items-center text-[#ffde00] hover:bg-[#ffffff26]"
                          >
                            {column}
                          </div>
                        );
                      })}
                    </div>
                    <div className="bg-[#ffffff1a] h-[49px] w-[1px]"></div>

                    <div className="w-[65px] h-full hidden md:flex"></div>
                  </div>
                );
              })}
            </div>
          );
        })}
    </>
  );
};
