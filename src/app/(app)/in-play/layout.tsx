import React, { Children } from "react";
import Container from "@/components/ui/Container";
// import SportsHeader from "./components/SportsHeader";

const InPlayLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" mx-auto">
      <Container className="grid grid-cols-9 ">
        <div className=" col-span-9 flex flex-col md:col-span-6">
          {/* <SportsHeader /> */}
          <div>{children}</div>
        </div>
        <div className="col-span-0 md:col-span-3"> </div>
      </Container>
    </div>
  );
};

export default InPlayLayout;
