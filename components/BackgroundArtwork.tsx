import { motion, useAnimation } from "framer-motion";
import { usePlayerStore } from "lib/stores/usePlayerStore";
import { useEffect } from "react";

type Props = {};

const BackgroundArtwork = (props: Props) => {
  const item = usePlayerStore((state) => state.item);
  const isPlaying = usePlayerStore((state) => state.isPlaying);

  const controls = useAnimation();

  useEffect(() => {
    if (isPlaying) {
      controls.start(
        {
          rotate: [null, 360],
        },
        {
          duration: 12,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        }
      );
    } else {
      controls.stop();
    }
  }, [isPlaying]);

  return (
    <div
      className={`w-full h-screen  flex items-center justify-center fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-0 
      blur-[100px] transform-gpu transition-all duration-1000  ${
        isPlaying ? "grayscale-0" : "grayscale"
      } `}
    >
      {item && (
        <motion.div className=" w-fit" animate={controls}>
          <img
            className={`w-[400px] aspect-square rounded-[2rem]`}
            src={`${item?.album.images[2].url}`}
          />
        </motion.div>
      )}
    </div>
  );
};

export default BackgroundArtwork;
