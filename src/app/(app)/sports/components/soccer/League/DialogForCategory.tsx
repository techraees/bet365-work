

// @ts-nocheck
import React, { useEffect, useState, useRef } from "react";

import Close from "@/components/ui/icons/dialogclose";
import { cn } from "@/lib/utils";
import Chevron from "@/components/ui/icons/chevron";

type DialogProps = {
    category: any;
    setCategory: any;
};

const DialogForCategory: React.FC<DialogProps> = ({ category, setCategory }) => {
    const [levelup, setLevelup] = useState(true);
    const [data, setData] = useState(category.outer)
    console.log({ category, levelup })
    return (
        <div
            className="hidescroll h-[550px] w-[330px] bg-[#e4e4e4] text-[14px] font-[400] leading-[44px] text-[#333] overflow-auto absolute top-[55px] z-50">
            {levelup ?
                <>
                    <div className="font-[700] hover:bg-[#fafafa] px-4 flex items-center gap-2"
                        onClick={() => {
                            setLevelup(false);
                        }}
                    >
                        <Chevron className="h-[10px] w-[12px] rotate-90" />
                        {data}
                    </div>
                    {category.list[data]?.map((item, index) => {
                        return (
                            <div key={index}
                            onClick={()=>{
                                setCategory({
                                    ...category,
                                    outer: data,
                                    inner: item,
                                    isOpen: false
                                })
                            }}
                                className="font-[400] hover:bg-[#fafafa] hover:text-[#126e51] px-4 flex items-center border-t border-solid border-t-[#c3c3c3]">
                                {item}
                            </div>

                        )
                    })}
                </>
                :
                Object.keys(category.list)?.map((item, index) => {
                    return (
                        <div key={index}
                            onClick={() => {
                                setLevelup(true)
                                setData(item)
                            }}
                            className="font-[400] hover:bg-[#fafafa] hover:text-[#126e51] px-4 flex items-center border-t border-solid border-t-[#c3c3c3]">
                            {item}
                        </div>

                    )
                })
            }

        </div>
    )
}

export default DialogForCategory