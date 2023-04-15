import { Song } from "lib/types/song";
import { searchSong } from "lib/utils/spotify.util";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, stagger } from "framer-motion";
import { useAnimate } from "framer-motion";

type Props = {};

function SearchBar({}: Props) {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);
  const [scope, animate] = useAnimate();

  const handleKeyUp = async (e: any) => {
    if (e.key == "Enter") {
      const results = await searchSong(session?.user.accessToken!, searchQuery);

      setResults(results);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    if (results.length > 0) {
      animate("li", { y: [-50, 0], opacity: 1 }, { delay: stagger(0.05) });
    }
  }, [results]);

  return (
    <>
      <div className="w-full h-auto top-48 fixed z-40 flex items-center justify-center flex-col p-2">
        <input
          onKeyUp={handleKeyUp}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ maxWidth: "600px" }}
          value={searchQuery}
          placeholder="Search for a song..."
          className="w-full h-16 bg-white bg-opacity-5 border-2 border-white shadow-2xl border-opacity-5 backdrop-blur-xl  rounded-md transform-gpu
                        outline-none px-3 text-white/75 backdrop-brightness-75"
        />

        <ul
          className="w-full mt-4 flex flex-col items-center justify-center gap-1"
          ref={scope}
        >
          {results &&
            results.map((track) => (
              <li
                key={track.id}
                style={{ maxWidth: "600px" }}
                className="w-full py-2 bg-white/2 border-2 border-white shadow-2xl border-opacity-5 backdrop-blur-xl  rounded-md transform-gpu
                        px-3 text-white/75 opacity-0 backdrop-brightness-75 flex items-center gap-4"
              >
                <div>
                  <img src={track.album.images[2].url} />
                </div>

                <div className="flex flex-col justify-center">
                  <div>{track.name}</div>
                  <div className="text-xs opacity-70 mt-1">
                    {track.artists[0].name}
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default SearchBar;
