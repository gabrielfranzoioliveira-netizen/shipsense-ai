import { Anchor } from "lucide-react";

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ size = 'md', showText = true }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className="flex items-center gap-3">
      <div className={`${sizeClasses[size]} rounded-lg bg-primary/20 flex items-center justify-center relative`}>
        <Anchor className="w-6 h-6 text-primary" />
        <div className="absolute inset-0 rounded-lg bg-primary/10 animate-pulse-slow" />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizeClasses[size]} font-bold tracking-tight`}>
            <span className="text-foreground">Ship</span>
            <span className="gradient-text-moss">Sense</span>
          </span>
          <span className="text-xs text-muted-foreground tracking-widest uppercase">AI Platform</span>
        </div>
      )}
    </div>
  );
}
