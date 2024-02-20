"use client"
import { getSlots } from '@/api';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';



export const dynamic = "force-dynamic";

const CasinoProviderDropDown = ({ options, onClick  }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState("Select Provider");
  const handleClick = (e:any) => {
    const value = e.target.innerText;
    setSelectedProvider(value);
    onClick(value);  // Call the onSearch function with the current input value
    setIsOpen(false);
  };
  console.log('options', options)
  if(!options.includes("All")){
    options.unshift("All")

  }
  return (
    <div className="">
      <button onClick={() => setIsOpen(!isOpen)} className="bg-blue-500 text-white p-2 h-7 w-40 lg:-mt-px lg:ml-1 md:-ml-2 md:mt-1 md:w-80 ">
        {selectedProvider}
      </button>
      {isOpen && (
        <div role="menu" aria-orientation="vertical" className="absolute z-50 py-1 bg-black">
            {options.map((option: string, index: number) => (
              <a key={index} onClick={handleClick} className="block px-4 py-2 text-sm text-white hover:bg-gray-100">
                {option}
              </a>
            ))}
          </div>

      )}
    </div>
  );
};

export default CasinoProviderDropDown;
