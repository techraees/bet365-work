'use client'
import Account, { Deposit } from "@/components/ui/icons/account";
import { getSession, signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";


const UserAccount = () => {
    const [open, setOpen] = useState(false)
    return (
        <div className="relative">
            <Account className="w-[32px] h-[32px] cursor-pointer" onClick={() => { setOpen(!open) }} />
            {open && <Dialog />}
        </div>
    )
}

export default UserAccount

type DialogProps = {

};

const Dialog: React.FC<DialogProps> = ({ }) => {
    const [userSession, setUserSession] = useState(null) as any;

    useEffect(() => {
        const fetchSession = async () => {
            const currentSession = await getSession();
            setUserSession(currentSession);
        };
        fetchSession();
    }, []);

    // const userdata = session as any;
    const userdata = userSession;
    console.log('udata', userdata);
    return (
        <div
            className="hidescroll w-[330px] bg-[#f8f9fa] text-[14px] font-[400] leading-[44px] text-[#333] overflow-auto absolute top-[46px] right-[-20px] z-50">
            
                <div className="flex flex-col text-sm">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex flex-col">
                            <div>{userdata?.user?.username}</div>
                            <div className="text-xl font-bold">${userdata?.user?.balance?.sports_betting}</div>
                        </div>
                        <div>
                            <button className=" border-solid border-[#c3c3c3] border-[1px] px-4 py-2 hover:bg-white">
                                <div className="flex items-center">
                                    <span><Deposit className="w-[12px] h-[13px] mr-[10px]" /></span>
                                    <span className="font-semibold">Deposit</span>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="text-xs flex items-center mt-4 p-4">
                        <div className="flex flex-col">
                            <div>{'Withdrawable'}</div>
                            <div className=" font-semibold">${userdata?.user?.balance?.sports_betting}</div>
                        </div>
                        <div className="flex flex-col ml-8">
                            <div>{'Bet Credits'}</div>
                            <div className=" font-semibold">${userdata?.user?.balance?.sports_betting}</div>
                        </div>
                    </div>
                    <div className="border-solid border-t-[#c3c3c3] border-t-[1px]">
                        <div
                        className="cursor-pointer w-full h-[50px] flex items-center p-4 hover:bg-white">
                            Resposible Gambling
                        </div>
                        <div
                        className="cursor-pointer w-full h-[50px] flex items-center p-4 hover:bg-white">
                            Help
                        </div>
                    </div>
                    <div className="border-solid border-t-[#c3c3c3] border-t-[1px]">
                        <div onClick={()=>{signOut()}}
                        className="cursor-pointer w-full h-[55px] flex items-center p-4 hover:bg-white">
                            Log Out
                        </div>
                    </div>
                </div>

        </div>
    )
}
