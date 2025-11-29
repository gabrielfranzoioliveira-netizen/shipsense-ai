import { Ship, Fuel, AlertTriangle, Leaf, Anchor, Navigation, Calendar, TrendingDown } from "lucide-react";
import { KPICard } from "@/components/KPICard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ships, getFleetStats, getBioScoreBadge, maintenanceSchedule } from "@/data/ships";
import { BioScoreGauge } from "@/components/BioScoreGauge";
import { ShipStatusBadge } from "@/components/ShipStatusBadge";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const consumptionData = [
  { month: 'Jun', actual: 4200, optimized: 3800 },
  { month: 'Jul', actual: 4500, optimized: 4000 },
  { month: 'Ago', actual: 4800, optimized: 4100 },
  { month: 'Set', actual: 5100, optimized: 4200 },
  { month: 'Out', actual: 4700, optimized: 4000 },
  { month: 'Nov', actual: 4400, optimized: 3900 },
];

const bioScoreDistribution = [
  { name: 'Bom (<30)', value: ships.filter(s => s.bioScore < 30).length, color: 'hsl(var(--success))' },
  { name: 'Atenção (30-60)', value: ships.filter(s => s.bioScore >= 30 && s.bioScore < 60).length, color: 'hsl(var(--warning))' },
  { name: 'Crítico (≥60)', value: ships.filter(s => s.bioScore >= 60).length, color: 'hsl(var(--destructive))' },
];

export default function Dashboard() {
  const stats = getFleetStats();
  const criticalShips = ships.filter(s => s.bioScore >= 60).slice(0, 5);
  const upcomingMaintenance = maintenanceSchedule
    .filter(m => m.status === 'scheduled')
    .slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral da frota e indicadores de bioincrustação</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          Atualizado em tempo real
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
        <KPICard
          title="Total de Embarcações"
          value={stats.total}
          subtitle={`${stats.navigating} navegando`}
          icon={Ship}
          variant="primary"
        />
        <KPICard
          title="Bio-Score Médio"
          value={`${stats.avgBioScore}%`}
          subtitle="Nível de incrustação"
          icon={Anchor}
          variant={stats.avgBioScore >= 60 ? 'danger' : stats.avgBioScore >= 30 ? 'warning' : 'success'}
        />
        <KPICard
          title="Penalidade Média"
          value={`+${stats.avgFuelPenalty}%`}
          subtitle="Consumo de combustível"
          icon={Fuel}
          trend={{ value: 2.3, positive: false }}
          variant="warning"
        />
        <KPICard
          title="Embarcações Críticas"
          value={stats.criticalShips}
          subtitle="Precisam de limpeza"
          icon={AlertTriangle}
          variant={stats.criticalShips > 3 ? 'danger' : 'default'}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Consumption Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-primary" />
              Consumo de Combustível vs. Otimizado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={consumptionData}>
                <defs>
                  <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--muted-foreground))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="optimizedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="actual"
                  stroke="hsl(var(--muted-foreground))"
                  fill="url(#actualGradient)"
                  name="Consumo Atual (ton)"
                />
                <Area
                  type="monotone"
                  dataKey="optimized"
                  stroke="hsl(var(--primary))"
                  fill="url(#optimizedGradient)"
                  name="Consumo Otimizado (ton)"
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-muted-foreground" />
                <span className="text-muted-foreground">Consumo Atual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-primary" />
                <span className="text-muted-foreground">Consumo Otimizado</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bio Score Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-primary" />
              Distribuição Bio-Score
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={bioScoreDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {bioScoreDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2 mt-2 w-full">
              {bioScoreDistribution.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Critical Ships */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              Embarcações Críticas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {criticalShips.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-4">
                  Nenhuma embarcação em estado crítico
                </p>
              ) : (
                criticalShips.map((ship) => (
                  <div key={ship.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                    <div className="flex items-center gap-3">
                      <BioScoreGauge score={ship.bioScore} size="sm" showLabel={false} />
                      <div>
                        <p className="font-semibold text-sm">{ship.name}</p>
                        <p className="text-xs text-muted-foreground">{ship.class} • {ship.location.port || 'Em navegação'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-destructive">+{ship.fuelPenalty}%</p>
                      <p className="text-xs text-muted-foreground">combustível</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Maintenance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Próximas Manutenções
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingMaintenance.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-4">
                  Nenhuma manutenção programada
                </p>
              ) : (
                upcomingMaintenance.map((m) => (
                  <div key={m.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                    <div>
                      <p className="font-semibold text-sm">{m.shipName}</p>
                      <p className="text-xs text-muted-foreground">{m.type} • {m.location || 'Local a definir'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{new Date(m.date).toLocaleDateString('pt-BR')}</p>
                      <p className="text-xs text-muted-foreground">
                        {m.estimatedCost ? `R$ ${(m.estimatedCost / 1000).toFixed(0)}k` : '-'}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fleet Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-primary" />
            Status da Frota em Tempo Real
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Embarcação</th>
                  <th>Classe</th>
                  <th>Status</th>
                  <th>Localização</th>
                  <th>Bio-Score</th>
                  <th>Penalidade</th>
                  <th>Próxima Limpeza</th>
                </tr>
              </thead>
              <tbody>
                {ships.slice(0, 8).map((ship) => (
                  <tr key={ship.id}>
                    <td>
                      <div className="font-medium">{ship.name}</div>
                      <div className="text-xs text-muted-foreground">{ship.sigla}</div>
                    </td>
                    <td>{ship.class}</td>
                    <td><ShipStatusBadge status={ship.status} /></td>
                    <td>{ship.location.port || 'Em navegação'}</td>
                    <td>
                      <span className={getBioScoreBadge(ship.bioScore)}>
                        {ship.bioScore}%
                      </span>
                    </td>
                    <td className={ship.fuelPenalty > 10 ? 'text-destructive font-semibold' : ''}>
                      +{ship.fuelPenalty}%
                    </td>
                    <td className="text-muted-foreground">
                      {new Date(ship.nextScheduledCleaning).toLocaleDateString('pt-BR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
