import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { usePlayerStore } from "../stores/usePlayerStore";
import { getCurrentlyPlaying, getPlayerState } from "../utils/spotify.util";
import { shallow } from "zustand/shallow";
import PlayerCard from "./PlayerCard";
import BackgroundArtwork from "./BackgroundArtwork";

type Props = {};

function Home({}: Props) {
  const { data: session } = useSession();

  const setItem = usePlayerStore((state) => state.setItem);
  const setIsPlaying = usePlayerStore((state) => state.setIsPlaying);

  const userEmail = session?.user?.email;

  // const test = usePlayer(session?.user?.accessToken as string);

  // useEffect(() => {
  //   if (session?.user?.accessToken) {
  //     getCurrentlyPlaying(session?.user.accessToken).then(({ data }) => {
  //       console.log("Playi8ng: ", data);
  //       setItem(data?.item);
  //       setIsPlaying(data?.is_playing);
  //     });
  //   }
  // }, [session]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (session?.user?.accessToken) {
        await getCurrentlyPlaying(session?.user.accessToken).then(
          ({ data }) => {
            setItem(data?.item);
            setIsPlaying(data?.is_playing);
          }
        );
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* <p>Signed in as {userEmail}</p>
      <p>{session?.user?.accessToken}</p>
      <br />
      Playing: {item?.name}
      <button onClick={() => signOut()}>Sign out</button> */}
      <button onClick={() => signOut()}>Sign out</button>

      <BackgroundArtwork />

      <PlayerCard />
    </div>
  );
}

export default Home;
