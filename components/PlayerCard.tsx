import { usePlayerStore } from "lib/stores/usePlayerStore";

import { motion } from "framer-motion";
import { ArtworkState } from "lib/types/meta";
import { TiWaves } from "react-icons/ti";
import MusicControls from "./MusicControls";
import AlbumArt from "./PlayerCard/AlbumArtContainer";

type Props = {
  artworkState: ArtworkState;
  onWaveClick: () => void;
};

const variants = {
  playing: { scale: 1 },
  paused: { scale: 0.97 },
};

const PlayerCard = (props: Props) => {
  const { item, isPlaying } = usePlayerStore((state) => ({
    item: state.item,
    isPlaying: state.isPlaying,
  }));

  const primaryColor = usePlayerStore((state) => state.primaryColor);

  if (item) {
    return (
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 overflow-hidden transform-gpu 
        transition-all duration-1000
        ${isPlaying ? "grayscale-0" : "grayscale"}`}
      >
        <motion.div
          animate={isPlaying ? "playing" : "paused"}
          transition={{ duration: 1 }}
          variants={variants}
          className="w-80 h-[500px] bg-white bg-opacity-5 backdrop-blur-2xl border border-white border-opacity-10
                        shadow-inner overflow-hidden transform-gpu rounded-xl flex flex-col"
        >
          <div className="relative">
            <AlbumArt
              imageUrl={item.album.images[0].url}
              itemId={item.id}
              artworkState={props.artworkState}
            />
          </div>

          <div className="px-4 mb-auto">
            <div className="text-lg opacity-90 drop-shadow-md flex justify-between items-center">
              <a
                href={item.external_urls.spotify}
                target="_blank"
                rel="noreferrer"
              >
                <div>{item.name}</div>
              </a>
              <div onClick={props.onWaveClick}>
                <TiWaves size={26} className="opacity-60" />
              </div>
            </div>
            <div
              className="text-sm  drop-shadow-sm"
              style={{ color: primaryColor }}
            >
              <a
                href={item.artists[0].external_urls.spotify}
                target="_blank"
                rel="noreferrer"
              >
                {item.artists[0].name}
              </a>
            </div>
          </div>

          <div className="w-full mb-4">
            <MusicControls />
          </div>
        </motion.div>
      </div>
    );
  } else {
    return (
      <>
        <div
          className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 overflow-hidden transform-gpu`}
        >
          <div
            className="w-80 h-[500px] bg-white bg-opacity-5 backdrop-blur-2xl border border-white border-opacity-10
                        flex items-center justify-center text-center text-lg"
          >
            <div className="opacity-50">
              Play a song on <br /> one of your devices....
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default PlayerCard;
