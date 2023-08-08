import Chevron from "@/components/ui/icons/chevron";
import { cn } from "@/lib/utils";
import React from "react";
import SportHeading from "./TableHeading";

const TennisTable = ({ tennisgrouped }: any) => {
  let tennis = {
    title: "Tennis",
    events: ['1', '2']
  }

  console.log({ tennisgrouped })
  // const filteredData = soccergrouped?.slice(0, 5);
  let oddData = [] as any;
  tennisgrouped.map((item: any) => {

    if (oddData.length == 5 || oddData.length > 5) {
      return;
    }
    if (item?.events && item?.events.length > 0) {
      item.events.map((dataOfEvent: any, index: number) => {
        if (oddData.length == 5 || oddData.length > 5) {
          return;
        }
        if (dataOfEvent?.odds && dataOfEvent?.odds?.[80856]?.participants) {
          let participants = dataOfEvent?.odds[80856]?.participants
          const suspend = dataOfEvent?.odds[80856]?.suspend
          let home = null;
          let away = null;
          let game = null;
          Object.keys(dataOfEvent?.extra).map(item => {
            if (dataOfEvent?.extra[item].value.startsWith('Game ')) {
              game = dataOfEvent?.extra[item].value.substring(0, dataOfEvent?.extra[item].value.indexOf(' - '))
            }
          });
          let homegame1 = '0'
          let awaygame1 = '0'
          let homegame2 = '0'
          let awaygame2 = '0'
          Object.keys(dataOfEvent?.stats).map(item => {
            if (dataOfEvent?.stats[item].name === "S1") {
              homegame2 = dataOfEvent?.stats[item].home
              awaygame2 = dataOfEvent?.stats[item].away
            }
            if (dataOfEvent?.stats[item].name === "S2") {
              homegame2 = dataOfEvent?.stats[item].home
              awaygame2 = dataOfEvent?.stats[item].away
            }
            if (dataOfEvent?.stats[item].name === "T") {
              homegame1 = dataOfEvent?.stats[item].home
              awaygame1 = dataOfEvent?.stats[item].away
            }
          });

          if (suspend === "0") {
            Object.keys(participants).map(participat => {
              if (participants[participat]?.name === "Home") {
                home = participants[participat].value_eu
              } else if (participants[participat]?.name === "Away") {
                away = participants[participat].value_eu
              }
            })
          }
          oddData.push({
            home: dataOfEvent?.team_info?.home?.name,
            away: dataOfEvent?.team_info?.away?.name,
            period: dataOfEvent?.info?.period,
            game: game ? game : '',
            minute: dataOfEvent?.info?.minute,
            homescore1: homegame1,
            homescore2: homegame2,
            homescore3: dataOfEvent?.stats?.['1'].home,
            awayscore1: awaygame1,
            awayscore2: awaygame2,
            awayscore3: dataOfEvent?.stats?.['1'].away,
            rows: [{ title: '', value: home, suspend: suspend }, { title: '', value: away, suspend: suspend }]
          })

        }
      })

    }

  })
  return (
    <div className="flex flex-col pb-3 h-full bg-[linear-gradient(135deg,#3F4D32_0%,_#383838_400px)]">
      <SportHeading data={tennis} />
      {oddData?.map((item: any, index: number) => {
        return <div key={index} className={cn("h-[83px] flex items-center px-5", index == 0 ? "" :
          "border-t border-solid border-t-[#ffffff1a]"
        )}>
          <div className="flex-1 justify-center items-center text-[13px]">
            <div className="flex flex-col pr-5 py-3">
              <div className="flex justify-between items-center text-[#e4e4e4]">
                <div>
                  {item.home}
                </div>
                <div className="flex items-center justify-center">
                  <div className="font-[700] mr-1 w-[12px] flex items-center justify-center">
                    {item.homescore1}
                  </div>
                  <div className="mr-1  w-[12px] flex items-center justify-center" >
                    {item.homescore2}
                  </div>
                  <div className="w-[12px] flex items-center justify-center" >
                    {item.homescore3}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center text-[#e4e4e4]">
                <div>
                  {item.away}
                </div>
                <div className="flex items-center justify-center">
                  <div className="font-[700] mr-1 w-[12px] flex items-center justify-center">
                    {item.awayscore1}
                  </div>
                  <div className="mr-1  w-[12px] flex items-center justify-center" >
                    {item.awayscore2}
                  </div>
                  <div className="w-[12px] flex items-center justify-center" >
                    {item.awayscore3}
                  </div>
                </div>

              </div>
              <div className="flex text-[11px] leading-[20px] text-[#ddd] items-center">
                <div className="mr-1">
                  {item.period}
                </div>
                <div className="mr-2">
                  {item.game}
                </div>
                <div className="mr-1">
                  {item.minute}
                </div>
                <Chevron className={cn("h-[4px] w-[8px] rotate-[270deg] fill-[#ccc]")} />
              </div>
            </div>
          </div>
          <div className="bg-[#ffffff1a] h-[63px] w-[1px]" />
          <div className="flex-1 flex h-full justify-center items-center text-[13px] cursor-pointer">
            {item?.rows.map((column: any, index: number) => {
              return (
                <div key={index} className="flex flex-1 h-full justify-center items-center text-[#ffde00] hover:bg-[#ffffff26]">
                  {column.value}
                </div>
              )
            })}
          </div>
        </div>

      })}

    </div>
  )
}

export default TennisTable