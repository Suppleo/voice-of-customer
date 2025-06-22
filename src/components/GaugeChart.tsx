import React from "react";
import GaugeChartComponent from "react-gauge-chart";

interface CustomGaugeChartProps {
  score: number;
  maxScore: number;
}

const CustomGaugeChart: React.FC<CustomGaugeChartProps> = ({
  score,
  maxScore = 10,
}) => {
  const sections = [
    "Ad hoc",
    "Establishing",
    "Performing",
    "Optimizing",
    "Embedded",
  ];

  // Determine which section the score falls into
  const getSectionIndex = (score: number) => {
    if (score < 2) return 0;
    if (score < 4) return 1;
    if (score < 6) return 2;
    if (score < 8) return 3;
    return 4;
  };

  const currentSectionIndex = getSectionIndex(score);

  return (
    <div className="w-full max-w-sm mx-auto">
      <GaugeChartComponent
        nrOfLevels={5}
        arcsLength={[0.2, 0.2, 0.2, 0.2, 0.2]}
        colors={["#FF5F6D", "#FFC371", "#facc15", "#4CAF50", "#0F9D58"]}
        percent={score / maxScore}
        arcPadding={0.02}
        needleColor="#333"
        needleBaseColor="#333"
        textColor="#333"
        hideText={true} // Hiding default text to use custom
      />
      <div className="text-center -mt-2">
        <div className="text-4xl font-bold text-gray-800">
          {score.toFixed(1)}
        </div>
        <div className="text-sm text-gray-500">Score</div>
      </div>

      {/* Custom Labels */}
      <div className="flex justify-between text-xs text-gray-500 mt-2 px-2">
        {sections.map((section, index) => (
          <span
            key={section}
            className={`font-medium ${
              index === currentSectionIndex ? "text-blue-600" : ""
            }`}
          >
            {section}
          </span>
        ))}
      </div>
    </div>
  );
};

export { CustomGaugeChart as GaugeChart };
