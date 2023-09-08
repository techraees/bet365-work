
import React from "react";
const SportHeading = ({ data }: any) => {
    return (
        <div className="flex h-[35px] items-center px-5 bg-[#ffffff1a]">
            <div className="flex-1 justify-center items-center text-[15px] font-[700]">{data?.title}</div>
            <div className="flex flex-1 justify-center items-center">
                {data?.events.map((event: string, index: number) => {
                    return (
                        <div key={index} className="flex flex-1 justify-center items-center text-[12px] font-[700]">{event}</div>
                    )
                })}
            </div>
        </div>
    )
}

export default SportHeading