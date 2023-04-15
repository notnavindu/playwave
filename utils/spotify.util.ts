import { Song } from "lib/types/song";
import { api } from "./api.util";

export const getPlayerState = async (token: string) => {
  return await api(token).get("/me/player");
};

export const getCurrentlyPlaying = async (token: string) => {
  return await api(token).get("/me/player/currently-playing");
};

export const changePlayState = async (token: string, state: boolean) => {
  return await api(token).put(`/me/player/${state ? "play" : "pause"}`);
};

export const nextSong = async (token: string) => {
  return await api(token).post(`/me/player/next`);
};

export const switchSong = async (token: string, songId: string) => {
  return await api(token).put(`/me/player/play`, { uris: [songId] });
};

export const previousSong = async (token: string) => {
  return await api(token).post(`/me/player/previous`);
};

export const searchSong = async (token: string, query: string) => {
  return (
    await api(token).get(`/search`, {
      params: {
        q: query,
        type: "track",
        limit: 5,
      },
    })
  ).data?.tracks?.items as Song[];
};
