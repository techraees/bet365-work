import Nats from "@/components/Nats";
import { getSportsOdds } from "@/api";
import SportsHeader from "./components/SportsHeader";

const Home = async ({ params }: any) => {
  return <SportsHeader />;
};

export default Home;
