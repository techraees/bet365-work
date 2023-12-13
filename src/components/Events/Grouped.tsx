import React from "react";
import StarOutlineIcon from "../ui/icons/star-outline";
import Event from "./Event";
import SoccerSubcategoryHeader from "../Sports/Soccer/Details/soccerSubcategoryHeader";
import BasketballSubcategoryHeader from "../Sports/Basketball/Details/BasketballSubcategoryHeader";
import VolleyballSubcategoryHeader from "../Sports/Volleyball/Details/VolleyballSubcategoryHeader";
import BaseballSubcategoryHeader from "../Sports/Baseball/Details/BaseballSubcategoryHeader";
import EsportSubcategoryHeader from "../Sports/Esports/EsportSubcategoryHeader";
import TennisSubcategoryHeader from "../Sports/Tennis/Details/TennisSubcategoryHeader";

interface GropedEventsInterface {
  name: string;
  events: any;
  sport: string;
  subcategory?: string;
}
const Grouped: React.FC<GropedEventsInterface> = ({ name, events, sport, subcategory }) => {
  // console.log('grouped comp', { name, events, sport })

  if(sport === "basketball"){
    return(
      <BasketballSubcategoryHeader  subcategory={subcategory} name={name} events={events} sport={sport}   /> 
    )
  }

  if(sport === "volleyball"){
    return(
      <VolleyballSubcategoryHeader  subcategory={subcategory} name={name} events={events} sport={sport}   /> 
    )
  }
  if(sport === "baseball"){
    return(
      <BaseballSubcategoryHeader subcategory={subcategory} name={name} events={events} sport={sport}   /> 
    )
  }
  if(sport === "soccer"){
    return(
      <SoccerSubcategoryHeader  subcategory={subcategory} name={name} events={events} sport={sport}   /> 
    )
  }
  if(sport === "tennis"){
    return(
      <TennisSubcategoryHeader  subcategory={subcategory} name={name} events={events} sport={sport}   /> 
    )
  }
  return (
    <div className="flex flex-col text-xs font-bold text-white mb-[5px]">
      <div className={`grid grid-cols-8 h-[35px] w-full px-8 bg-[hsla(0,0%,100%,.1)] justify-center`}>
        <div className="col-span-4 flex items-center  gap-4">
          <StarOutlineIcon className=" hover:fill-[#333] fill-transparent cursor-pointer" />
          {name}
        </div>
      </div>
      {events.map((event: any, index: number) => (
        <Event key={index} data={event} sport={sport} subcategory={subcategory} />
      ))}
    </div>
  );
};

export default Grouped;
