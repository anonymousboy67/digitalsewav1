
import React from 'react';

export const LogoWordmark: React.FC<{ size?: 'sm' | 'md' | 'lg' | 'xl' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl',
    xl: 'text-6xl',
  };
  
  return (
    <div className={`font-sans font-bold select-none ${sizeClasses[size]}`} style={{letterSpacing: '-0.04em'}}>
        <span style={{color: '#22c55e'}}>ka</span>
        <span style={{color: '#374151'}}>amgarau</span>
    </div>
  );
};

export default LogoWordmark;
