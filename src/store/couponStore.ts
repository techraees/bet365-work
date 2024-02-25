import { create } from 'zustand'

export interface CouponStateInterface {
    couponState: any,
    setCouponState: (value: any) => void,
}

const useCouponStore = create<CouponStateInterface>((set) => ({
    couponState: {},
    setCouponState: (value: any) => set((state) => ({ couponState: value }))
}));

export default useCouponStore;