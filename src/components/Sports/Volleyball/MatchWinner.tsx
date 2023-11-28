import React from "react";

interface MatchWinner {
    data: any;
}
const MatchWinner: React.FC<MatchWinner> = ({data}) => {
  let obj2:any[] = []
  let objs: any[] = []
  if(!data){
      return null
  }
  Object.keys(data?.odds).map((item:any) => {
      if (data.odds[item].name === "Home/Away") {
      obj2.push(data?.odds[item])

          let participants = data.odds[item]?.participants
          let home = [] as any;
          let away = [] as any;
          Object.keys(participants).map(participat => {
              if (participants[participat]?.name === "Home" && participants[participat]?.suspend === "0") {
                  home.push(participants[participat].value_eu)
              } else if (participants[participat]?.name === "Away" && participants[participat]?.suspend === "0") {
                  away.push(participants[participat].value_eu)
              }
          })
          objs.push({ home, away})
      }

  })
  console.log(obj2,"I am Object 2 here to show you!",Object.keys(data?.odds).length)
  return   (   <div className=" col-span-5 flex w-full">
      <div className="flex w-full">
        <div className="flex flex-1 items-center hover:bg-[hsla(0,0%,100%,.15)] cursor-pointer">
          <div className="bg-[hsla(0,0%,100%,.1)] w-[1px] h-[75px]" />
          <div className="flex w-full justify-center font-[400] text-[#ffdf1b]">
           {objs[0]?.home[objs[0].home.length - 1]}
          </div>
        </div>
        <div className="flex flex-1 items-center hover:bg-[hsla(0,0%,100%,.15)] cursor-pointer flex-row-reverse">
          <div className="bg-[hsla(0,0%,100%,.1)] w-[1px] h-[75px]" />
          <div className="flex w-full justify-center font-[400] text-[#ffdf1b]">
            {objs[0]?.away[objs[0].away.length - 1]}
          </div>
        </div>
      </div>
    </div>)
};

export default MatchWinner;
