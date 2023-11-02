import React from "react"
import { FIELD_WIDTH, FIELD_HEIGHT } from "../constants";
import AnimateLine from "./AnimateLine";

function getPosFromString(pos: string) {
    let ballPos = pos.split(",");
    return ballPos ? { x: Number(ballPos[0]) * FIELD_WIDTH, y: Number(ballPos[1]) * FIELD_HEIGHT } : null;
}

const BallTrack: React.FC<any> = ({ track }) => {
    if (!track || track.length < 2)
        return <></>;
    let content = [], i, prevPos = getPosFromString(track[0]), curPos = getPosFromString(track[1]);
    for (i = 1; i < track.length - 1;) {
        content.push(
            <line xmlns="http://www.w3.org/2000/svg" x1={prevPos?.x} y1={prevPos?.y} x2={curPos?.x} y2={curPos?.y} stroke="#a0e06c" strokeWidth="1" opacity="1" />
        )
        prevPos = Object.assign({}, curPos);
        curPos = getPosFromString(track[++i]);
    }
    return (
        <>
            {/* {content} */}
            <AnimateLine from={prevPos} to={curPos} />
        </>
    )
}

export default BallTrack;