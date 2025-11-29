import { cn } from "@/lib/utils";
import { Ship } from "@/data/ships";

interface ShipStatusBadgeProps {
  status: Ship['status'];
}

export function ShipStatusBadge({ status }: ShipStatusBadgeProps) {
  const config = {
    navigating: { label: 'Navegando', className: 'bg-ocean/20 text-ocean' },
    port: { label: 'No Porto', className: 'bg-success/20 text-success' },
    maintenance: { label: 'Manutenção', className: 'bg-warning/20 text-warning' },
    anchor: { label: 'Fundeado', className: 'bg-muted text-muted-foreground' },
  };

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      config[status].className
    )}>
      {config[status].label}
    </span>
  );
}
