import { create } from 'zustand'

export interface PitchIdState {
    currentPitchId: string,
    setCurrentPitchId: (value: string) => void,
}

const usePitchIdStore = create<PitchIdState>((set) => ({
    currentPitchId: "",
    setCurrentPitchId: (value: string) => set((state) => ({ currentPitchId: value })),
}));

export default usePitchIdStore;