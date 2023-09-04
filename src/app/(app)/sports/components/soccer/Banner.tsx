import React from "react";


const Banner = () => {
    const tabs = ["Coupons", "Outrights", "Offers", "Jackpots", "Free Games"]
    return (
        <div className="flex min-h-[128px] flex-col w-full relative overflow-hidden">
            <img src="/Soccer-desktop.jpeg" className="absolute top-[0] h-[166px] w-full object-cover object-right" alt="" />
            <div className="pt-[40px] px-[20px] flex justify-between items-center z-10">
                <div className="flex text-[white] text-[24px] font-[700] leading-[32px]">
                    Soccer
                </div>
                <div className="flex ml-auto">

                </div>
            </div>
            <div className="flex text-[#c3c3c3] text-[13px] font-[500] leading-[45px] z-10 pt-[10px] pl-[8px] pr-[20px]">
                {tabs.map((item, index) => {
                    return (
                        <div key={index} className={'px-[12px] flex hover:text-[white] cursor-pointer'}>
                            {item}
                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export default Banner;