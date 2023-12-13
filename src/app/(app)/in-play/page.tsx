"use client";
import Nats from "@/components/Nats";
import { getSportsOdds } from "@/api";
import SportsHeader from "./components/SportsHeader";
import requireSession from "@/lib/request-session";
import PopupShowing from "@/components/CollectingPopup/ConditionalPopup/PopupShowing";

const Home = () => {
  // const session = await requireSession();
  return (
    <div>
      <SportsHeader />

      <PopupShowing />
    </div>
  );
};

export default Home;
