"use client"
import { getSlots } from '@/api';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import CasinoSearchBar from './components/CasinoSearchBar';
import CasinoProviderDropDown from './components/CasinoProviderDropDown';



export const dynamic = "force-dynamic";

const Home = ({ params }: any) => {
  const [isFetching, setIsFetching] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slots, setSlots] = useState([]);
  const [filteredSlots, setFilteredSlots] = useState(slots);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { data: session } = useSession()
  const userdata = session as any;

  useEffect(() => {
    const fetchSlots = async () => {
      setIsFetching(true);
      let token = userdata?.user?.token || '';
      let response = await getSlots(token);
      if (response.ok) {
        var slotsData = await response.json();
        console.log('slots', slotsData.data);
        setSlots(slotsData.data);
        setIsFetching(false);
      }
    }
    fetchSlots();
  }, []);

  const handleSearch = (searchValue:string) => {
    const filtered = slots.filter((slot:any) => slot.name.toLowerCase().includes(searchValue.toLocaleLowerCase()));
    console.log('filtered slots', filtered)
    setFilteredSlots(filtered);
  };

  const handleProviderSearch = (searchValue:string) => {
    const filtered = slots.filter((slot:any) => slot.title.includes(searchValue));
    console.log('filtered slots', filtered)
    setFilteredSlots(filtered);
  };

  console.log(slots); // Diagnostic log to ensure slots is populated
  const providerOptions = [...new Set(slots.map((game:any) => game.title))];

  const slotsToRender = filteredSlots.length === 0 ? slots : filteredSlots;
  // const slotsToRender = slots.length !== filteredSlots.length ? filteredSlots : slots;

  console.log(slots)

return (
  <div className="">

    {isFetching ? 
      <div className="flex justify-center mt-8" role="status">
        {/* ... Spinner code remains unchanged ... */}
      </div>
    : 
    <>
      <div className="flex flex-col lg:flex-row mt-5 ml-8 space-y-2 lg:space-y-0 lg:space-x-2">
        <div className="mb-2 lg:mb-0">
          <CasinoSearchBar onSearch={handleSearch}/>
        </div>
        <div>
          <CasinoProviderDropDown options={providerOptions} onClick={handleProviderSearch}/>
        </div>
      </div>
      <div className="m-3 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-1 lg:gap-2">
        {slotsToRender.map((slot: any, index) => (
          <div key={slot._id} className="h-48 w-full relative max-w-sm mx-auto bg-white rounded-2xl shadow-lg group transition-all duration-200">
            <img className="w-full h-48 rounded-2xl" src={slot.api_image}/>
            <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center opacity-0 group-hover:opacity-90 transition-opacity duration-200 hover:bg-black">
                <p className="text-center text-white text-2xl md:text-sm bg-black bg-opacity-0 rounded mb-2 font-sans">{slot.name}</p>
                <div className='flex z-50'>
                  <Link href={`/casino/play?id=${slot._id}`}>
                      <button className='min-w-[20px] h-[20px] flex justify-center items-center text-[13px] font-[700] leading-[17px] text-[#26ffbe] px-[10px] rounded-[2px] border border-[#26ffbe80]'>
                        Play Now 
                      </button>
                  </Link>
                </div>
            </div>
          </div>
          // <div key={slot._id} className="relative group transition-all duration-200">
          //   <img src={slot.api_image} alt={slot.name} className="w-full h-auto" />
          //   <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-90 transition-opacity duration-200 hover:bg-black">
          //       <p className="text-center text-white md:text-sm bg-black bg-opacity-0 rounded mb-2">{slot.name}</p>
          //       <div className='flex z-50'>
          //         <Link href={`/casino/play?id=${slot._id}`}>
          //             <button className='min-w-[20px] h-[20px] flex justify-center items-center text-[13px] font-[700] leading-[17px] text-[#26ffbe] px-[10px] rounded-[2px] border border-[#26ffbe80]'>
          //               Play Now 
          //             </button>
          //         </Link>
          //       </div>
          //   </div>
          // </div>
        ))}
      </div>
    </>
    }
  </div>
);


};

export default Home;
