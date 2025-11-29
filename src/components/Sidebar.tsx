import { NavLink, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Ship, 
  Map, 
  Calendar, 
  DollarSign, 
  MessageSquare, 
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "./ui/button";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Ship, label: "Embarcações", path: "/dashboard/ships" },
  { icon: Map, label: "Mapa", path: "/dashboard/map" },
  { icon: Calendar, label: "Manutenções", path: "/dashboard/maintenance" },
  { icon: DollarSign, label: "Custos", path: "/dashboard/costs" },
  { icon: MessageSquare, label: "Assistente IA", path: "/dashboard/chat" },
  { icon: Settings, label: "Configurações", path: "/dashboard/settings" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <aside 
      className={cn(
        "h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Header */}
      <div className={cn(
        "h-16 border-b border-sidebar-border flex items-center px-4",
        collapsed ? "justify-center" : "justify-between"
      )}>
        {collapsed ? (
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Ship className="w-5 h-5 text-primary" />
          </div>
        ) : (
          <Logo size="sm" />
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn("text-muted-foreground hover:text-foreground", collapsed && "hidden lg:flex")}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto scrollbar-thin">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/dashboard"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-primary/20 text-primary" 
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
                collapsed && "justify-center px-2"
              )
            }
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200 w-full",
            collapsed && "justify-center px-2"
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Sair</span>}
        </button>
      </div>
    </aside>
  );
}
