import { FeatureKeys } from "lib/types/features";

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
  return (
    <>
      <div
        onMouseEnter={() => props.setActiveRing(props.name)}
        onMouseLeave={() => props.setActiveRing(null)}
        className=" absolute w-16 h-16 rounded-full top-1/2 left-1/2 flex items-center justify-center
                    transition-all duration-500"
        style={{
          transform: `translate(${props.translateX}, ${props.translateY})`,
          border: `${getBorderSize(props.value)}px solid ${props.color}`,
        }}
      ></div>
    </>
  );
};

export default StatRing;
