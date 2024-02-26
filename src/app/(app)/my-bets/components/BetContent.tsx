import { getLiveOddsEvents } from "@/api";
import BetslipLoader from "./BetslipLoader/BetslipLoader";
import Scroller from "./Scroller/Scroller";
import TaxMessage from "./TaxMessage";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useCouponStore from "@/store/couponStore";

//'Cash Out', 'Live Now', 'Unsettled', 'Settled', 'All'

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
    const {couponState, setCouponState} = useCouponStore(state => state);

    useEffect(() => {
        const filterCoupons = async () => {
            let filtered = checkedCoupons;
            switch(active) {
                case 'Live Now':
                    filtered = checkedCoupons.filter(coupon => coupon.isLive && coupon.isLive == true);
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
            console.log('---filtered---', filtered);
            setFilteredCoupons(filtered);
        }
        filterCoupons();
    }, [active, JSON.stringify(checkedCoupons)]);

    useEffect(() => {
        setCheckedCoupons(coupons);
        const token = userdata?.user?.token || "";
        const setLive = async () => {
            const checkLive = async () => {
                const newCoupons = [];
                let newCouponState = {};
                for(const coupon of coupons) {
                    let newCoupon = coupon;
                    if(couponState[coupon._id]) {
                        newCoupon.isLive = couponState[coupon._id];
                    } else {
                        const res = await getLiveOddsEvents(
                            coupon.selections.map((selection: any) => selection.event_id),
                            token
                        );
                        const liveEvents = await res.json();
                        if (liveEvents && !liveEvents.message) 
                            newCoupon.isLive = true;
                        else
                            newCoupon.isLive = false;
                    }
                    newCouponState = { ...newCouponState, [newCoupon._id]: newCoupon.isLive };
                    newCoupons.push(newCoupon);
                }
                setCouponState(newCouponState);
                console.log('-----coupon state upated-----');
                return newCoupons;
            }
            const checkedCoupon = await checkLive();
            setCheckedCoupons(checkedCoupon);
        }
        setLive();
    }, [JSON.stringify(coupons)]);

    return (
        <>
            <TaxMessage message={'All Cash Out and To Return values are inclusive of deductions'} />
            <Scroller coupons={filteredCoupons}/>
        </>
    )
}


export default BetContent