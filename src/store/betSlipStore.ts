import { create } from "zustand";

// Define the type for each selection, for example, if it's just an ID, it could be a number or string:
type SelectionType = any; // Replace `any` with the actual type of a selection, e.g., `number` or a custom type/interface.

interface SystemDetails {
  // ... Your system details properties ...
  single_stake: string 
}

interface SystemType {
  [key: string]: SystemDetails;
}

export interface BetSlipStore {
  type: String,
  selections: SelectionType[];
  system: SystemType;
  addSelection: (selection: SelectionType) => void;
  removeSelection: (event_id: string, odd_id:string) => void; 
  updateStakeValue: (event_id:string, odd_id:string, participant_id:number, newStakeValue:number) => void;
  setType: (newType:string) => void;
  addSystem: (systemId: string, systemDetails: any) => void; // Replace `any` with the actual system details type
  removeSystem: (systemId: string) => void;
  clearSystem: () => void;
  clearSelections: () => void;
}

const useBetSlipStore = create<BetSlipStore>((set) => ({
  type: "",
  selections: [ ],
  system: {},
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
    updateStakeValue: (event_id: string, odd_id: string, participant_id: number, newStakeValue: number) =>
    set((state) => ({
      selections: state.selections.map(selection => 
        (selection.event_id === event_id && selection.odd_id === odd_id && selection.participant_id === participant_id) 
          ? { ...selection, stake_value: newStakeValue } 
          : selection
      ),
    })),
    setType: (newType: string) =>
      set(() => ({
        type: newType
    })),
    addSystem: (systemId, systemDetails) =>
      set((state) => ({
        system: { ...state.system, [systemId]: systemDetails },
    })),
    removeSystem: (systemId) => 
    set((state) => {
      // console.log('Current system state before deletion:', state.system);
      if (state.system.hasOwnProperty(systemId)) {
        const newSystem = { ...state.system };
        delete newSystem[systemId];
        // console.log(`System with ID ${systemId} removed. New system state:`, newSystem);
        return { system: newSystem };
      } else {
        // console.log(`No system found with ID ${systemId}`);
        return state; // Return the original state if the systemId is not found
      }
  }),
    clearSystem: () =>
      set(() => ({
        system: {} // Reset the system object to an empty object
    })),
    clearSelections: () =>
      set(() => ({
        selections: [] // Reset the system object to an empty object
    })),
}));

export default useBetSlipStore;

