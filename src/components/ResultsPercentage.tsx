import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import WheelComponent from "react-wheel-of-prizes";

export default function ResultsPercentage(props: { percentage: number }) {
  const [segments, setSegments] = useState([""]);
  const [segColors, setSegColors] = useState(["red"]);
  const [wheel, setWheel] = useState(false);

  useEffect(() => {
    if (!wheel) {
      setWheel(true);
      const segs = [],
        colors = [];
      for (let i = 1; i <= 100; i += 5) {
        if (i <= props.percentage) colors.push("#00ff00");
        else colors.push("red");
        segs.push("");
      }
      setSegments(segs);
      setSegColors(colors);
    }
  }, [wheel, props.percentage]);

  return (
    <div className="border flex flex-row items-center">
      <div className="border flex flex-col">
        <p className="text-6xl text-center font-bold">
          <CountUp end={props.percentage} duration={2} />%
        </p>
        <p className="text-center">chance you pass</p>
      </div>
      <div className="scale-50 w-24 h-24 -translate-x-28 -translate-y-32">
        {wheel && (
          <WheelComponent
            segments={segments}
            segColors={segColors}
            onFinished={() => {}}
            primaryColor="black"
            contrastColor="white"
            buttonText="Spin"
            isOnlyOnce={false}
            size={100}
            fontFamily="Arial"
          />
        )}
      </div>
    </div>
  );
}
