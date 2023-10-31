const CollectingPopup = () => {
  type SportsData = {
    _id: string;
    name: string;
    price: string;
    market: string;
    fixtureDesc: string;
  };

  const SportsDatadata: SportsData[] = [
    {
      _id: "1",
      name: "LA Clippers",
      price: "1.90",
      market: "Point Spread",
      fixtureDesc: "ORL Magic @ LA Clippers",
    },
    {
      _id: "2",
      name: "NY Knicks",
      price: "1.66",
      market: "Money Line",
      fixtureDesc: "NY Knicks @ CLI Cavaliers",
    },
    {
      _id: "3",
      name: "GS Worriors",
      price: "1.90",
      market: "Point Spread",
      fixtureDesc: "GS Worriors @ Den Nuggets",
    },
    {
      _id: "4",
      name: "PHI 7 6ers + 1.5",
      price: "1.90",
      market: "Point Spread",
      fixtureDesc: "PHI 76ers @ MLA Heat",
    },
    {
      _id: "5",
      name: "LA Clippers",
      price: "1.90",
      market: "Point Spread",
      fixtureDesc: "ORL Magic @ LA Clippers",
    },
    {
      _id: "6",
      name: "PHX Suns -5.0",
      price: "1.90",
      market: "Point Spread",
      fixtureDesc: "DAL Mavericks @ PHX Suns",
    },
  ];

  //   Collecting data
  type LiTags = {
    _id: string;
  };
  const LiTagsData: LiTags[] = [
    {
      _id: "1",
    },
    {
      _id: "2",
    },
    {
      _id: "3",
    },
    {
      _id: "4",
    },
    {
      _id: "5",
    },
    {
      _id: "6",
    },
  ];
  return (
    <>
      <div className="fixed bottom-[2rem] left-[60vh]  text-black   bg-white rounded-[5px] w-[35.15vw]">
        <div className="flex flex-col">
          <div className="upper px-[0.4rem] py-[0.75rem] bg-white">
            <span className="icon text-black relative opacity-[0.3]">
              <svg
                className="absolute top-[10px] left-[-9px]"
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 68 68"
                fill="none"
              >
                <path
                  d="M25.4558 25.4561L42.4264 42.4266"
                  stroke="#190B47"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M25.4558 42.4266L42.4264 25.4561"
                  stroke="#190B47"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
            <div className="user_detail ml-[1.5rem] ">
              <div className="flex justify-between">
                <div className="flex gap-[0.5rem]">
                  <h3 className="text-[#545454] text-[15px] font-[700]">
                    Atletico Rafaela
                  </h3>
                  <span className="price text-[#137a5a] font-[700]">2.5</span>
                </div>

                <span className="flex text-[#137a5a] items-center font-[600] hover:border-b-[1px] border-[#137a5a] border-solid cursor-pointer">
                  <p className=" text-[11px] ">Show selections </p>
                  <span className="rotate-[-90deg] ml-[0.125rem]">{">"}</span>
                </span>
              </div>
              <div className="desc text-[#666] text-[11px]">
                <p>Fulltime Result</p>
                <p>Atletico Rafaela v Defensores de Belgrano</p>
              </div>
            </div>
          </div>

          <div className="content_area overflow-y-auto w-full  overflow-auto  bg-[#dfdfdf] text-black">
            <div className="upper pl-[0.4rem] py-[0.1rem]">
              <span className="icon text-black relative opacity-[0.3]">
                <svg
                  className="absolute top-[10px] left-[-9px]"
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 68 68"
                  fill="none"
                >
                  <path
                    d="M25.4558 25.4561L42.4264 42.4266"
                    stroke="#190B47"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M25.4558 42.4266L42.4264 25.4561"
                    stroke="#190B47"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <div className="flex justify-between">
                <div className="user_detail ml-[1.5rem] flex-1">
                  <div className="flex justify-between">
                    <h3 className="text-[#545454] text-[15px] font-[700]">
                      Atletico Rafaela
                    </h3>
                    <span className="price text-[#137a5a] font-[700] mr-[1rem]">
                      2.5
                    </span>
                  </div>
                  <div className="desc text-[#666] text-[11px]">
                    <p>Fulltime Result</p>
                    <p>Atletico Rafaela v Defensores de Belgrano</p>
                  </div>
                </div>
                <div className="w-[25%]">
                  <div className="input w-full">
                    <input
                      type="text"
                      className="w-full outline-none bg-white placeholder:text-[#757575] py-[0.25rem] placeholder:text-right border-b-[1px] border-solid border-[black] placeholder:my-[10rem]"
                      placeholder="Stake"
                      style={{ direction: "rtl", textAlign: "right" }}
                    />
                  </div>
                  <div className="input-area flex flex-col items-end m-1">
                    <div className="input-area__return-price text-[11px]">
                      To Return
                    </div>
                    <div className="input-area__price text-[11px] ">
                      €123,453,343.00
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lower flex w-[100%]">
            <div className="left-btn bg-[#333333] flex w-[50%] justify-between items-center px-[0.75rem] py-[0.1rem]">
              <h3 className="text-[0.75rem] text-[#58d7af] font-[400] text-[1rem]">
                Set Stake
              </h3>
              <div className="flex flex-col justify-end items-end opacity-[0.3] hover:opacity-[1]">
                <span className="text-[0.75rem] text-[#cecece]">Remember</span>
                <div className="pr-[0.5rem]">
                  <input type="checkbox" name="" id="" />
                </div>
              </div>
            </div>
            <div className="right-btn bg-[#757575] flex w-[50%] justify-center items-center font-[500] text-[1rem] text-[#cecece]">
              Place Bet
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectingPopup;
