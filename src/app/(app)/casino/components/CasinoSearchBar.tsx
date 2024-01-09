"use client"
import { getSlots } from '@/api';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';



export const dynamic = "force-dynamic";

const CasinoSearchBar = ({ onSearch  }: any) => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleChange = (e:any) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);  // Call the onSearch function with the current input value
  };
  return (
    <div className="grow-0 relative h-full flex shadow-[1px_1px_11px_1px_black] transition-[width] duration-[0.2s] justify-evenly items-center m-0 px-0 py-0.5 rounded-[10px]">
      <div className="relative inline-block h-[50px] align-bottom mx-0.5 my-1">
          <div className='w-full h-full flex flex-row'>
              <input value={searchQuery} className="placeholder:text-white text-white w-0 h-full z-10 transition transition-all duration-500 p-0 border-0 left-[49px] focus:w-[300px] left-auto right-[49px] focus:outline-0 focus:ring-0 focus:pl-2 focus:pr-4 focus:py-0 focus:text-white focus:bg-transparent bg-transparent" id="searchright" type="search" name="q" placeholder="Search" onChange={handleChange}/>
              <label className="inline-block w-[50px] h-[50px] leading-[50px] text-center text-[white] no-underline cursor-pointer select-none hover:duration-[0.4s] text-[22px] m-0 p-0" htmlFor="searchright"><span className="inline-block pointer-events-none rotate-45">&#9906;</span></label>
          </div>
      </div>
    </div>
  );
};

export default CasinoSearchBar;
