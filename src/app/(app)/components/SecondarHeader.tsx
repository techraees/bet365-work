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
    // {
    //   label: "Fantasy",
    //   link: "/fantasy",
    // },
    {
      label: "Casino",
      link: "/casino",
    },
    {
      label: "Live Casino",
      link: "/live-casino",
    },
    // {
    //   label: "Games",
    //   link: "/games",
    // },
    // {
    //   label: "Poker",
    //   link: "/Poker",
    // },
    // {
    //   label: "Bingo",
    //   link: "/bingo",
    // },
    // {
    //   label: "Sports",
    //   link: "/Extra",
    // },
  ];

  const secondaryMenuLinks = [
    // {
    //   label: "Responsible Gambling",
    //   link: "responsible-gambling",
    //   active:false,
    // },
    {
      label: "Help",
      link: "help",
      active:false
    },
  ];
  return (
    <div className=" mx-auto bg-brand-dark-grey">
      <Container className="flex text-xs items-center h-[45px] justify-between overflow-scroll hidescroll">
        <div className="pl-4 flex gap-5 whitespace-nowrap">
          {primaryMenuLinks.map((link, index) => (
            <CustomLink href={link.link} key={index} active={link.active} activeClassName="text-white">
              {link.label}
            </CustomLink>
          ))}
        </div>
        <div className="pl-4 pr-4 flex gap-5 whitespace-nowrap">
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
