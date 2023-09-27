"use client";

import React from "react";

import StarIcon from "@/components/ui/icons/star";
import CustomLink from "@/components/ui/Link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import {
  BaseballIcon,
  BasketBallIcon,
  CricketIcon,
  HandballIcon,
  SoccerIcon,
  TennisIcon,
  EsportsIcon,
  IceHockeyIcon,
} from "@/components/ui/icons/sports";
import VolleyballIcon from "@/components/ui/icons/sports/volleyball";

const SportsHeader = () => {
  const pathname = usePathname();
  const menuLinks = [
    {
      label: "Favourites",
      link: "/in-play",
      active: false,
      icon: StarIcon,
    },
    {
      label: "Soccer",
      link: "/in-play/soccer",
      active: true,
      icon: SoccerIcon,
    },
    {
      label: "Tennis",
      link: "/in-play/tennis",
      active: false,
      icon: TennisIcon,
    },
    {
      label: "Baseball",
      link: "/in-play/baseball",
      active: false,
      icon: BaseballIcon,
    },
    {
      label: "Basketball",
      link: "/in-play/basketball",
      active: false,
      icon: BasketBallIcon,
    },
    // {
    //   label: "Cricket",
    //   link: "/in-play/cricket",
    //   active: false,
    //   icon: CricketIcon,
    // },
    // {
    //   label: "Handball",
    //   link: "/in-play/handball",
    //   active: false,
    //   icon: HandballIcon,
    // },
    {
      label: "Volleyball",
      link: "/in-play/volleyball",
      active: false,
      icon: VolleyballIcon,
    },
    {
      label: "Esports",
      link: "/in-play/esports",
      active: false,
      icon: EsportsIcon,
    },
    {
      label: "Ice Hockey",
      link: "/in-play/icehockey",
      active: false,
      icon: IceHockeyIcon,
    },
  ];
  return (
    <div className="bg-brand-dark-grey">
      {" "}
      <div className=" flex gap-[25px] max-w-[1500px] px-8 py-4 shadow-[inset_0_-1px_0_#408058] overflow-auto hidescroll">
        {menuLinks.map((link, index) => {
          const Icon = link.icon;
          const isActive = pathname === (link.link as string);
          return (
            <CustomLink
              href={link.link}
              className={cn("group-hover:text-white text-sm leading-[0px] text-[11px]",isActive && "text-white underline underline-offset-[9px] decoration-[#81FFB1] decoration-2" )}
              key={index}
            >
              <div
                className={cn(
                  "flex flex-col gap-2 items-center cursor-pointer hover:transform hover:scale-[1.05] group",
                  isActive && "scale-[1.05]"
                )}
              >
                <div>
                  <Icon
                    className={cn(
                      "h-[22px] w-[22px] saturate-0 group-hover:saturate-100",
                      isActive && " saturate-100 "
                    )}
                  />
                </div>
                <div>{link.label}</div>
              </div>
            </CustomLink>
          );
        })}
      </div>
    </div>
  );
};

export default SportsHeader;
