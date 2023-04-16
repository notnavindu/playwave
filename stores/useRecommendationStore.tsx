import { Song } from "lib/types/song";
import { create } from "zustand";

interface State {
  tracks: Song[];
  feature: string;
  value: number;
}

interface Actions {
  setTracks: (tracks: Song[]) => void;
  setFeature: (val: string) => void;
  setValue: (val: number) => void;
  reset: () => void;
}

export const useRecommendationStore = create<State & Actions>((set) => ({
  tracks: [],
  feature: "",
  value: 0,

  setTracks: (tracks) => set(() => ({ tracks: tracks })),
  setFeature: (val) => set(() => ({ feature: val })),
  setValue: (val) => set(() => ({ value: val })),

  reset: () =>
    set(() => ({
      tracks: [],
      feature: "",
      value: 0,
    })),
}));
