import Nats from "@/components/Nats";
import {
  getCoupons,
  getOddsGroupedByLeauge,
  getPregameLeagues,
  getPregameNames,
  getPregameSoccer,
  getPregameSoccerEngland,
  getSportsOdds,
} from "@/api";
import SoccerWrapper from "./components/soccer/Wrapper";
import NavigationPanel, {
  TopBarNav,
} from "./components/Navigation/navigationpanel";
import BannerSlider from "./components/banner-slider";
import SportsContent from "./components/sports-content";

import requireSession from "@/lib/request-session";
import UserBet from "./components/userbet";

export const dynamic = "force-dynamic";

const Home = async ({ params }: any) => {
  const session = await requireSession();

  let pregameodds = [] as any;
  let getLeagues = await getPregameLeagues("soccer");
  if (getLeagues && getLeagues.length > 0) {
    let getLeaguesmodified = getLeagues.slice(0, 10);
    let promise = getLeaguesmodified?.map(async (league: string) => {
      const leagueData = await getPregameSoccer(league);

      const modifiedData = leagueData?.map((item: any) => {
        return {
          ...item,
          league: league,
        };
      });
      return modifiedData;
    });
    pregameodds = await Promise.all(promise);
  }

  let soccerodds = await getSportsOdds("soccer");
  let soccerleagues = await getOddsGroupedByLeauge("soccer");
  let tennisodds = await getSportsOdds("tennis");
  let tennisleagues = await getOddsGroupedByLeauge("tennis");
  let basketballodds = await getSportsOdds("basketball");
  let basketballleagues = await getOddsGroupedByLeauge("basketball");
  let cricketodds = await getSportsOdds("cricket");
  let cricketleagues = await getOddsGroupedByLeauge("cricket");

  const banners = [
    {
      image: "/sportbanner1.jpeg",
      title: "New Customer Offer",
      subtitle: "Get up to $30 in Bet Credits",
      button: "Join Now",
      description: `Returns exclude Bet Credits stake. T&Cs, time limits and exclusions apply`,
    },
    {
      image: "/sportbanner2.jpeg",
      title: "Soccer Early Payout Offer",
      subtitle: `You're a winner if your team goes 2 goals ahead`,
      button: "View Latest Odds",
      description: `Applies to pre-match singles and multiples on the Full Time Result market for selected competitions. Selections in multiples will be marked as won. Bet restrictions and T&Cs apply. New & eligible customers only.`,
    },
    {
      image: "/sportbanner3.jpeg",
      title: "Soccer Accumulator Bonus",
      subtitle: "Get up to 70% more on your winnings",
      button: "View Latest Odds",
      description: `Applies to pre-match accumulators of 2+ selections on selected markets. Bonus percentage is dependent on number of selections.  Bet restrictions and T&Cs apply. New and eligible customers only.`,
    },
    {
      image: "/sportbanner4.jpeg",
      title: "Tennis Accumulator Bonus",
      subtitle: "Get up to 70% more on your winnings ",
      button: "View Latest Odds",
      description: `Applies to pre-match accumulators of 2+ selections on selected markets. Bonus percentage is dependent on number of selections. Bet restrictions and T&Cs apply. New and eligible customers only.`,
    },
    {
      image: "/sportbanner5.jpeg",
      title: "Multi-Sport Accumulator Bonus",
      subtitle: "Get up to 70% more on your winnings",
      button: "View Latest Odds",
      description: `Applies to pre-game accumulators of 2+ selections on selected markets for selected competitions. Bonus percentage is dependent on number of selections. Bet restrictions and T&Cs apply. New & eligible customers only.`,
    },
    {
      image: "/sportbanner6.jpeg",
      title: "Bet Boost",
      subtitle: "Available on a wide range of sports, every day",
      button: "View Latest Odds",
      description: `Bet Boosts are available on selected sports, these are located within the classification and marked with a green arrow. Availability may be withdrawn at the discretion of bet365.`,
    },
  ];
  return (
    <div className="flex h-[calc(100vh_-_105px)] max-w-[1450px] mx-auto">
      <div className="w-[255px] hidden md:flex overflow-auto h-[100%]">
        <NavigationPanel />
      </div>
      <div className="flex flex-col flex-1 bg-[#282828] overflow-auto h-[100%] text-base">
        <TopBarNav />
        <BannerSlider banners={banners} />
        <SportsContent
          odds={pregameodds}
          soccerodds={soccerodds}
          soccerleagues={soccerleagues}
          tennisodds={tennisodds}
          tennisleagues={tennisleagues}
          basketballodds={basketballodds}
          basketballleagues={basketballleagues}
          cricketodds={cricketodds}
          cricketleagues={cricketleagues}
        />
        <UserBet />
      </div>
    </div>
  );
};

export default Home;
