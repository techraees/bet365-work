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
    <div className="">
        <form className=''>
            <input value={searchQuery}  onChange={(event) => handleChange(event)} className='h-7 w-80 px-5 py-1 w-2/3 sm:px-5 sm:py-3 font-bold transition duration-300 ease-in-out self-center h-[26px] bg-[#f8f9fa]' placeholder='Search'/>
        </form>
    </div>
  );
};

export default CasinoSearchBar;
