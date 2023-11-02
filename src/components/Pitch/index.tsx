import React from "react";
import TennisPitch from "../Sports/Tennis/TennisPitch";
import SoccerPitch from "../Sports/Soccer/SoccerPitch";


interface PitchInterface {
  sport: string;
  currentdataId: string;
  currentPitchId: any;
  grouped: any;
}
const Pitch: React.FC<PitchInterface> = ({ currentdataId, sport, currentPitchId, grouped }) => {
  // console.log('grouped comp', { name, events, sport })

  if (currentdataId || currentPitchId != "") {

    let filterID = currentdataId ?? currentPitchId;
    const currentdata = [] as any;
    const findData = () => {
      grouped.forEach((group: any) => {
        group.events.forEach((ev: any) => {
          if (ev?.info?.id === filterID) {
            currentdata.push(ev)
          }
        })
      })
    }
    findData();
    let data = currentdata?.[0];

    if (sport === "tennis") {
      return (
        <TennisPitch data={data} />
      )
    }
    if (sport === "soccer") {
      return <SoccerPitch data={data} />
    }

  }
  return (
    <div>
      No Match Found
    </div>
  );
};

export default Pitch;
