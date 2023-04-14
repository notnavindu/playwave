import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { usePlayerStore } from "../stores/usePlayerStore";
import { getCurrentlyPlaying, getPlayerState } from "../utils/spotify.util";
import { shallow } from "zustand/shallow";
import PlayerCard from "./PlayerCard";
import BackgroundArtwork from "./BackgroundArtwork";
import SearchBar from "./SearchBar/SearchBar";

type Props = {};

function Home({}: Props) {
  const { data: session } = useSession();

  const setItem = usePlayerStore((state) => state.setItem);
  const setIsPlaying = usePlayerStore((state) => state.setIsPlaying);

  const userEmail = session?.user?.email;

  const [searchOpen, setSearchOpen] = useState(false);

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
      <div className="sticky w-full flex justify-between">
        <div>Spotify Logo</div>
        <div onClick={() => setSearchOpen(!searchOpen)}>Search</div>
      </div>

      {/* <p>Signed in as {userEmail}</p>
      <p>{session?.user?.accessToken}</p>
      <br />
      Playing: {item?.name}
      <button onClick={() => signOut()}>Sign out</button> */}
      <button onClick={() => signOut()}>Sign out</button>

      {searchOpen && <SearchBar />}

      <div
        className={`${
          searchOpen ? "backdrop-blur-lg" : "backdrop-blur-0"
        } w-full h-screen z-30 fixed bg-black bg-opacity-10 transform-gpu transition-all duration-1000`}
      ></div>

      <BackgroundArtwork />
      <PlayerCard />
    </div>
  );
}

export default Home;
