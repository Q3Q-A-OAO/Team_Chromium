
import React from 'react';
import { scaleLinear } from 'd3-scale';

interface HeatmapProps {
  data: { concept: string; mastery: number }[]; // mastery 0-100
}

const Heatmap: React.FC<HeatmapProps> = ({ data }) => {
  const colorScale = scaleLinear<string>()
    .domain([0, 50, 100])
    .range(['var(--blue-800)', 'var(--teal-400)', 'var(--mint-400)']);

  return (
    <div className="grid grid-cols-4 gap-2">
      {data.map(({ concept, mastery }) => (
        <div key={concept} className="group relative rounded-md p-3" style={{ backgroundColor: colorScale(mastery) }}>
          <span className="text-sm font-medium text-text">{concept}</span>
          <div className="absolute inset-0 flex items-center justify-center rounded-md bg-bg/80 opacity-0 transition-opacity group-hover:opacity-100">
            <span className="text-lg font-bold text-text">{mastery}%</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Heatmap;
