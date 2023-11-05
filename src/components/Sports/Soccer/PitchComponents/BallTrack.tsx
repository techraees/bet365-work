import React from "react"
import { FIELD_WIDTH, FIELD_HEIGHT } from "../constants";
import AnimateLine from "./AnimateLine";

function getPosFromString(pos: string) {
    let ballPos = pos.split(",");
    return ballPos ? { x: Number(ballPos[0]) * FIELD_WIDTH, y: Number(ballPos[1]) * FIELD_HEIGHT } : null;
}

const trackOpacities = [0.19, 0.36, 0.52, 0.68, 0.84];

const BallTrack: React.FC<any> = ({ track, animate }) => {
    if (!track || track.length < 2)
        return <></>;
    let i, content = [];
    for (i = 0; i < track.length - 2; ++i) {
        let prevPos = getPosFromString(track[i]);
        let curPos = getPosFromString(track[i + 1]);
        content.push(
            <>
                <circle xmlns="http://www.w3.org/2000/svg" r="3" cx={prevPos?.x} cy={prevPos?.y} fill="#a0e06c" opacity={trackOpacities[i]} />
                <line xmlns="http://www.w3.org/2000/svg" x1={prevPos?.x} y1={prevPos?.y} x2={curPos?.x} y2={curPos?.y} stroke="#a0e06c" strokeWidth="1" opacity={trackOpacities[i + 1]} />
            </>
        )
    }
    let prevPos = getPosFromString(track[i]);
    let curPos = getPosFromString(track[i + 1]);
    content.push(<circle xmlns="http://www.w3.org/2000/svg" r="3" cx={prevPos?.x} cy={prevPos?.y} fill="#a0e06c" opacity="1" />);
    return (
        <>
            {content}
            {animate ? <AnimateLine from={getPosFromString(track[i])} to={getPosFromString(track[i + 1])} />
                : <line xmlns="http://www.w3.org/2000/svg" x1={prevPos?.x} y1={prevPos?.y} x2={curPos?.x} y2={curPos?.y} stroke="#a0e06c" strokeWidth="1" opacity="1" />}
        </>
    )
}

export default BallTrack;