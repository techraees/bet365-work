import React from "react";


const Banner = () => {
    return (
        <div className="flex min-h-[89px] flex-col w-full relative overflow-hidden">
            <img src="/Boxing-desktop.jpeg" className="absolute top-[0] h-[166px] w-full object-cover object-right" alt="" />
            <div className="pt-[40px] px-[20px] flex justify-between items-center z-10">
                <div className="flex text-[white] text-[24px] font-[700] leading-[32px]">
                    Boxing
                </div>
                <div className="flex ml-auto">

                </div>
            </div>
        </div>

    )
}

export default Banner;