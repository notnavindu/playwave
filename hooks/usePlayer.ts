import useSWR from "swr";
import { getPlayerState } from "../utils/spotify.util";
import { usePlayerStore } from "../stores/usePlayerStore";

// depricated
export const usePlayer = (token: string) => {
  const { data, error } = useSWR(`/api/user`, () => getPlayerState(token));
  // const { setItem } = usePlayerStore();

  // if (data?.data.item) {
  //   setItem(data?.data.item);
  // }

  console.log("Stateee", data);

  return {
    user: data ?? {},
    isError: error ?? {},
  };
};
