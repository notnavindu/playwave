import axios from "axios";

export const api = (token: string) => {
  return axios.create({
    baseURL: "https://api.spotify.com/v1",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
