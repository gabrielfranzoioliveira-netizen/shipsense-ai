import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  variant?: 'default' | 'primary' | 'warning' | 'danger' | 'success';
}

export function KPICard({ title, value, subtitle, icon: Icon, trend, variant = 'default' }: KPICardProps) {
  const variantClasses = {
    default: 'border-border',
    primary: 'border-primary/30 bg-primary/5',
    warning: 'border-warning/30 bg-warning/5',
    danger: 'border-destructive/30 bg-destructive/5',
    success: 'border-success/30 bg-success/5',
  };

  const iconClasses = {
    default: 'bg-secondary text-muted-foreground',
    primary: 'bg-primary/20 text-primary',
    warning: 'bg-warning/20 text-warning',
    danger: 'bg-destructive/20 text-destructive',
    success: 'bg-success/20 text-success',
  };

  return (
    <div className={cn(
      "stat-card rounded-xl border p-5 transition-all duration-300 hover:shadow-lg",
      variantClasses[variant]
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="kpi-value">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <div className={cn(
              "flex items-center gap-1 text-xs font-medium",
              trend.positive ? "text-success" : "text-destructive"
            )}>
              <span>{trend.positive ? "↑" : "↓"}</span>
              <span>{Math.abs(trend.value)}% vs. mês anterior</span>
            </div>
          )}
        </div>
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", iconClasses[variant])}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
