import axios from "axios";

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
