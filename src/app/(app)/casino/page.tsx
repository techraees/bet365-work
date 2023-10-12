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
    const filtered = slots.filter((slot:any) => slot.name.includes(searchValue));
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
              <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
            <span className="sr-only">Loading...</span>
          </div>
          : 
          <>
            <div className="lg:flex lg:flex-row mt-5 ml-8 space-x-2 md:grid-cols-1 sm:grid sm:grid-cols-1">
              <div>
                <CasinoSearchBar onSearch={handleSearch}/>
              </div>
              <div>
                <CasinoProviderDropDown  options={providerOptions} onClick={handleProviderSearch}/>
              </div>
            </div>
            <div className="m-3 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2">
              {slotsToRender.map((slot: any, index) => (
                <div key={slot._id} className="h-auto lg:m-5 md:m-2 sm:m-1 relative group transition-all duration-200">
                  <img src={slot.api_image} alt={slot.name} className="w-full h-auto" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-90 transition-opacity duration-200 hover:bg-black">
                      <p className="text-center text-white text-2xl bg-black bg-opacity-0 rounded mb-2">{slot.name}</p>
                        <div className='flex z-50'>
                          <Link href={`/casino/play?id=${slot._id}`}>
                              <button className=' min-w-[100px] h-[25px] flex justify-center items-center text-[13px] font-[700] leading-[17px] text-[#26ffbe] px-[10px] rounded-[2px] border border-[#26ffbe80]'>
                                Play Now 
                              </button>
                          </Link>
                        </div>
                  </div>
                  
                </div>
              ))}
            </div>
          </>
            }
          </div>
  );
};

export default Home;
