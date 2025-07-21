import React from 'react';
import { Shield, Scan } from 'lucide-react';

interface TruScanLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

const TruScanLogo: React.FC<TruScanLogoProps> = ({ 
  size = 'md', 
  showText = true, 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative">
        {/* Background glow */}
        <div className={`${sizeClasses[size]} absolute inset-0 bg-gradient-primary rounded-lg blur-md opacity-50`} />
        
        {/* Logo container */}
        <div className={`${sizeClasses[size]} relative bg-gradient-primary rounded-lg p-2 shadow-glow`}>
          <div className="relative w-full h-full">
            {/* Shield icon as base */}
            <Shield className="absolute inset-0 w-full h-full text-white" />
            
            {/* Scan lines overlay */}
            <Scan className="absolute inset-0 w-3/4 h-3/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/80" />
          </div>
        </div>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizeClasses[size]} font-bold bg-gradient-to-r from-primary via-primary-variant to-trust bg-clip-text text-transparent`}>
            TruScan
          </span>
          <span className="text-xs text-muted-foreground font-medium tracking-wider">
            AI DETECTION
          </span>
        </div>
      )}
    </div>
  );
};

export default TruScanLogo;