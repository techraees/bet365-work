"use client"
import { getSlots } from '@/api';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';



export const dynamic = "force-dynamic";

const Home = ({ params }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slots, setSlots] = useState([]);

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
      let token = userdata?.user?.token || '';
      let response = await getSlots(token);
      if (response.ok) {
        var slotsData = await response.json();
        console.log('slots', slotsData.data);
        setSlots(slotsData.data);
      }
    }
    fetchSlots();
  }, []);

  console.log(slots); // Diagnostic log to ensure slots is populated

  return (
    <div className="">
      <div className="m-3 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2">
        {slots.map((slot: any, index) => (
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
          // <div key={slot._id} className="h-auto lg:m-6 md:m-3 sm:m-2">
          //   <img src={slot.api_image} alt={slot.name} className="w-full h-auto" />
          //   <p className="text-center mt-2 w-full text-white hover:text-brand-green-light">{slot.name}</p>
          // </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
