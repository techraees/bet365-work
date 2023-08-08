import React from "react";
import Container from "@/components/ui/Container";
import CustomLink from "@/components/ui/Link";

const SecondaryHeader = () => {
  const primaryMenuLinks = [
    {
      label: "Sports",
      link: "/sports",
      active:true,
    },
    {
      label: "Fantasy",
      link: "/fantasy",
    },
    {
      label: "Casino",
      link: "/casino",
    },
    {
      label: "Live Casino",
      link: "/live-casino",
    },
    {
      label: "Games",
      link: "/games",
    },
    {
      label: "Poker",
      link: "/Poker",
    },
    {
      label: "Bingo",
      link: "/bingo",
    },
    {
      label: "Sports",
      link: "/Extra",
    },
  ];

  const secondaryMenuLinks = [
    {
      label: "Responsible Gambling",
      link: "responsible-gambling",
      active:false,
    },
    {
      label: "Help",
      link: "help",
    },
  ];
  return (
    <div className=" mx-auto bg-brand-dark-grey">
      <Container className="flex items-center h-[45px] justify-between">
        <div className="pl-4 flex gap-5">
          {primaryMenuLinks.map((link, index) => (
            <CustomLink href={link.link} key={index} active={link.active} activeClassName="text-white">
              {link.label}
            </CustomLink>
          ))}
        </div>
        <div className="pr-4 flex gap-5">
          {secondaryMenuLinks.map((link, index) => (
            <CustomLink href={link.link} key={index} active={link.active} activeClassName="text-white">
              {link.label}
            </CustomLink>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default SecondaryHeader;
