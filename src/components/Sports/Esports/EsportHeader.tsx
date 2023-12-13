import CustomLink from "@/components/ui/Link";
import { EsportDrop } from "@/components/ui/icons/chevron";
import { sportsDetailsMapping } from "@/lib/sportsMapping";
import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef } from "react";


const EsportHeader = ({ header, subcategory, TypesofGames, setHeader }: any) => {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)){
            setIsOpen(false);
          }
        };
    
        window.addEventListener('click', handleOutsideClick);
    
        return () => {
          window.removeEventListener('click', handleOutsideClick);
        };
      }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectOption = (option: string) => {
        setHeader(option);
        setIsOpen(false);
    };
    const sport = "esports"
    const sportDetail = sportsDetailsMapping[sport];
    return (
        <div className="flex justify-between h-16 items-center px-2 md:px-8 bg-[#383838] ">
            <div className="flex items-center gap-1 cursor-pointer relative" ref={dropdownRef}
                onClick={toggleDropdown}
                id="dropdown-menu"
                aria-haspopup="true"
                aria-expanded="true"
            >
                <div className=" text-xl font-extrabold text-white italic">
                    {header}
                </div>
                <div>
                    <EsportDrop className="fill-white h-[7px] w-[12px] mt-[2px]" />
                </div>
                {isOpen && (
                <div
                    className="origin-top-left absolute z-10 left-0 top-[40px] mt-2 w-[180px] rounded-[2px] shadow-lg bg-[#e4e4e4] ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="dropdown-menu"
                >
                    <div className="py-1" role="none">
                        {TypesofGames.map((option: string, index: number) => (
                            <button
                                key={index}
                                className={cn("block w-full text-left px-3 py-[10px] text-sm text-[#282828] hover:bg-[white]",
                                    option === header ? "font-[700] bg-[white]" :""
                                )}
                                role="menuitem"
                                onClick={() => selectOption(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            </div>

            


            <div className="hidden gap-5 md:flex">
                {sportDetail.mainHeaderFilters.map((filter, index) => (
                    <div key={index}>
                        {" "}
                        <CustomLink
                            key={index}
                            active={subcategory ? false : index == 0}
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


}


export default EsportHeader;

