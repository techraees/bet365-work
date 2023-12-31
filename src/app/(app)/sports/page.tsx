"use client";
import { useEffect, useState } from "react";
import PopUps from "@/components/CollectingPopup/CollectingPopup";
import NavigationPanel, {
  TopBarNav,
} from "./components/Navigation/navigationpanel";
import BannerSlider from "./components/banner-slider";
import SportsContent from "./components/sports-content";
import { getSoccerFeaturedMatches } from "@/api";

import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

export const dynamic = "force-dynamic";

const Home = ({ params }: any) => {
  const [pregameodds, setPregameodds] = useState([]);

  const { data: session } = useSession();

  console.log({dl:session})
  const router = useRouter();

  useEffect(() => {
    // If there is no session, redirect to the login page
    if (!session) {
      router.push('/auth/signin'); // Replace '/login' with your login route
    }
  }, [session, router]);


  useEffect(() => {
    const fetchFeaturedMatches = async () => {
      try {
        const matches = await getSoccerFeaturedMatches();
        setPregameodds(matches); // Update the state with fetched data
      } catch (error) {
        console.error("Error fetching featured matches:", error);
      }
    };

    fetchFeaturedMatches(); // Call the async function
  }, []); // Empty dependency array for running only once on mount

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
        <SportsContent odds={pregameodds} />
        {/* <UserBet /> */}
        <PopUps />
      </div>
    </div>
  );
};

export default Home;
