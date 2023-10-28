import Nats from "@/components/Nats";
import { getPregameLeagues, getPregameNames, getPregame, getPregameSoccer, getPregamesLeaguesGroupedByCountry, } from "@/api";
import NatsSoccer from "../components/soccer/NatsSoccer";
import NavigationPanel from "../components/Navigation/navigationpanel";

import NatsBoxing from "../components/boxing/NatsBoxing";
import NatsBasketball from "../components/basketball/Nats";
import NatsEsport from "../components/esports/Nats";
import NatsTableTennis from "../components/tableTennis/NatsTableTennis";
import NatsBaseball from "../components/baseball/Nats";
import NatsCricket from "../components/cricket/Nats";
import NatsDarts from "../components/darts/Nats";
import NatsHockey from "../components/hockey/Nats";
import NatsHandball from "../components/handball/Nats";
import NatsVolleyball from "../components/volleyball/Nats";
import NatsTennis from "../components/tennis/Nats";

import requireSession from "@/lib/request-session";

export const dynamic = "force-dynamic";

const Home = async ({ params }: any) => {
    const session = await requireSession();
    let { sport } = params;
    console.log("+++++++++++++++", sport);
    if (sport[0] === 'soccer') {
        let leagueSelectedGames = [] as any;
        if (sport[1] && sport[1] == "leagues") {
            let leaguesByCountry = getPregamesLeaguesGroupedByCountry();
            leagueSelectedGames = await getPregameSoccer(decodeURIComponent(sport[2]));
            console.log(sport[2])
            return (
                <NatsSoccer odds={[]} sport={sport} leaguesByCountry={leaguesByCountry} leagueSelectedGames={leagueSelectedGames} />
            )
        }

        let leaguesByCountry = getPregamesLeaguesGroupedByCountry();
        let getLeagues = await getPregameLeagues(sport[0]);
        console.log({ getLeagues })
        const getLeagues10 = getLeagues?.slice(0, 10);
        let promise = getLeagues10?.map(async (league: string) => {
            const leagueData = await getPregameSoccer(league);
            const modifiedData = leagueData?.map((item: any) => {
                return {
                    ...item,
                    league: league
                }
            })
            return modifiedData
        })
        const odds = await Promise.all(promise);

        return (
            <NatsSoccer odds={odds} sport={sport} leaguesByCountry={leaguesByCountry} getLeagues={getLeagues} leagueSelectedGames={leagueSelectedGames} />
        )
    }
    if (sport[0] === 'baseball') {
        let getLeagues = await getPregameLeagues(sport[0]);
        let promise = getLeagues?.map(async (league: string) => {
            const leagueData = await getPregame(sport[0], league);
            const modifiedData = leagueData?.map((item: any) => {
                return {
                    ...item,
                    league: league
                }
            })
            return modifiedData
        })
        const odds = await Promise.all(promise);
        console.log({ odds })

        return (
            <NatsBaseball odds={odds} sport={sport} getLeagues={getLeagues} />
        )
    }
    if (sport[0] === 'cricket') {
        let getLeagues = await getPregameLeagues(sport[0]);
        let odds = await getPregameNames();
        return (
            <NatsCricket odds={odds} sport={sport} getLeagues={getLeagues} />
        )
    }
    if (sport[0] === 'darts') {
        let getLeagues = await getPregameLeagues(sport[0]);
        let odds = await getPregameNames();
        return (
            <NatsDarts odds={odds} sport={sport} getLeagues={getLeagues} />
        )
    }
    if (sport[0] === 'boxing') {
        let getLeagues = await getPregameLeagues(sport[0]);
        let odds = await getPregameNames();
        return (
            <NatsBoxing odds={odds} sport={sport} getLeagues={getLeagues} />
        )
    }
    if (sport[0] === 'basketball') {
        let getLeagues = await getPregameLeagues(sport[0]);
        let promise = getLeagues?.map(async (league: string) => {
            const leagueData = await getPregame(sport[0], league);
            const modifiedData = leagueData?.map((item: any) => {
                return {
                    ...item,
                    league: league
                }
            })
            return modifiedData
        })
        const odds = await Promise.all(promise);
        console.log({ odds })
        return (
            <NatsBasketball odds={odds} sport={sport} getLeagues={getLeagues} />
        )
    }
    if (sport[0] === 'esports') {
        let getLeagues = await getPregameLeagues(sport[0]);
        let promise = getLeagues?.map(async (league: string) => {
            const leagueData = await getPregame(sport[0], league);
            const modifiedData = leagueData?.map((item: any) => {
                return {
                    ...item,
                    league: league
                }
            })
            return modifiedData
        })
        const odds = await Promise.all(promise);
        console.log({ getLeagues, odds })
        return (
            <NatsEsport odds={odds} sport={sport} getLeagues={getLeagues} />
        )
    }
    if (sport[0] === 'table-tennis') {
        let getLeagues = await getPregameLeagues(sport[0]);
        let odds = await getPregameNames();
        return (
            <NatsTableTennis odds={odds} sport={sport} getLeagues={getLeagues} />
        )
    }
    if (sport[0] === 'ice-hockey') {
        let getLeagues = await getPregameLeagues(sport[0]);
        let odds = await getPregameNames();
        return (
            <NatsHockey odds={odds} sport={sport} getLeagues={getLeagues} />
        )
    }
    if (sport[0] === 'handball') {
        let getLeagues = await getPregameLeagues(sport[0]);
        let odds = await getPregameNames();
        return (
            <NatsHandball odds={odds} sport={sport} getLeagues={getLeagues} />
        )
    }
    if (sport[0] === 'tennis') {
        let getLeagues = await getPregameLeagues(sport[0]);
        let promise = getLeagues?.map(async (league: string) => {
            const leagueData = await getPregame(sport[0], league);
            const modifiedData = leagueData?.map((item: any) => {
                return {
                    ...item,
                    league: league
                }
            })
            return modifiedData
        })
        const odds = await Promise.all(promise);
        console.log({ odds })
        return (
            <NatsTennis odds={odds} sport={sport} getLeagues={getLeagues} />
        )
    }
    if (sport[0] === 'volleyball') {
        let getLeagues = await getPregameLeagues(sport[0]);
        let promise = getLeagues?.map(async (league: string) => {
            const leagueData = await getPregame(sport[0], league);
            const modifiedData = leagueData?.map((item: any) => {
                return {
                    ...item,
                    league: league
                }
            })
            return modifiedData
        })
        const odds = await Promise.all(promise);
        console.log({ odds })
        return (
            <NatsVolleyball odds={odds} sport={sport} getLeagues={getLeagues} />
        )
    }
    return (<div className="flex h-[calc(100vh_-_105px)] max-w-[1450px] mx-auto">
        <div className="w-[255px] hidden md:flex overflow-auto h-[100%]">
            <NavigationPanel />
        </div>
        <div className="flex flex-col flex-1 bg-[#282828] overflow-auto h-[100%]">

        </div>

    </div>)


};

export default Home;