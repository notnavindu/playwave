import { AudioFeatures, FeatureKeys } from "lib/types/features";
import { useState } from "react";
import StatRing from "./StatRing";
import Recommendations from "../Recommendations/Recommendations";

type Props = {
  features: AudioFeatures;
};

const colors: Record<string, string> = {
  energy: "#f85a40",
  danceability: "#7552cc",
  valence: "#f48924",
  acousticness: "#037ef3",
  instrumentalness: "#ffc845",
  speechiness: "#00c16e",
};

const TrackStats = (props: Props) => {
  const [activeRing, setActiveRing] = useState<FeatureKeys | null>(null);

  return (
    <>
      <div className="w-full aspect-square rounded-[28px] z-10 p-4">
        <div className="w-full h-full bg-black/70 rounded-lg p-2 flex flex-col">
          {props.features && (
            <>
              <div className="flex flex-col">
                <span className="text-xs">Tempo</span>
                <span>{props.features.tempo.toFixed(0)} BPM</span>
              </div>

              <div className=" w-full flex-grow relative">
                <StatRing
                  name="energy"
                  translateX="-50%"
                  translateY="-5.2rem"
                  color={colors["energy"]}
                  value={props.features["energy"]}
                  setActiveRing={setActiveRing}
                />

                <StatRing
                  name="danceability"
                  translateX="-5rem"
                  translateY="-3.4rem"
                  color={colors["danceability"]}
                  setActiveRing={setActiveRing}
                  value={props.features["danceability"]}
                />

                <StatRing
                  name="valence"
                  translateX="1rem"
                  translateY="-3.4rem"
                  color={colors["valence"]}
                  setActiveRing={setActiveRing}
                  value={props.features["valence"]}
                />

                <StatRing
                  name="acousticness"
                  translateX="-5rem"
                  translateY="-0.4rem"
                  color={colors["acousticness"]}
                  setActiveRing={setActiveRing}
                  value={props.features["acousticness"]}
                />

                <StatRing
                  name="instrumentalness"
                  translateX="1rem"
                  translateY="-0.4rem"
                  color={colors["instrumentalness"]}
                  setActiveRing={setActiveRing}
                  value={props.features["instrumentalness"]}
                />

                <StatRing
                  name="speechiness"
                  translateX="-50%"
                  translateY="1.2rem"
                  color={colors["speechiness"]}
                  setActiveRing={setActiveRing}
                  value={props.features["speechiness"]}
                />
              </div>

              <div className="flex flex-col items-end">
                <span className="text-xs capitalize">{activeRing ?? " ‎"}</span>
                <span style={{ color: colors[activeRing!] }}>
                  {activeRing
                    ? `${(Number(props.features[activeRing]) * 100).toFixed(
                        1
                      )}%`
                    : " ‎"}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TrackStats;
