import Nats from "@/components/Nats";
import { getSportsOdds } from "@/api";
import SportsHeader from "./components/SportsHeader";
import requireSession from "@/lib/request-session";


const Home = async ({ params }: any) => {
  const session = await requireSession();
  return <SportsHeader />;
};

export default Home;
