import { Song } from "lib/interfaces/song";
import { create } from "zustand";

interface PlayerState {
  is_playing: boolean;
  item: Song | null;
}

interface PlayerActions {
  setItem: (item: Song) => void;
}

export const usePlayerStore = create<PlayerState & PlayerActions>((set) => ({
  is_playing: false,
  item: null,
  counter: 0,
  setItem: (item) => set(() => ({ item: item })),
  play: () => set((state) => ({ is_playing: true })),
}));
