import { cn } from "@/lib/utils";

interface BioScoreGaugeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function BioScoreGauge({ score, size = 'md', showLabel = true }: BioScoreGaugeProps) {
  const getColor = (s: number) => {
    if (s < 30) return { stroke: 'hsl(var(--success))', text: 'text-success', label: 'Bom' };
    if (s < 60) return { stroke: 'hsl(var(--warning))', text: 'text-warning', label: 'Atenção' };
    return { stroke: 'hsl(var(--destructive))', text: 'text-destructive', label: 'Crítico' };
  };

  const color = getColor(score);
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-3xl',
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={cn("relative", sizeClasses[size])}>
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="hsl(var(--secondary))"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={color.stroke}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn("font-bold", textSizes[size], color.text)}>
            {score}
          </span>
        </div>
      </div>
      {showLabel && (
        <span className={cn("text-xs font-medium", color.text)}>{color.label}</span>
      )}
    </div>
  );
}
