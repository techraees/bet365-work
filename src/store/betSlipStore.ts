import { create } from "zustand";

// Define the type for each selection, for example, if it's just an ID, it could be a number or string:
type SelectionType = any; // Replace `any` with the actual type of a selection, e.g., `number` or a custom type/interface.

export interface BetSlipStore {
  selections: SelectionType[];
  addSelection: (selection: SelectionType) => void;
  removeSelection: (event_id: string, odd_id:string) => void; 

}

const useBetSlipStore = create<BetSlipStore>((set) => ({
  selections: [
 
    // {
    //   "event_id":"5102941",
    //   "event_name":"Arsenal vs Wolves",
    //   "odd_id":"1",
    //   "odd_name":"Match Winner",
    //   "participant_id":0,
    //   "participant_name":"Home",
    //   "suspend":"0",
    //   "title":"Arsenal",
    //   "value": 1.29
    // },
  ],
  addSelection: (selection: SelectionType) =>
    set((state) => ({
      selections: [...state.selections, selection],
    })),
  removeSelection: (eventId: string, oddId: string) =>
    set((state) => ({
      selections: state.selections.filter(
        selection => !(selection.event_id === eventId && selection.odd_id === oddId)
      ),
    })),
}));

export default useBetSlipStore;

