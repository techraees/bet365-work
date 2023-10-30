import React from "react";
import TennisPitch from "../Sports/Tennis/TennisPitch";


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
    // console.log(currentPitchId);
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

    if(sport === "tennis"){
      return (
        <TennisPitch data={data} />
      )
    }

  }
  return (
    <div>
      No Match Found
    </div>
  );
};

export default Pitch;
