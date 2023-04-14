import axios from "axios";
import { Song } from "lib/types/song";

export const getPlayerState = async (token: string) => {
  return await axios.get("https://api.spotify.com/v1/me/player", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const getCurrentlyPlaying = async (token: string) => {
  return await axios.get(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const changePlayState = async (token: string, state: boolean) => {
  return await axios.put(
    `https://api.spotify.com/v1/me/player/${state ? "play" : "pause"}`,
    {},
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const nextSong = async (token: string) => {
  return await axios.post(
    `https://api.spotify.com/v1/me/player/next`,
    {},
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const previousSong = async (token: string) => {
  return await axios.post(
    `https://api.spotify.com/v1/me/player/previous`,
    {},
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
};

export const searchSong = async (token: string, query: string) => {
  return (
    await axios.get(
      `https://api.spotify.com/v1/search`,

      {
        headers: {
          Authorization: "Bearer " + token,
        },

        params: {
          q: query,
          type: "track",
          limit: 5,
        },
      }
    )
  ).data?.tracks?.items as Song[];
};
