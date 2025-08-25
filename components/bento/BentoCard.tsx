
import React from 'react';
import Card from '../ui/Card';

interface BentoCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  cta?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const BentoCard: React.FC<BentoCardProps> = ({ title, subtitle, icon, cta, children, footer, className = '' }) => {
  return (
    <Card className={`flex flex-col p-4 ${className}`}>
      <header className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          {icon && <div className="text-blue-500">{icon}</div>}
          <div>
            <h3 className="h3">{title}</h3>
            {subtitle && <p className="small mt-1">{subtitle}</p>}
          </div>
        </div>
        {cta}
      </header>
      <div className="flex-grow rounded-md">
        {children}
      </div>
      {footer && <footer className="mt-3 border-t border-muted pt-3">{footer}</footer>}
    </Card>
  );
};

export default BentoCard;
