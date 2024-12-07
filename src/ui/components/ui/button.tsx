import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = 'font-medium rounded-md transition-colors duration-200 flex items-center justify-center';
  
  const variants = {
    primary: 'bg-[var(--figma-color-bg-brand)] text-[var(--figma-color-text-onbrand)] hover:bg-[var(--figma-color-bg-brand-hover)]',
    secondary: 'bg-[var(--figma-color-bg-secondary)] text-[var(--figma-color-text)] hover:bg-[var(--figma-color-bg-secondary-hover)]',
    outline: 'border-2 border-[var(--figma-color-border)] text-[var(--figma-color-text)] hover:bg-[var(--figma-color-bg-hover)]'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg w-full'
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
