import { Song } from "lib/types/song";
import { changePlayState, getCurrentlyPlaying } from "lib/utils/spotify.util";
import { create } from "zustand";

interface PlayerState {
  isPlaying: boolean;
  item: Song | null;
  primaryColor: string;
}

interface PlayerActions {
  setItem: (item: Song) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setPrimaryColor: (color: string) => void;
  play: (token: string) => void;
  pause: (token: string) => void;
}

export const usePlayerStore = create<PlayerState & PlayerActions>((set) => ({
  isPlaying: false,
  item: null,
  counter: 0,
  primaryColor: "rgb(255, 255, 255)",

  // song
  setItem: (item) => set(() => ({ item: item })),

  // play state
  setIsPlaying: (isPlaying) => set(() => ({ isPlaying })),

  // primary color
  setPrimaryColor: (color) => set(() => ({ primaryColor: color })),

  play: (token) =>
    set(() => {
      changePlayState(token, true);

      return { isPlaying: true };
    }),

  pause: (token) =>
    set(() => {
      changePlayState(token, false);

      return { isPlaying: false };
    }),
}));
