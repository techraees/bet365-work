import React from "react";

import { navItems } from "./list";
import CustomLink from "./ui/Link";

function Sidenav() {
  return (
    <div className="w-[255px] hidden md:flex overflow-auto h-[calc(100vh-60px)] bg-brand-navbar">
      <div className="w-full h-full flex text-base flex-col overflow-auto">
        <div className="text-[#00dfa9] pl-[20px] pr-[10px] pt-[32px] pb-[10px] text-xs font-[700]">
          Administration
        </div>
        <div className="flex flex-col">
          {navItems?.map((item, index) => {
            return (
              <CustomLink
                key={index}
                href={item.link}
                className="text-sm"
                activeClassName="text-sm font-[700]"
              >
                <div className="pl-5 h-[45px] flex items-center text-[#ddd] hover:bg-[#383838] hover:text-[#fff] cursor-pointer">
                  <div className="truncate">{item?.label}</div>
                </div>
              </CustomLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Sidenav;
