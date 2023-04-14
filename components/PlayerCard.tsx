import { usePlayerStore } from "lib/stores/usePlayerStore";
import React, { useEffect } from "react";
import ColorThief from "colorthief";
import MusicControls from "./MusicControls";
import { motion, useAnimation } from "framer-motion";

type Props = {};

const PlayerCard = (props: Props) => {
  const { item, isPlaying } = usePlayerStore((state) => ({
    item: state.item,
    isPlaying: state.isPlaying,
  }));

  const { primaryColor, setPrimaryColor } = usePlayerStore((state) => ({
    primaryColor: state.primaryColor,
    setPrimaryColor: state.setPrimaryColor,
  }));

  const calculateColor = (event: any) => {
    const colorThief = new ColorThief();
    const colors = colorThief.getColor(event.target);

    setPrimaryColor(`rgb(${colors.join(",")})`);
  };

  if (item) {
    return (
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 overflow-hidden transform-gpu 
        transition-all duration-1000
        ${isPlaying ? "grayscale-0" : "grayscale"}`}
      >
        <div
          className="w-80 h-[500px] bg-white bg-opacity-10 backdrop-blur-2xl border border-white border-opacity-10
                        shadow-2xl overflow-hidden transform-gpu rounded-xl flex flex-col"
        >
          <div className="relative">
            <img
              className="w-full aspect-square rounded-[28px] z-10 p-4 drop-shadow-sm"
              src={`${item?.album.images[0].url}`}
              onLoad={calculateColor}
              crossOrigin="anonymous"
            />
            <img
              className="absolute top-0 w-full aspect-square -z-10 blur-2xl brightness-200 "
              src={`${item?.album.images[0].url}`}
            />
          </div>

          <div className="px-4 mb-auto">
            <div className="text-lg opacity-90">{item.name}</div>
            <div
              className="text-sm brightness-200 drop-shadow-md"
              style={{ color: primaryColor }}
            >
              {item.artists[0].name}
            </div>
          </div>

          <div className="w-full h-16">
            <MusicControls />
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default PlayerCard;
