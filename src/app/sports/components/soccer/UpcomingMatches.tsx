
'use client';
import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Pagination, Navigation } from 'swiper/modules';

const UpcomingMatches = ({odds}: any) => {

    return (
        <div className="flex min-h-[135px] pb-[20px] flex-col w-full relative bg-[#383838] border-t-2 border-solid border-t-[#367a65]">
            <div className="flex h-[55px] px-[20px] items-center">
                <div className="flex text-[#00ffb6] text-[15px] font-[700]">Upcoming Matches</div>
            </div>

            <div className="group h-[60px] items-center px-[20px] flex w-full relative">
                <Upcomingcards odds={odds}/>
            </div>

        </div>

    )
}

export default UpcomingMatches;








const Upcomingcards = ({odds}: any) => {


    return (
        <>
            <Swiper
                slidesPerView={1}
                centeredSlides={false}
                spaceBetween={10}
                modules={[Navigation]}
                className="h-full w-full !static"
                navigation={{
                    enabled: true,
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
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
                {odds?.map((item: any, index:number)=>{
                    return(
                        <SwiperSlide key={index}>
                        <div className='flex items-center justify-center h-full w-full bg-[#ffffff12] text-[white] rounded-[4px]'>
                            <div className="flex flex-col p-[10px] h-full w-full">
                                <div className='flex-1 flex items-center text-[13px] font-[700] line-clamp-1 w-full text-ellipsis whitespace-nowrap'>
                                    {item[0]?.league}
                                </div>
                                <div className='flex-1 flex items-center text-[10px'>
                                    {`${item.length} Matches`}
                                </div>
                            </div>
                        </div>
                        
                    </SwiperSlide>
                    )
                })}
                
            </Swiper>


        </>
    );

}










