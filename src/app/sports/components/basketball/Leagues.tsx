
'use client';
import Chevron from "@/components/ui/icons/chevron";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { details } from "./maps/correction";

const LeagueWraps = ({getLeagues, odds} : any)=>{
    console.log({getLeagues})
    // let obj ={} as any;
    // getLeagues.forEach((item: any) => obj[item] = '')
    // console.log({obj})
    
    return (
        <div className="flex flex-col h-full w-full text-base">
            {getLeagues.map((item: any, index: number)=>{
                const particularOdd = odds.filter((odd: any)=> {
                    if(odd.length>0){
                       if( odd[0].league === item ){
                        return true
                       }
                    }
                    return false;
                })
                return (
                    <Competitions name={item} key={index} odd={particularOdd[0]}/>
                )
            })}
        </div>
    )
}

export default LeagueWraps;

function capitalizeSpecificWords(sentence: any) {
    const words = sentence.split(' ');
    const capitalizedWords = words.map((word: any) => {
        if (['wnba', 'vba', 'tbl', 'nbl', 'cebl', 'lbf'].includes(word.toLowerCase())) {
            return word.toUpperCase();
        } else {
            return word;
        }
    });
    return capitalizedWords.join(' ');
}
const Competitions = ({ name , odd}: any) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleHeight = () => {
        setIsExpanded(!isExpanded);
    };
    console.log({odd})
    
    let formattedName = name;

    if(formattedName.includes(':')){
        formattedName = formattedName.replace(":","")
    }
    formattedName = capitalizeSpecificWords(formattedName)
    if(formattedName.includes('World World')){
        formattedName = formattedName.replace("World ","")
    } 
    details["Game Props"] = [] as any;
    odd.map((game: any)=>{
        let match = game?.localteam?.name+ ' @ ' +game?.awayteam?.name
        details["Game Props"].push(match)
    })
    return (
        <div className=" group/item fill-[#a7a7a7] hover:fill-[white] flex flex-col w-full relative bg-[#383838] border-t-[#ffffff1a] border-t border-solid">
            <div className={cn(" flex cursor-pointer pl-[20px] pr-[15px] text-brand-green-light hover:text-[white] ")}
                onClick={() => {
                    toggleHeight()
                }}
            >
                <div className={'text-base h-[50px] flex items-center font-[700]'}>
                    {formattedName}
                </div>
                <div className='ml-auto flex items-center justify-end w-[100px] h-[50px]'>
                    <div className={cn('flex items-center justify-center w-[50px] h-[50px]')}>
                        <div className={cn("items-center justify-center w-[20px] h-[20px]", isExpanded ? "hidden group-hover/item:flex" : "flex")}>
                            <Chevron className={cn("ml-[7px] h-[12px] w-[12px]")} />
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={cn('h-[100%] overflow-hidden transition-[max-height] duration-300 ease', isExpanded ? 'max-h-[5000px]' : 'max-h-[0px]')}>
                <div className={cn("flex w-[100%] h-[100%] text-[white]")}>
                    <div className="group h-[100%] items-center flex w-full flex-col relative text-[#ccc]">
                        {Object.keys(details).map((item, index) => {
                            return (
                                <SubCompetitions key={index} item={item} data={details[item as keyof typeof details]} position={index} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>

    )
}




const SubCompetitions = ({ item, data, position }: any) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleHeight = () => {
        setIsExpanded(!isExpanded);
    };
    const router = useRouter();
    return (
        <div className={cn(" group/item fill-[white] hover:fill-brand-green-light flex flex-col w-full relative bg-[#383838]",
            position === 0 ? "" : "border-t border-solid  border-t-[#ffffff1a] ")}>
            <div className={cn(" flex cursor-pointer pl-[20px] pr-[15px] hover:text-brand-green-light text-[white] ")}
                onClick={() => {
                    toggleHeight()
                }}
            >
                <div className={'text-[13px] leading-5 h-[50px] flex items-center font-[700]'}>
                    {item}
                </div>
                <div className='ml-auto flex items-center justify-end w-[100px] h-[50px]'>
                    <div className={cn('flex items-center justify-center w-[50px] h-[50px]')}>
                        <div className={cn("items-center justify-center w-[20px] h-[20px]", isExpanded ? "hidden group-hover/item:flex" : "flex")}>
                            <Chevron className={cn("ml-[7px] h-[12px] w-[12px]")} />
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={cn('h-[100%] overflow-hidden transition-[max-height] duration-300 ease', isExpanded ? 'max-h-[5000px]' : 'max-h-[0px]')}>
                <div className={cn("flex w-[100%] h-[100%] text-[white]")}>
                    <div className="group h-[100%] items-center px-[20px] flex w-full relative flex-wrap text-[#ccc]">
                        {data.map((dataitem: any, index: number) => {
                            return (
                                <div key={index} className="flex flex-1 min-w-[285px] w-[285px] max-w-[285px] h-[45px] items-center hover:text-[#00ffb6] cursor-pointer"
                                    onClick={() => {
                                        console.log('clicked', dataitem)
                                        
                                    }}
                                >
                                    <div className=" w-[100%] text-[13px] leading-5 font-[400] pr-4 truncate">
                                        {dataitem.replace(":", "")}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}