import React, { Children } from "react";
import PrimaryHeader from "@/app/(app)/components/PrimaryHeader";
import SecondaryHeader from "@/app/(app)/components/SecondarHeader";
import Container from "@/components/ui/Container";
// import SportsHeader from "./components/SportsHeader";

const InPlayLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" text-xs bg-[#282828] leading-[0px] antialiased min-h-[100vh]">
      <header>
        <SecondaryHeader />
        <PrimaryHeader />
      </header>
      <main>
        <div className="mx-auto">
          <Container className="grid grid-cols-9 ">
            <div className=" col-span-9 flex flex-col md:col-span-6">
              {/* <SportsHeader /> */}
              <div>{children}</div>
            </div>
          </Container>
        </div>
      </main>
    </div>
  );
};

export default InPlayLayout;
