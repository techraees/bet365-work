import * as React from "react"
import { useState } from "react";
const Stats = () => {
    const [isShown, setIsShown] = useState(false);
    return (
        <div className="flex items-center justify-center w-[20px] h-[25px] md:w-[55px] md:h-[45px] cursor-pointer"
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width={13} height={13}>
                <path className={`${isShown ? 'fill-brand-green-light' : 'fill-[#ccc]'}`}
                    fillRule="evenodd"
                    d="M5 0h3v13H5V0zm5 3h3v10h-3V3zM0 7h3v6H0V7z"
                />
            </svg>
        </div>

    )
}
export default Stats