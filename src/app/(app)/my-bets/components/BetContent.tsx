import BetslipLoader from "./BetslipLoader/BetslipLoader";
import Scroller from "./Scroller/Scroller";
import TaxMessage from "./TaxMessage";

type Participant = {
    team: string,
    event: string,
    odds: string,
    participant: string,
    marketDesc: string,
    matchName: string,
    score: string,
    playTime: string
}

type BetItemData = {
    stake: string,
    betInfoText: string,
    betInfoLabel: string,
    multi: string,
    participants: Participant[]
}

const betData: BetItemData[] = [
    {
        stake: "€0.10",
        betInfoText: "€0.26",
        betInfoLabel: "To Return",
        multi: "Double",
        participants: [
            {
                participant: "Italy (Arthur) Esports",
                team: "Germany (Cleo) Esports",
                event: "Dangerous Attack",
                odds: "1.40",
                marketDesc: "Fulltime Result",
                matchName: "Italy (Arthur) Esports v Germany (Cleo) Esports",
                score: "1-0",
                playTime: "04:12"
            },
            {
                participant: "England (Obelix) Esports or Draw",
                team: "England (Obelix) Esports",
                event: "In Possession",
                odds: "1.90",
                marketDesc: "Double Chance",
                matchName: "Netherlands (Alexis) Esports v England (Obelix) Esports",
                score: "0-0",
                playTime: "04:37"
            }
        ]
    },
    {
        stake: "€0.10",
        betInfoText: "€0.19",
        betInfoLabel: "To Return",
        multi: "Single",
        participants: [
            {
                participant: "England (Obelix) Esports or Draw",
                team: "England (Obelix) Esports",
                event: "In Possession",
                odds: "1.90",
                marketDesc: "Double Chance",
                matchName: "Netherlands (Alexis) Esports v England (Obelix) Esports",
                score: "0-0",
                playTime: "04:37"
            }
        ]
    },
    {
        stake: "€0.10",
        betInfoText: "€0.14",
        betInfoLabel: "To Return",
        multi: "Single",
        participants: [
            {
                participant: "Italy (Arthur) Esports",
                team: "Germany (Cleo) Esports",
                event: "Dangerous Attack",
                odds: "1.40",
                marketDesc: "Double Chance",
                matchName: "Italy (Arthur) Esports v Germany (Cleo) Esports",
                score: "1-0",
                playTime: "04:12"
            }
        ]
    }
]

const BetContent = ({ active }: { active: string }) => {
    let description = null;
    let description2 = null;
    if (active === 'Cash Out') {
        description = 'Bets that can be fully or partially cashed out appear here'
    } else if(active === 'Live Now') {
        description = 'Bets that are In-Play will appear here'
    } else if(active === 'Unsettled') {
        description = 'Bets that are unsettled will appear here'
    } else if(active === 'Settled') {
        description = 'Bets that are settled will appear here for 24 hours' 
        description2= 'View older settled bets in your Account History'
    } else if(active === 'All') {
        description = 'Bets appear here for 24 hours' 
        description2= 'Older bets can be viewed in your Account History'
    }
    return (
        <>
        {/*
        <div className="m-4 py-8 px-4 bg-[linear-gradient(to_bottom_right,#303d39,#353535)] rounded">
            <div className="text-sm text-[#ddd] w-full text-center">
                <div className="font-bold mb-3">There are currently no bets to display</div>
                <div className="text-xs ">
                    {description ? description : ''}
                </div>
                <div className="text-xs">
                    {description2 ? description2 : ''}
                </div>
            </div>
        </div>
    */}
            {/* <BetslipLoader /> */}
            <TaxMessage message={'All Cash Out and To Return values are inclusive of deductions'} />
            <Scroller betData={betData}/>
        </>
    )
}


export default BetContent