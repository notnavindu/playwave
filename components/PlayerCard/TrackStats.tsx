import { usePlayerStore } from "lib/stores/usePlayerStore";
import React from "react";
import ColorThief from "colorthief";
import { AnimatePresence, motion } from "framer-motion";

type Props = {};

const TrackStats = (props: Props) => {
  return (
    <>
      <div className="w-full aspect-square rounded-[28px] z-10 p-4">
        <div className="w-full h-full bg-black/70 rounded-lg p-2 flex flex-col">
          <div className="flex flex-col">
            <span className="text-xs">Tempo</span>
            <span>234BPM</span>
          </div>

          <div className=" w-full flex-grow relative">
            <div className="border-2 border-red-500 absolute w-16 h-16 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-[5.8rem]"></div>
            <div className="border-2 border-blue-500 absolute w-16 h-16 rounded-full top-1/2 left-1/2 -translate-x-[5rem] -translate-y-[4rem]"></div>
            <div className="border-2 border-yellow-400 absolute w-16 h-16 rounded-full top-1/2 left-1/2 translate-x-[1rem] -translate-y-[4rem]"></div>
            <div className="border-2 border-green-500 absolute w-16 h-16 rounded-full top-1/2 left-1/2 -translate-x-[5rem] -translate-y-[1rem]"></div>
            <div className="border-2 border-purple-500 absolute w-16 h-16 rounded-full top-1/2 left-1/2 translate-x-[1rem] -translate-y-[1rem]"></div>
            <div className="border-2 border-orange-500 absolute  w-16 h-16 rounded-full top-1/2 left-1/2 -translate-x-1/2 translate-y-[1rem]"></div>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-xs">Danceability</span>
            <span className="">20%</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackStats;
