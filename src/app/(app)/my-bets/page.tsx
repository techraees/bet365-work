import requireSession from "@/lib/request-session";
import Bets from "./components/bets";


const Home = async () => {
    const session = await requireSession();
    
    return (
        <Bets />
    )
}

export default Home;