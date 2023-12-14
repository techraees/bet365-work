// @ts-nocheck
import React, { useEffect, useState } from "react";
import Close from "@/components/ui/icons/dialogclose";
import { cn } from "@/lib/utils";

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  grouped: any;
  currentdataId: string | undefined;
  currentGroupName: string | undefined;
};

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  grouped,
  currentdataId,
  currentGroupName,
}) => {
  const [show, setShow] = useState({} as any);
  useEffect(() => {
    let obj = {} as any;
    grouped?.map((data: { name: string }, index: number) => {
      if (data.name === currentGroupName) {
        obj[data?.name as string] = true;
      } else {
        obj[data?.name as string] = false;
      }
    });
    setShow(obj);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!isOpen) {
    return null;
  }

  return (
    <div className="z-[1000] absolute overflow-hidden top-[55px] left-[40px] md:w-[500px] flex flex-col bg-[linear-gradient(155deg,#1e2a27,#133d30)]">
      <div className="absolute  z-10 top-[-200px] left-[calc(50%_-_150px)] md:w-[300px] h-[300px] blur-[50px] rounded-[100%] bg-[#28ffbb40]"></div>
      <div className="ml-[auto] p-2 z-20">
        <Close onClick={onClose} />
      </div>
      {grouped?.map((data: { name: string }, index: number) => {
        return (
          <div
            key={index}
            className={cn(
              "z-20",
              index !== 0 ? "border-t-[#ffffff1a] border-t border-solid" : ""
            )}
          >
            <div
              className={cn(
                "w-full flex justify-center cursor-pointer pl-[30px] pr-[15px] text-[#00ffb6] hover:text-[white]"
              )}
              onClick={() => {
                setShow({
                  ...show,
                  [data.name]: !show[data.name],
                });
              }}
            >
              <div
                className={cn(
                  "text-[13px] h-[50px] flex items-center font-[700]"
                )}
              >
                {data.name}
              </div>
            </div>

            <div
              className={cn(
                " flex flex-col overflow-hidden transition-[max-height] duration-300 ease",
                show[data.name] ? "max-h-[5000px]" : "max-h-[0px]"
              )}
            >
              {data?.events.map((event, index) => {
                return (
                  <div
                    key={event?.info?.id}
                    className={cn(
                      "h-[100%] text-[13px] font-[700]  overflow-hidden hover:bg-[#ffffff1a]",
                      event?.info?.id === currentdataId ? "bg-[#ffffff1a]" : ""
                    )}
                  >
                    <div className="flex h-[65px] w-full items-center justify-center">
                      <div className="flex-1 text-end mt-[14px] h-[30px] overflow-hidden">
                        {event?.team_info?.home.name}
                      </div>
                      <div className="flex flex-col justify-center items-center w-[70px]">
                        <div className="flex justify-center items-center pb-1">
                          <div className="text-[12px] leading-[11px] font-[400]">
                            {event?.info?.seconds}
                          </div>
                        </div>
                        <div className="flex justify-center items-center">
                          <div className="pr-[5px] text-[22px] leading-[26px] text-[#ffde00]">
                            {event?.team_info?.home.score}
                          </div>
                          <div className="pl-[5px] text-[22px] leading-[26px] text-[#ffde00]">
                            {event?.team_info?.home.score}
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 mt-[14px] h-[30px] overflow-hidden">
                        {event?.team_info?.away.name}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Dialog;
