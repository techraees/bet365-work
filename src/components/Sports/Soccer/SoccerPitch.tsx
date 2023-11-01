import React from "react"

interface SoccerPitchInterface {
    data:any
}

const SoccerPitch: React.FC<SoccerPitchInterface> = ({data}) => {
  console.log("+++++", data);
  return <div>{data?.info.name}</div>
}


export default SoccerPitch