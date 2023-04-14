import { usePlayerStore } from "lib/stores/usePlayerStore";
import React, { useEffect } from "react";
import { motion, useAnimation, useTransform } from "framer-motion";

type Props = {};

const BackgroundArtwork = (props: Props) => {
  const item = usePlayerStore((state) => state.item);
  const isPlaying = usePlayerStore((state) => state.isPlaying);

  const controls = useAnimation();

  useEffect(() => {
    if (isPlaying) {
      controls.start(
        {
          rotate: [0, 360],
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
      className={`fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-0 blur-[100px] transform-gpu 
      transition-all duration-1000 ${isPlaying ? "grayscale-0" : "grayscale"} `}
    >
      {item && (
        <>
          <motion.div animate={controls}>
            <img
              className={`w-[500px] h-[500px] rounded-3xl`}
              src={`${item?.album.images[0].url}`}
            />
          </motion.div>
        </>
      )}
    </div>
  );
};

export default BackgroundArtwork;
