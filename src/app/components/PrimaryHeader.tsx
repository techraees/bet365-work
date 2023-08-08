import React from "react";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/icons/logo";
import CustomLink from "@/components/ui/Link";
import { Button } from "@/components/ui/button";
import Search from "@/components/ui/icons/search";

const PrimaryHeader = () => {
  const menuLinks = [
    {
      label: "Sports",
      link: "/sports",
      active: true,
    },
    {
      label: "In-Play",
      link: "/in-play",
    },
  ];
  return (
    <div className=" mx-auto bg-brand-green">
      <Container className="flex items-center h-[60px] justify-between">
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
          <div className="flex-shrink-0 h-4  w-4">
            <Search />
          </div>
          <Button>Join</Button>
          <div className="flex-1 flex-shrink-0 mr-[20px]">
            <CustomLink href="/log-in" className="text-white w-10 flex-shrink-0 hover:text-brand-green-light">
              Log In
            </CustomLink>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PrimaryHeader;
