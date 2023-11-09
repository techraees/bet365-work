import React from "react";
import { categoriesMapping } from "@/lib/sportsMapping";
import { toWin } from "./Details/mappings/mapping";
interface WinnerProps {
  data: any;
}

const Winner: React.FC<WinnerProps> = ({ data }) => {
  let objs: any[] = [];
  if (!data) {
    return null;
  }
  let home = [] as any;
  let away = [] as any;
  let odd_rows = toWin(data);
  console.log("odd_rows", odd_rows);
  if (
    odd_rows.rows.length > 0 &&
    odd_rows.rows[0].length > 0 &&
    odd_rows.suspend === "0"
  ) {
    home.push(odd_rows.rows[0][1]);
    away.push(odd_rows.rows[0][2]);
    objs.push({ home, away });
  }

  function handleClick(target_odd: any) {
    // Your away click logic here
    console.log("Clicked");
    console.log(target_odd);
  }

  console.log(objs[0]);
  return (
    <>
      <div className="flex-1 flex">
        <div
          className="flex flex-1 items-center hover:bg-[hsla(0,0%,100%,.15)] cursor-pointer"
          onClick={() => handleClick(objs[0]?.home[objs[0].home.length - 1])}
        >
          <div className="bg-[hsla(0,0%,100%,.1)] w-[1px] h-[50px]" />

          <div className="text-[#ffdf1b] w-full text-center text-[13px] font-normal pl-[3px]">
            {objs[0]?.home[objs[0].home.length - 1].value}
          </div>
        </div>
        <div
          className="flex flex-1 items-center hover:bg-[hsla(0,0%,100%,.15)] cursor-pointer flex-row-reverse"
          onClick={() => handleClick(objs[0]?.away[objs[0].away.length - 1])}
        >
          <div className="bg-[hsla(0,0%,100%,.1)] w-[1px] h-[50px]" />
          <div className="text-[#ffdf1b] w-full text-center text-[13px] font-normal pr-[3px]">
            {objs[0]?.away[objs[0].away.length - 1].value}
          </div>
        </div>
      </div>
    </>
  );
};

export default Winner;
