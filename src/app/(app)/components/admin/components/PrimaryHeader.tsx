"use client";
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";

import Container from "@/components/ui/Container";
import Logo, { SmallLogo, BurgerSearch } from "@/components/ui/icons/logo";
import CustomLink from "@/components/ui/Link";
import Search from "@/components/ui/icons/search";
import { cn } from "@/lib/utils";
import { NavClose } from "@/components/ui/icons/dialogclose";

import { navItems } from "./list";

const PrimaryHeader = () => {
  const { status } = useSession();
  const [openNav, setOpenNav] = useState(false);
  return (
    <div className="mx-auto bg-brand-green">
      <Container className=" items-center h-[60px] justify-between hidden md:flex">
        <div className="ml-[20px]">
          <Logo />
        </div>
        <div className="flex gap-6 items-center ">
          <div className="flex-shrink-0 h-4  w-4 hidden md:flex">
            <Search />
          </div>
          <div className="flex-1 flex-shrink-0 mr-[20px] text-xs">
            {status === "authenticated" ? (
              <div
                className="text-white hover:text-brand-green-light cursor-pointer"
                onClick={() => signOut()}
              >
                Log Out
              </div>
            ) : (
              <CustomLink
                href="/auth/signin"
                className="text-white hover:text-brand-green-light cursor-pointer"
              >
                Log In
              </CustomLink>
            )}
          </div>
        </div>
      </Container>
      <Container className=" items-center h-[50px] justify-between flex md:hidden text-sm">
        <div className="flex-shrink-0 h-4 flex ml-4 cursor-pointer">
          <BurgerSearch
            onClick={() => {
              setOpenNav(!openNav);
            }}
          />
        </div>
        <div className="flex text-white justify-between items-center h-full w-full">
          <div
            className="mx-4 cursor-pointer h-full flex text-white hover:text-brand-green-light items-center"
            onClick={() => {
              // router.push("/sports");
            }}
          >
            <SmallLogo />
          </div>
          <div className="flex gap-4 mr-5">
            <div className="mx-4 cursor-pointer">Join</div>
            {status === "authenticated" ? (
              <div
                className="text-white hover:text-brand-green-light cursor-pointer"
                onClick={() => signOut()}
              >
                Log Out
              </div>
            ) : (
              <CustomLink
                href="/auth/signin"
                className="text-white hover:text-brand-green-light cursor-pointer"
              >
                Log In
              </CustomLink>
            )}
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
          <div className="flex flex-col overflow-auto h-[calc(100vh_-_36px)]">
            {navItems?.map((item, index) => {
              return (
                <CustomLink
                  key={index}
                  href={item.link}
                  className="text-sm"
                  activeClassName="text-sm font-[700]"
                  onClick={() => {
                    setOpenNav(false);
                  }}
                >
                  <div className="pl-5 h-[45px] flex items-center text-[#ddd] hover:bg-[#383838] hover:text-[#fff] cursor-pointer">
                    <div className="truncate">{item?.label}</div>
                  </div>
                </CustomLink>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimaryHeader;
