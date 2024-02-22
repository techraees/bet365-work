"use client";
import { getCasinoGames, getSlots } from "@/api";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import CasinoSearchBar from "./components/CasinoSearchBar";
import CasinoProvider from "./components/CasinoProvider";

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

  const { data: session } = useSession();
  const userdata = session as any;

  useEffect(() => {
    const fetchSlots = async () => {
      setIsFetching(true);
      let token = userdata?.user?.token || "";
      let response = await getCasinoGames(token);
      if (response.ok) {
        var slotsData = await response.json();
        console.log("slots", slotsData.data);
        setSlots(slotsData.data);
        setIsFetching(false);
      }
    };
    fetchSlots();
  }, []);

  const handleSearch = (searchValue: string) => {
    if(searchValue == "All")
      searchValue = ""
    const filtered = slots.filter((slot: any) =>
      slot.name.includes(searchValue)
    );
    console.log("filtered slots", filtered);
    setFilteredSlots(filtered);
  };

  const handleProviderSearch = (searchValue: string) => {
    const filtered = slots.filter((slot: any) =>
      slot.title.includes(searchValue)
    );
    console.log("filtered slots", filtered);
    setFilteredSlots(filtered);
  };

  const providerOptions = [...new Set(slots.map((game: any) => game.title))];

  const slotsToRender = filteredSlots.length === 0 ? slots : filteredSlots;
  // const slotsToRender = slots.length !== filteredSlots.length ? filteredSlots : slots;


  return (
    <div className="bg-brand-green border-2 border-brand-green">
      {isFetching ? (
        <div className="flex justify-center mt-8" role="status">
          {/* ... Spinner code remains unchanged ... */}
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between gap-x-4 p-4 shadow-[0px_2px_4px_0px_black]">
            <CasinoProvider
              options={providerOptions}
              onClick={handleProviderSearch}
            />
            <CasinoSearchBar onSearch={handleSearch} />
          </div>
          <div className="m-3 flex flex-wrap flex-row justify-center">
            {slotsToRender.map((slot: any, index) => (
              <div
                key={slot._id}
                className="relative group transition-all duration-200 w-[300px]"
              >
                <img
                  src={slot.api_image}
                  alt={slot.name}
                  className="w-full h-auto"
                />
                <p className="text-center text-white md:text-sm text-white rounded mt-2 mb-2">
                  {slot.name}
                </p>

                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-90 transition-opacity duration-200 hover:bg-[#00000055]">
                  <div className="flex z-50">
                    <Link href={`/live-casino/play?id=${slot._id}`}>
                      <button className="bg-[#111] min-w-[20px] h-[20px] flex justify-center items-center text-[13px] font-[700] leading-[17px] text-[#26ffbe] px-[10px] rounded-[2px] border border-[#26ffbe80]">
                        Play Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
