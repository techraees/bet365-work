//@ts-ignore
import create from 'zustand';
import { persist } from 'zustand/middleware';

// Define the type for each selection
type SelectionType = any; // Replace `any` with the actual type of a selection

interface SystemDetails {
  single_stake: string;
  // Add other system details properties here
}

interface SystemType {
  [key: string]: SystemDetails;
}

interface BetSlipStore {
  type: string;
  selections: SelectionType[];
  system: SystemType;
  addSelection: (selection: SelectionType) => void;
  removeSelection: (eventId: string, oddId: string) => void;
  updateStakeValue: (eventId: string, oddId: string, participantId: number, newStakeValue: number) => void;
  setType: (newType: string) => void;
  addSystem: (systemId: string, systemDetails: SystemDetails) => void;
  removeSystem: (systemId: string) => void;
  clearSystem: () => void;
  clearSelections: () => void;
}

// @ts-ignore
const useBetSlipStore = create<BetSlipStore>(persist(
  (set) => ({
    type: "",
    selections: [],
    system: {},
    addSelection: (selection) =>
      set((state) => {
        // Check if 'suspend' attribute of the selection is not "1"
        if (selection.suspend !== "1" && selection.event_name  && selection.odd_name && selection.value && selection.value !== null) {
          return {
            selections: [...state.selections, selection],
          };
        }

        // If 'suspend' is "1", return the current state without adding the selection
        return state;
      }),
    removeSelection: (eventId, oddId) =>
      set((state) => ({
        selections: state.selections.filter(
          (sel) => !(sel.event_id === eventId && sel.odd_id === oddId)
        ),
      })),
    updateStakeValue: (eventId, oddId, participantId, newStakeValue) =>
      set((state) => ({
        selections: state.selections.map((sel) =>
          (sel.event_id === eventId && sel.odd_id === oddId && sel.participant_id === participantId) 
            ? { ...sel, stake: newStakeValue } 
            : sel
        ),
      })),
    setType: (newType) =>
      set(() => ({
        type: newType,
      })),
    addSystem: (systemId, systemDetails) =>
      set((state) => ({
        system: { ...state.system, [systemId]: systemDetails },
      })),
    removeSystem: (systemId) => 
      set((state) => {
        const newSystem = { ...state.system };
        delete newSystem[systemId];
        return { system: newSystem };
      }),
    clearSystem: () =>
      set(() => ({
        system: {}
      })),
    clearSelections: () =>
      set(() => ({
        selections: []
      })),
  }),
  {
    name: "bet-slip-store", // unique name for the store in local storage
    getStorage: () => localStorage, // specifies localStorage as the storage medium
  }
));

export default useBetSlipStore;
