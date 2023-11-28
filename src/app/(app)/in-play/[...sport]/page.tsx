import Nats from "@/components/Nats";
import { getSportsOdds } from "@/api";
import SportDetailHeader from "../components/SportDetailHeader";
import Esports from "@/components/Sports/Esports/EsportsWrapper";
import requireSession from "@/lib/request-session";
import SportsHeader from "../components/SportsHeader";

const Home = async ({ params }: any) => {
  const session = await requireSession();
  let { sport } = params;

  let odds = await getSportsOdds(sport[0]);
  console.log(sport, "These are the sport of the data");
  // console.log("in-play", sport[0], { odds });
  if (sport[0] === "esports") {
    console.log("calling other odds");
    let soccerodds = await getSportsOdds("esoccer");
    let basketballodds = await getSportsOdds("basketball");
    odds = { ...odds, ...soccerodds, ...basketballodds };
  }

  // console.log({ odds, leagues });

  const NoOddsFound = () => {
    return (
      <>
        <SportsHeader />
        <div className="pt-5 text-white flex items-center">No odds found</div>
      </>
    );
  };

  if (odds === undefined || Object.keys(odds).length === 0) {
    return <NoOddsFound />;
  }

  if (odds?.message) {
    return (
      <div>
        {" "}
        <SportsHeader />
        <div className="pt-5 text-white flex items-center">No odds found</div>
      </div>
    );
  }
  return (
    <Nats
      odds={odds}
      sport={sport[0]}
      subcategory={sport[1]}
      currentdataId={sport[2]}
    />
  );
};

export default Home;
