import React from "react";
import { sportsDetailsMapping } from "@/lib/sportsMapping";
import StatsIcon from "@/components/ui/icons/stats";
import CustomLink from "@/components/ui/Link";

interface SportDetailHeaderProps {
  sport: string;
  subcategory?: string;
}

const SportDetailHeader: React.FC<SportDetailHeaderProps> = ({ sport, subcategory }) => {
  // const sportDetail = sportsDetailsMapping["soccer"];
  // console.log({sport})
  const sportDetail = sportsDetailsMapping[sport as keyof typeof sportsDetailsMapping] || sportsDetailsMapping["soccer"];
  if (!sportDetail) {
    return null;
  }
  return (
    <div className="flex justify-between h-16 items-center px-8">
      <div className="flex items-center gap-4">
        <div className=" text-xl font-extrabold text-white italic">
          {sportDetail.name}
        </div>
        <div>
          <StatsIcon />
        </div>
      </div>
      <div className="flex gap-5">
        {sportDetail.mainHeaderFilters.map((filter, index) => (
          <div key={index}>
            {" "}
            <CustomLink
              key={index}
              active={ subcategory? false: index == 0}
              href={`/in-play/${sport}/${filter.value}`}
              className="text-[hsla(0,0%,100%,.8)] font-bold text-[13px] "
              activeClassName="underline underline-offset-[10px] decoration-brand-white decoration-2 text-white"
            >
              {filter.label}
            </CustomLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SportDetailHeader;
