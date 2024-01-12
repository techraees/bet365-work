import React from 'react'
import BetPartMiniMatchWrapper from './BetPartMiniMatchWrapper/BetPartMiniMatchWrapper'
import MediaButtonsContainer from './MediaButtonsContainer/MediaButtonsContainer'
import { getTeamMessage as getSoccerMatchMessage } from '@/components/Sports/Soccer/SoccerPitch'
import { getTeamMessage as getTennisMatchMessage } from '@/components/Sports/Tennis/TennisPitch'
import { getTeamMessage as getBasketballMatchMessage } from '@/components/Sports/Tennis/TennisPitch'
import { getTeamMessage as getHockeyMatchMessage } from '@/components/Sports/Hockey/HockeyPitch'
import { getTeamMessage as getVolleyballMatchMessage } from '@/components/Sports/Volleyball/VolleyballPitch'

type Props = {
  event: any
}

export default function BetPartMatchLive({ event}: Props) {
  let matchMessage;
  let teamName;
  console.log("======sport=====", event?.info.sport);
  const sport = event?.info.sport.toLowerCase();
  switch(sport) {
    case "soccer":
      matchMessage = getSoccerMatchMessage(event?.info.state);
      teamName = matchMessage.team == "Home Team" ? event?.team_info?.home?.name : (matchMessage.team == "Away Team" ? event?.team_info?.home?.name : "Global");
      break;
    case "tennis":
      matchMessage = getTennisMatchMessage(event?.info.state);
      console.log(matchMessage);
      teamName = matchMessage.team == "Player 1" ? event?.team_info?.home?.name : (matchMessage.team == "Player 2" ? event?.team_info?.home?.name : "Global");
      teamName = teamName.split("/").slice(-1)[0] ?? "";
      teamName = teamName.split(" ");
      break;
    case "basketball":
      matchMessage = getBasketballMatchMessage(event?.info.state);
      teamName = matchMessage.team == "Home Team" ? event?.team_info?.home?.name : (matchMessage.team == "Away Team" ? event?.team_info?.home?.name : "Global");
      break;
    case "hockey":
      matchMessage = getHockeyMatchMessage(event?.info.state);
      teamName = matchMessage.team == "Home Team" ? event?.team_info?.home?.name : (matchMessage.team == "Away Team" ? event?.team_info?.home?.name : "Global");
      break;
    case "volleyball":
      matchMessage = getVolleyballMatchMessage(event?.info.state);
      teamName = matchMessage.team == "Home Team" ? event?.team_info?.home?.name : (matchMessage.team == "Away Team" ? event?.team_info?.home?.name : "Global");
      break;
  }
  return (
    <div className='justify-between leading-5 h-5 flex pr-[9px]'>
      <BetPartMiniMatchWrapper team={teamName} event={matchMessage?.message ?? ""}/>
      <MediaButtonsContainer />
    </div>
  )
}