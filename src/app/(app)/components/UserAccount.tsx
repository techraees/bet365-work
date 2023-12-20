"use client";
import Account, { Deposit } from "@/components/ui/icons/account";
import { getSession, signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const UserAccount = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <Account
        className="w-[32px] h-[32px] cursor-pointer"
        onClick={() => {
          setOpen(!open);
        }}
      />
      {open && <Dialog />}
    </div>
  );
};

export default UserAccount;

type DialogProps = {};

const Dialog: React.FC<DialogProps> = ({}) => {
  const router = useRouter();
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
  console.log("udata", userdata);

  type UserData = {
    user?: {
      balance?: { [key: string]: number };
    };
  };

  let sumBalance: number = 0;

  if (userdata?.user?.balance) {
    sumBalance = Object.values(userdata.user.balance)
      .filter((value): value is number => typeof value === "number")
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }
  var _balance = {} as any;
  if (userdata?.user?.balance !== undefined) {
    _balance = JSON.parse(JSON.stringify(userdata?.user?.balance));
    delete _balance["_id"];
    delete _balance["agent"];
  }
  return (
    <div className="hidescroll w-[330px] bg-[#f8f9fa] text-[14px] font-[400] leading-[44px] text-[#333] overflow-auto absolute top-[46px] right-[-20px] z-50">
      <div className="flex flex-col text-sm">
        <div className="flex items-center justify-end px-4 pt-4">
          <button className="border-solid border-[#c3c3c3] border-[1px] px-4 py-2 hover:bg-white" onClick={() => router.push("/admin/users")}>
              <span className="font-semibold">Go to admin panel</span>
          </button>
        </div>
        <div className="flex items-center justify-between p-4">
          <div className="flex flex-col">
            <div>{userdata?.user?.username}</div>
            <div className="text-xl font-bold">
              ${userdata?.user?.balance?.sports_betting}
            </div>
          </div>
          <div>
            <button className=" border-solid border-[#c3c3c3] border-[1px] px-4 py-2 hover:bg-white">
              <div className="flex items-center">
                <span>
                  <Deposit className="w-[12px] h-[13px] mr-[10px]" />
                </span>
                <span className="font-semibold">Deposit</span>
              </div>
            </button>
          </div>
        </div>
        {/* <div className="text-xs flex items-center mt-4 p-4"> */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-4">
          {userdata?.user?.balance
            ? Object.keys(_balance).map(
                (balance_title: string, index: number) => (
                  <div className="ml-4" key={index}>
                    <div>{balance_title}</div>
                    <div className="font-bold">
                      {userdata.user.balance[balance_title]}
                    </div>
                  </div>
                )
              )
            : null}

          {/* <div className="flex flex-col">
                            <div>{'Withdrawable'}</div>
                            <div className=" font-semibold">${userdata?.user?.balance?.sports_betting}</div>
                        </div>
                        <div className="flex flex-col ml-8">
                            <div>{'Bet Credits'}</div>
                            <div className=" font-semibold">${userdata?.user?.balance?.sports_betting}</div>
                        </div> */}
        </div>
        <div className="border-solid border-t-[#c3c3c3] border-t-[1px]">
          <div className="cursor-pointer w-full h-[50px] flex items-center p-4 hover:bg-white">
            Resposible Gambling
          </div>
          <div className="cursor-pointer w-full h-[50px] flex items-center p-4 hover:bg-white">
            Help
          </div>
        </div>
        <div className="border-solid border-t-[#c3c3c3] border-t-[1px]">
          <div
            onClick={() => {
              signOut();
            }}
            className="cursor-pointer w-full h-[55px] flex items-center p-4 hover:bg-white"
          >
            Log Out
          </div>
        </div>
      </div>
    </div>
  );
};
