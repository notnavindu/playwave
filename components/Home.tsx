import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { usePlayerStore } from "../stores/usePlayerStore";
import { getCurrentlyPlaying, getPlayerState } from "../utils/spotify.util";
import { shallow } from "zustand/shallow";
import PlayerCard from "./PlayerCard";
import BackgroundArtwork from "./BackgroundArtwork";
import SearchBar from "./SearchBar/SearchBar";
import { RxExit } from "react-icons/rx";
import { BsSearch } from "react-icons/bs";

type Props = {};

function Home({}: Props) {
  const { data: session } = useSession();

  const setItem = usePlayerStore((state) => state.setItem);
  const setIsPlaying = usePlayerStore((state) => state.setIsPlaying);

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
        <div className="p-5">Playwave</div>
        <div className="p-5" onClick={() => setSearchOpen(!searchOpen)}>
          <BsSearch />
        </div>
      </div>

      {/* <p>Signed in as {userEmail}</p>
      <p>{session?.user?.accessToken}</p>
      <br />
      Playing: {item?.name}
      <button onClick={() => signOut()}>Sign out</button> */}

      {searchOpen && <SearchBar />}

      {/* TODO: Use framer to animate here */}
      {searchOpen && (
        <div
          className={`${
            searchOpen ? "backdrop-blur-lg" : "backdrop-blur-0"
          } w-full h-screen z-30 fixed bg-black bg-opacity-10 transform-gpu transition-all duration-500`}
        ></div>
      )}

      <BackgroundArtwork />
      <PlayerCard />

      <div className="fixed w-full flex justify-between bottom-0">
        <div></div>
        <div>
          <button className="p-5" onClick={() => signOut()}>
            <RxExit />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
