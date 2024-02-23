import { getLiveOddsEvents } from "@/api";
import BetslipLoader from "./BetslipLoader/BetslipLoader";
import Scroller from "./Scroller/Scroller";
import TaxMessage from "./TaxMessage";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

//'Cash Out', 'Live Now', 'Unsettled', 'Settled', 'All'

const liveFiltered = async (coupons: any[], token: string) => {
    const newCoupons = [];
    for(const coupon of coupons) {
        let newCoupon = coupon;
        const selections = [];
        for(const selection of coupon.selections) {
            const res = await getLiveOddsEvents(
                [selection.event_id],
                token
            )
            const liveEvents = await res.json();
            if (liveEvents && !liveEvents.message)
                selections.push(selection);
        }
        newCoupon.selections = selections;
        if(selections.length > 0)
            newCoupons.push(newCoupon);
    }
    return newCoupons;
}

const checkLive = async (coupons: any[], token: string) => {
    const newCoupons = [];
    for(const coupon of coupons) {
        let newCoupon = coupon;
        const selections = [];
        for(const selection of coupon.selections) {
            const res = await getLiveOddsEvents(
                [selection.event_id],
                token
            )
            const liveEvents = await res.json();
            if (liveEvents && !liveEvents.message)
                selections.push(selection);
        }
        newCoupon.isLive = selections.length > 0;
        newCoupons.push(newCoupon);
    }
    return newCoupons;
}

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
    const { data: session } = useSession();
    const userdata = session as any;
    const [filteredCoupons, setFilteredCoupons] = useState<any[]>([]);
    const [checkedCoupons, setCheckedCoupons] = useState<any[]>([]);

    useEffect(() => {
        const filterCoupons = async () => {
            const token = userdata?.user?.token || "";
            let filtered = checkedCoupons;
            switch(active) {
                case 'Live Now':
                    filtered = await liveFiltered(checkedCoupons.filter(coupon => coupon.isLive == true), token);
                break;
                case 'Unsettled':
                    filtered = checkedCoupons.filter(coupon => coupon.status == "Open");
                break;
                case 'Settled':
                    filtered = checkedCoupons.filter(coupon => coupon.status == "Settled");
                break;
                case 'Cash Out':
                    filtered = checkedCoupons.filter(coupon => coupon.status == "Cash Out");
                break;
                default:
                    filtered = checkedCoupons;
                break;
            }
            setFilteredCoupons(filtered);
        }
        filterCoupons();
    }, [active, JSON.stringify(checkedCoupons)]);

    useEffect(() => {
        const token = userdata?.user?.token || "";
        const setLive = async (couponList: any[]) => {
            const checkedCoupon = await checkLive(couponList, token);
            setCheckedCoupons(checkedCoupon);
        }
        setLive(coupons);
    }, [JSON.stringify(coupons)]);

    return (
        <>
            <TaxMessage message={'All Cash Out and To Return values are inclusive of deductions'} />
            <Scroller coupons={filteredCoupons}/>
        </>
    )
}


export default BetContent