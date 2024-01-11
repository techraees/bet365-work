import BetslipLoader from "./BetslipLoader/BetslipLoader";
import Scroller from "./Scroller/Scroller";
import TaxMessage from "./TaxMessage";

const BetContent = ({ active, coupons }: { active: string, coupons: any[] }) => {
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
            <Scroller coupons={coupons}/>
        </>
    )
}


export default BetContent