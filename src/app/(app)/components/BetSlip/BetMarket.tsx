import React from "react";

const BetMarket = ({ teamName, odds, resultType, matchDetail }) => {
  return (
    <div className="w-[450px] h-[126px] absolute left-1/3 bottom-0 rounded-[5px] z-50">
      <div className="w-[450px] h-[76px] left-1/3 bottom-0 absolute">
        <div className="w-[450px] h-[76px] left-1/3 bottom-0 absolute">
          <div className="w-[430px] h-[66px] left-[20px] bottom-0 absolute">
            <div className="w-[430px] h-[66px] left-1/3 bottom-0 absolute">
              <div className="w-[430px] h-[49px] left-1/3 bottom-0 absolute">
                <div className="w-[411px] h-[49px] left-[15px] bottom-0 absolute">
                  <div className="w-[411px] h-[31px] left-1/3 bottom-0 absolute">
                    <div className="w-[43.19px] h-[17.50px] left-1/3 top-[10px] absolute text-neutral-600 text-[15px] font-bold font-['Roboto'] leading-[18px]">
                      {teamName}
                    </div>
                    <div className="w-[33.91px] h-[17.50px] left-[51.99px] top-[10px] absolute text-emerald-700 text-[15px] font-bold font-['Roboto'] leading-[18px]">
                      {odds}
                    </div>
                  </div>
                  <div className="w-[88.20px] h-[18px] left-1/3 top-[31px] absolute">
                    <div className="w-[88.20px] h-4 left-1/3 bottom-0 absolute">
                      <div className="w-[83.40px] h-[13px] left-1/3 top-[1.50px] absolute text-stone-500 text-[11px] font-normal font-['Roboto'] leading-none">
                        {resultType}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[430px] h-[17px] left-1/3 top-[49px] absolute">
                <div className="w-[405px] h-[17px] left-[15px] bottom-0 absolute">
                  <div className="w-[105.20px] h-[13px] left-1/3 top-[1.50px] absolute text-stone-500 text-[11px] font-normal font-['Roboto'] leading-none">
                    {matchDetail}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[45px] h-[45px] left-1/3 bottom-0 absolute">
            <div className="w-[45px] h-[45px] left-1/3 bottom-0 absolute">
              <div className="w-2.5 h-2.5 left-[10px] top-[15px] absolute" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetMarket;
