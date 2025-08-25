
import React from 'react';
import { LineChart, Line, Tooltip, ResponsiveContainer, XAxis } from 'recharts';

interface SparklineProps {
  data: any[];
  dataKey: string;
  className?: string;
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-md bg-surface p-2 shadow-soft ring-1 ring-blue800/50">
          <p className="small">{`${label} : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };
  

const Sparkline: React.FC<SparklineProps> = ({ data, dataKey, className = '' }) => {
  return (
    <div className={`w-full h-24 ${className}`}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 5, right: 5, left: -40, bottom: 5 }}>
          <Line type="monotone" dataKey={dataKey} stroke="var(--teal-400)" strokeWidth={2} dot={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--muted)', strokeWidth: 1 }} />
          <XAxis dataKey="name" hide={true} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Sparkline;
