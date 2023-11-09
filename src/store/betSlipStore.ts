import { create } from 'zustand'

// Define the type for each selection, for example, if it's just an ID, it could be a number or string:
type SelectionType = any; // Replace `any` with the actual type of a selection, e.g., `number` or a custom type/interface.

export interface BetSlipStore {
    selections: SelectionType[];
    addSelection: (selection: SelectionType) => void;
}

const useBetSlipStore = create<BetSlipStore>((set) => ({
    selections: [],
    addSelection: (selection: SelectionType) => set((state) => ({
        selections: [...state.selections, selection]
    })),
}));

export default useBetSlipStore;