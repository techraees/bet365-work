import Nats from "@/components/Nats";
import { getSportsOdds, getOddsGroupedByLeauge } from "@/api";
import SportDetailHeader from "../components/SportDetailHeader";
import Esports from "@/components/Sports/Esports/EsportsWrapper";

const Home = async ({ params }: any) => {
  let { sport } = params;

  let odds = await getSportsOdds(sport[0]);
  let leagues = await getOddsGroupedByLeauge(sport[0]);
  console.log('in-play',{leagues})
  if(sport[0] === 'esports'){
    console.log('calling other odds')
    let soccerodds = await getSportsOdds('esoccer');
    let soccerleagues = await getOddsGroupedByLeauge('esoccer');
    let basketballodds = await getSportsOdds('basketball');
    let basketballleagues = await getOddsGroupedByLeauge('basketball');
    odds={...odds, ...soccerodds, ...basketballodds}
    leagues={...leagues, ...soccerleagues, ...basketballleagues}
  }

  // console.log({ odds, leagues });

  const NoOddsFound = () => {
    return <div className="pt-5 text-white flex items-center">No odds found</div>;
  };

  if (odds === undefined || Object.keys(odds).length === 0) {
    return <NoOddsFound/>;
  }

  if (leagues === undefined || Object.keys(leagues).length === 0) {
    return <NoOddsFound/>;
  }

  if (odds?.message) {
    return <div>No odds found</div>;
  }
  return <Nats odds={odds} sport={sport[0]} subcategory={sport[1]} currentdataId={sport[2]} leagues={leagues} />;
};

export default Home;
