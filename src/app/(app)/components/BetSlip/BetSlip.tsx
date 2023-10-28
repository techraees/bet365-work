import BetMarket from "./BetMarket";

function BetSlip() {
  return (
    <div className="w-[450px] h-[126px] absolute left-1/3 bottom-5 rounded-[5px] z-50">
      <div className="w-[450px] h-[76px] left-0 top-0 absolute bg-zinc-100">
        <div className="w-[450px] h-[76px] left-0 top-0 absolute">
          <div className="w-[450px] h-[76px] left-0 top-0 absolute">
            {/* <BetMarket
              teamName="Braga"
              odds="6.50"
              resultType="Full Time Result"
              matchDetail="Braga v Real Madrid"
            /> */}

            <div className="w-[45px] h-[45px] left-0 top-0 absolute">
              <div className="w-[45px] h-[45px] left-0 top-0 absolute">
                <div className="w-2.5 h-2.5 left-[10px] top-[15px] absolute" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[450px] h-[50px] left-0 top-[76px] absolute bg-zinc-100">
        <div className="w-[450px] h-[50px] left-0 top-0 absolute">
          <div className="w-[225px] h-[50px] left-0 top-0 absolute bg-zinc-800">
            <div className="w-[225px] h-[50px] left-0 top-0 absolute">
              <div className="w-[225px] h-[50px] left-0 top-0 absolute">
                <div className="w-[210px] h-[26px] left-[15px] top-[11.50px] absolute">
                  <div className="w-[210px] h-[26px] left-0 top-0 absolute">
                    <div className="w-px h-6 left-0 top-[1px] absolute">
                      <div className="w-[72.54px] h-6 left-[1px] top-0 absolute">
                        <div className="w-[72.74px] h-6 left-0 top-0 absolute text-emerald-300 text-[17px] font-normal font-['Roboto'] leading-normal">
                          Set Stake
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[56.48px] h-[50px] left-[160.52px] top-0 absolute opacity-30">
                <div className="w-[56.48px] h-[18px] left-0 top-0 absolute">
                  <div className="w-[56.68px] h-[13px] left-0 top-[5px] absolute text-center text-stone-300 text-[11px] font-normal font-['Roboto'] leading-[13px]">
                    Remember
                  </div>
                </div>
                <div className="w-6 h-3 left-[26.48px] top-[24px] absolute bg-zinc-600 rounded-[15px]">
                  <div className="w-3.5 h-3.5 left-0 top-[-1px] absolute bg-neutral-300 rounded-[17px]" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[225px] h-[50px] left-[225px] top-0 absolute">
            <div className="w-[225px] h-[50px] left-0 top-0 absolute bg-neutral-500">
              <div className="w-[195px] h-[19px] left-[15px] top-[15px] absolute">
                <div className="w-[72.58px] h-[19px] left-[61.21px] top-0 absolute">
                  <div className="w-[72.78px] h-[19px] left-0 top-0 absolute text-center text-stone-300 text-base font-bold font-['Roboto'] leading-[19px]">
                    Place Bet
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BetSlip;
