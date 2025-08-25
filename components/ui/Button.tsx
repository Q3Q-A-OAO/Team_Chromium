import React from 'react';

type Variant = 'primary' | 'accent' | 'muted' | 'outline' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className = '', ...props }) => {
  const base = 'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--blue-500)] disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95';
  
  const styles: Record<Variant, string> = {
    primary: 'bg-[var(--primary)] text-[var(--primary-ink)] hover:brightness-110 shadow-soft',
    accent:  'bg-[var(--accent)] text-[var(--accent-ink)] ring-1 ring-inset ring-[#bde76d] hover:brightness-95',
    muted:   'bg-[var(--muted)] text-[var(--text)] hover:bg-opacity-80',
    outline: 'bg-transparent text-[var(--text)] ring-1 ring-inset ring-[var(--ring)] hover:bg-[var(--muted)]',
    ghost: 'bg-transparent text-text hover:bg-muted/50',
  };

  return <button className={`${base} ${styles[variant]} ${className}`} {...props} />;
};

export default Button;