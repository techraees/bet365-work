'use client';
import React, {useState} from "react";
import SportsHeader from "@/app/(app)/in-play/components/SportsHeader";
import EsportHeader from "./EsportHeader";
import EsportBody from "./EsportBody";


const TypesofGames = ["All Esports", "LOL", "CS:GO", "DOTA2", "Honor of Kings", "VALORANT", "Starcraft", "Esoccer", "Ebasketball"]


const Esports = ({ sport, subcategory, currentdataId, grouped }: any) => {
    const [header, setHeader] = useState("All Esports");
    return (
        <div>
             <SportsHeader />
             <EsportHeader header={header} subcategory={subcategory} TypesofGames={TypesofGames} setHeader={setHeader}/>
             <div className="flex h-[1px] w-[100%] bg-[white] opacity-[0.2]"/>
             <EsportBody header={header} sport={sport} subcategory={subcategory} grouped={grouped}/>
        </div>
    )
}

export default Esports;