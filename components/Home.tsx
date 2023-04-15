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
import { AnimatePresence, motion } from "framer-motion";

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

      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`${
                searchOpen ? "backdrop-blur-lg" : "backdrop-blur-0"
              } w-full h-screen z-30 fixed opacity-0 bg-black bg-opacity-20 transform-gpu transition-all duration-500`}
            >
              <SearchBar onClose={() => setSearchOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
