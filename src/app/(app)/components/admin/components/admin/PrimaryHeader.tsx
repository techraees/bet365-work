"use client";
import React, { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import Logo, { SmallLogo, BurgerSearch } from "@/components/ui/icons/logo";
import CustomLink from "@/components/ui/Link";
import { Button } from "@/components/ui/button";
import Search from "@/components/ui/icons/search";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavClose } from "@/components/ui/icons/dialogclose";
import { FixNavPanel } from "@/app/(app)/sports/components/Navigation/navigationpanel";
import { getSession, signOut } from "next-auth/react";
import UserAccount from "../../../UserAccount";
const PrimaryHeader = () => {
  const [openNav, setOpenNav] = useState(false);
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
  const menuLinks = [
    {
      label: "Sports",
      link: "/sports",
      active: true,
    },
    {
      label: "In-Play",
      //changed to in-play/soccer to redirect to the soccer we may change it in the future
      link: "/in-play/soccer",
    },
  ];
  const router = useRouter();
  const location = usePathname();
  return (
    <div className=" mx-auto bg-brand-green">
      <Container className=" items-center h-[60px] justify-between hidden md:flex">
        <div className="ml-[20px]">
          <Logo />
        </div>
        <div className=" flex gap-[45px]">
          {menuLinks.map((link, index) => {
            return (
              <CustomLink
                key={index}
                href={link.link}
                className="text-white hover:text-brand-green-light text-sm leading-[0px]"
                activeClassName="underline underline-offset-[23px] decoration-brand-yellow decoration-2"
              >
                {link.label}
              </CustomLink>
            );
          })}
        </div>
        <div className="flex gap-6 items-center ">
          <div className="flex-shrink-0 h-4  w-4 hidden md:flex">
            <Search />
          </div>
          <div className="flex gap-6 items-center ">
            <div className="flex flex-col gap-4 p-1">
              <div className="flex-1 text-white">
                €{userSession?.user?.balance?.sports_betting_slots}
              </div>
              <div className="flex-1 text-white">
                €{userSession?.user?.balance?.live_casino}
              </div>
            </div>
          </div>

          <div className="flex-1 flex-shrink-0 mr-[20px] text-xs">
            <UserAccount />
          </div>
        </div>
      </Container>
      <Container className=" items-center h-[60px] justify-between flex md:hidden text-sm">
        <div className="flex-shrink-0 h-4 flex ml-4 cursor-pointer">
          <BurgerSearch
            onClick={() => {
              setOpenNav(!openNav);
            }}
          />
        </div>
        <div className="mx-auto flex text-white items-center h-full">
          <div
            className={cn(
              "mx-4 cursor-pointer h-full flex text-white hover:text-brand-green-light items-center",
              location?.includes("/in-play")
                ? "border-b-2 border-solid border-[#FFDF1B]"
                : ""
            )}
            onClick={() => {
              router.push("/in-play");
            }}
          >
            In-Play
          </div>
          <div
            className={cn(
              "mx-4 cursor-pointer h-full flex text-white hover:text-brand-green-light items-center",
              location?.includes("/sports")
                ? "border-b-2 border-solid border-[#FFDF1B]"
                : ""
            )}
            onClick={() => {
              router.push("/sports");
            }}
          >
            <SmallLogo />
          </div>
          <div
            className={cn(
              "mx-4 cursor-pointer h-full flex text-white hover:text-brand-green-light items-center",
              location?.includes("/my-bets")
                ? "border-b-2 border-solid border-[#FFDF1B]"
                : ""
            )}
            onClick={() => {
              router.push("/sports");
            }}
          >
            Sports
          </div>
          {/* <div className="mx-4 cursor-pointer">
            Join
          </div> */}
        </div>
          <div className="flex gap-6 items-center ">
            <div className="flex flex-col gap-1 p-1">
              <div className="flex-1 text-white">
                €{userSession?.user?.balance?.live_casino}
              </div>
              <div className="flex-1 text-white">
                €{userSession?.user?.balance?.sports_betting_slots}
              </div>
            </div>
          </div>
        <div className="flex gap-6 items-center pl-4">
          <div className="flex-1 flex-shrink-0 mr-[20px]">
            <UserAccount />
            {/* <button onClick={()=>{signOut()}}
            className="text-white flex-shrink-0 hover:text-brand-green-light">
              Log Out
            </button> */}
          </div>

        </div>
      </Container>
      <div
        id="mySidenav"
        className={cn(
          "h-[100%] fixed z-50 top-0 left-0 bg-[#282828] ease-in-out duration-300 text-base overflow-hidden",
          openNav ? "w-[260px]" : "w-[0px]"
        )}
      >
        <div className="flex flex-col">
          <div className="ml-auto mt-2 mr-2 cursor-pointer">
            <NavClose
              onClick={() => {
                setOpenNav(false);
              }}
            />
          </div>
          <div className="overflow-auto h-[calc(100vh_-_36px)]">
            <FixNavPanel
              onClick={() => {
                setOpenNav(false);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimaryHeader;
