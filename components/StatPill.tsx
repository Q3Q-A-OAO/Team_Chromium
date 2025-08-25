
import React from 'react';

interface StatPillProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  className?: string;
}

const StatPill: React.FC<StatPillProps> = ({ value, label, icon, className = '' }) => {
  return (
    <div className={`flex items-center gap-3 rounded-md bg-muted p-3 ${className}`}>
      {icon && <div className="text-mint-400">{icon}</div>}
      <div>
        <div className="text-xl font-semibold text-text">{value}</div>
        <div className="text-sm text-subtext">{label}</div>
      </div>
    </div>
  );
};

export default StatPill;
