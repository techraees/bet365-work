"use client";

import React, { FC, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import SoccerJersey from "@/components/Sports/Soccer/Jersey";
import PlayButton from "@/components/ui/icons/playButton";
import { useRouter } from "next/navigation";
interface PostsProps {
  listOfData: any[];
}
const Matchcard: FC<PostsProps> = ({ listOfData }) => {
  console.log({ ll: listOfData });
  const router = useRouter();
  // console.log("Matchcard", listOfData, listOfData?.length);
  const data: {
    hometeam: any;
    awayteam: any;
    time: any;
    home: any;
    draw: any;
    away: any;
    id: any;
  }[] = [];
  if (listOfData && listOfData.length > 0) {
    // console.log("LIST");
    listOfData?.map((item: any) => {
      const hometeam = item?.localteam?.name;
      const awayteam = item?.visitorteam?.name;
      const time = item?.time;
      const home = item?.odds?.main?.sp?.full_time_result?.odds[0]?.odds;
      const draw = item?.odds?.main?.sp?.full_time_result?.odds[1]?.odds;
      const away = item?.odds?.main?.sp?.full_time_result?.odds[2]?.odds;
      data.push({
        hometeam,
        awayteam,
        time,
        home,
        draw,
        away,
        id: item?.id,
      });
    });
  }

  // console.log("finalized data", data);
  return (
    <>
      <Swiper
        slidesPerView={1}
        centeredSlides={false}
        spaceBetween={10}
        modules={[Navigation]}
        className="h-full !static"
        navigation={{
          enabled: true,
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        breakpoints={{
          450: {
            slidesPerView: 1,
          },
          500: {
            slidesPerView: 2,
          },
          900: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
      >
        <div className="swiper-button-next invisible group-hover:visible bg-[#1f1f1f] !w-[20px] !h-[45px] !right-0 after:!text-[10px] after:text-[#ffffffbf] hover:after:text-[#00ffb6] hover:after:content-['next']" />
        <div className="swiper-button-prev invisible group-hover:visible  bg-[#1f1f1f] !w-[20px] !h-[45px] !left-0 after:!text-[10px] after:text-[#ffffffbf] hover:after:text-[#00ffb6] hover:after:content-['prev']" />

        {data?.map((item: any, index: number) => {
          return (
            <SwiperSlide
              key={index}
              onClick={() => {
                router.push(`sports/soccer/${item?.id}`);
              }}
            >
              <div className="flex flex-col items-center justify-center h-full w-full bg-[#ffffff12] rounded-[4px] cursor-pointer">
                <div className="flex-col h-[110px] px-[10px] w-full items-center justify-center text-[white]">
                  <div className="flex items-center justify-center mt-[13px] h-[13px] text-[11px]">
                    {item?.time}
                  </div>
                  <div className="flex items-center justify-center h-[17px]">
                    <PlayButton />
                  </div>
                  <div className="flex flex-1 h-[55px] items-center justify-between overflow-hidden">
                    <div className="flex flex-col pr-[10px] w-[45%] justify-center items-center">
                      <div className="h-[28px] w-[30px]">
                        <SoccerJersey data={null} team={"home"} />
                      </div>
                      <div className="h-[20px] w-[100%]  text-center text-[13px] leading-5 font-[700] px-[10px] whitespace-nowrap overflow-hidden text-ellipsis">
                        {item?.hometeam}
                      </div>
                    </div>
                    <div className="w-[30px] leading-5 flex justify-center h-[20px] text-[13px] font-[700] whitespace-nowrap overflow-hidden text-ellipsis">
                      V
                    </div>
                    <div className="flex flex-col  pl-[10px] w-[45%] justify-center items-center">
                      <div className="h-[28px] w-[30px]">
                        <SoccerJersey data={null} team={"away"} />
                      </div>
                      <div className="h-[20px] w-[100%] text-center text-[13px] leading-5 font-[700] px-[10px] whitespace-nowrap overflow-hidden text-ellipsis">
                        {item?.awayteam}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex h-[44px] w-full text-[#ffde00] text-[13px] border-t border-solid border-t-[#ffffff1a]">
                  <div className="flex flex-1 items-center justify-center hover:bg-[#ffffff26] cursor-pointer">
                    <div className="text-[white] mr-2">1</div>
                    {item?.home}
                  </div>
                  <div className="flex flex-1 items-center justify-center hover:bg-[#ffffff26] cursor-pointer">
                    <div className="text-[white] mr-2">X</div>
                    {item?.draw}
                  </div>
                  <div className="flex flex-1 items-center justify-center hover:bg-[#ffffff26] cursor-pointer">
                    <div className="text-[white] mr-2">2</div>
                    {item?.away}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Matchcard;
