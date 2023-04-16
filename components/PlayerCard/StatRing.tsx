import { usePlayerStore } from "lib/stores/usePlayerStore";
import { useRecommendationStore } from "lib/stores/useRecommendationStore";
import { FeatureKeys } from "lib/types/features";
import { getRecommendations } from "lib/utils/spotify.util";
import { useSession } from "next-auth/react";
import { BsSearch } from "react-icons/bs";

type Props = {
  translateX: string;
  translateY: string;
  color: string;
  name: FeatureKeys;
  value: number;
  setActiveRing: any;
};

const scale = (number: number, outMin: number, outMax: number) => {
  return (number - 0) * (outMax - outMin) + outMin;
};

const getBorderSize = (value: number) => {
  return scale(value, 1, 15);
};

const StatRing = (props: Props) => {
  const { data: session } = useSession();
  const track = usePlayerStore((state) => state.item);

  const setTracks = useRecommendationStore((state) => state.setTracks);
  const setFeature = useRecommendationStore((state) => state.setFeature);
  const setValue = useRecommendationStore((state) => state.setValue);

  const handleRingClick = async () => {
    const filter = {
      [`target_${props.name}`]: props.value,
      seed_tracks: track?.id,
    };

    console.log(filter);

    const { data } = await getRecommendations(
      session?.user.accessToken!,
      filter
    );

    setTracks(data.tracks);
    setFeature(props.name);
    setValue(props.value);
  };

  return (
    <>
      <div
        onClick={() => handleRingClick()}
        onMouseEnter={() => props.setActiveRing(props.name)}
        onMouseLeave={() => props.setActiveRing(null)}
        className=" absolute w-16 h-16 rounded-full top-1/2 left-1/2 flex items-center justify-center
                    transition-all duration-500 group cursor-pointer"
        style={{
          transform: `translate(${props.translateX}, ${props.translateY})`,
          border: `${getBorderSize(props.value)}px solid ${props.color}`,
        }}
      >
        <BsSearch
          className="opacity-0 group-hover:opacity-75 transition-all duration-300 "
          size={12}
        />
      </div>
    </>
  );
};

export default StatRing;
