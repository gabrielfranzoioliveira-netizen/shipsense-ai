import { DollarSign, Fuel, Leaf, TrendingDown, Calculator, Ship } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ships, costData, maintenanceSchedule } from "@/data/ships";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

export default function Costs() {
  // Calculate cost metrics
  const avgDailyFuelConsumption = 45; // tons per day average
  const fleetAvgFuelPenalty = ships.reduce((sum, s) => sum + s.fuelPenalty, 0) / ships.length;
  
  const annualExtraFuelCost = ships.reduce((total, ship) => {
    const dailyExtraConsumption = avgDailyFuelConsumption * (ship.fuelPenalty / 100);
    const annualExtraCost = dailyExtraConsumption * 365 * costData.fuelCostPerTon;
    return total + annualExtraCost;
  }, 0);

  const annualExtraCO2 = ships.reduce((total, ship) => {
    const dailyExtraConsumption = avgDailyFuelConsumption * (ship.fuelPenalty / 100);
    const annualExtraCO2 = dailyExtraConsumption * 365 * costData.co2EmissionPerTonFuel;
    return total + annualExtraCO2;
  }, 0);

  const potentialSavings = annualExtraFuelCost * 0.6; // Assuming 60% can be saved with optimal cleaning
  const carbonCreditValue = annualExtraCO2 * 0.6 * costData.carbonCreditPrice;

  // Ship-level cost data
  const shipCostData = ships.map(ship => {
    const dailyExtraConsumption = avgDailyFuelConsumption * (ship.fuelPenalty / 100);
    const annualExtraCost = dailyExtraConsumption * 365 * costData.fuelCostPerTon;
    const annualExtraCO2 = dailyExtraConsumption * 365 * costData.co2EmissionPerTonFuel;
    
    return {
      name: ship.sigla,
      fullName: ship.name,
      bioScore: ship.bioScore,
      fuelPenalty: ship.fuelPenalty,
      annualCost: Math.round(annualExtraCost / 1000), // in thousands
      annualCO2: Math.round(annualExtraCO2),
    };
  }).sort((a, b) => b.annualCost - a.annualCost);

  // Monthly projection
  const monthlyProjection = [
    { month: 'Jan', without: 2.8, with: 2.4 },
    { month: 'Fev', without: 2.9, with: 2.3 },
    { month: 'Mar', without: 3.1, with: 2.5 },
    { month: 'Abr', without: 3.3, with: 2.6 },
    { month: 'Mai', without: 3.4, with: 2.5 },
    { month: 'Jun', without: 3.2, with: 2.4 },
    { month: 'Jul', without: 3.0, with: 2.3 },
    { month: 'Ago', without: 3.1, with: 2.4 },
    { month: 'Set', without: 3.3, with: 2.5 },
    { month: 'Out', without: 3.5, with: 2.6 },
    { month: 'Nov', without: 3.4, with: 2.5 },
    { month: 'Dez', without: 3.2, with: 2.4 },
  ];

  // Cost by class
  const costByClass = [
    { name: 'Suezmax', value: 45, color: 'hsl(var(--primary))' },
    { name: 'Aframax', value: 30, color: 'hsl(var(--ocean))' },
    { name: 'MR 2', value: 18, color: 'hsl(var(--warning))' },
    { name: 'Gaseiro', value: 7, color: 'hsl(var(--success))' },
  ];

  // Maintenance cost summary
  const maintenanceCostByType = {
    especial: maintenanceSchedule.filter(m => m.type === 'Especial').reduce((sum, m) => sum + (m.estimatedCost || 0), 0),
    iws: maintenanceSchedule.filter(m => m.type === 'IWS').reduce((sum, m) => sum + (m.estimatedCost || 0), 0),
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-primary" />
          Análise de Custos
        </h1>
        <p className="text-muted-foreground">Impacto econômico da bioincrustação e potencial de economia</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Custo Extra Anual</p>
                <p className="text-2xl font-bold text-destructive">
                  R$ {(annualExtraFuelCost / 1000000).toFixed(1)}M
                </p>
                <p className="text-xs text-muted-foreground mt-1">por bioincrustação</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-success/30 bg-success/5">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Economia Potencial</p>
                <p className="text-2xl font-bold text-success">
                  R$ {(potentialSavings / 1000000).toFixed(1)}M
                </p>
                <p className="text-xs text-muted-foreground mt-1">com limpeza otimizada</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                <Calculator className="w-5 h-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-warning/30 bg-warning/5">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">CO₂ Extra Anual</p>
                <p className="text-2xl font-bold text-warning">
                  {(annualExtraCO2 / 1000).toFixed(1)}k ton
                </p>
                <p className="text-xs text-muted-foreground mt-1">emissões adicionais</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-ocean/30 bg-ocean/5">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Créditos Carbono</p>
                <p className="text-2xl font-bold text-ocean">
                  R$ {(carbonCreditValue / 1000).toFixed(0)}k
                </p>
                <p className="text-xs text-muted-foreground mt-1">valor potencial</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-ocean/20 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-ocean" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost by Ship */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ship className="w-5 h-5 text-primary" />
              Custo Extra por Embarcação (R$ mil/ano)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={shipCostData.slice(0, 10)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={50} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))'
                  }}
                  formatter={(value: number) => [`R$ ${value}k`, 'Custo Extra']}
                />
                <Bar 
                  dataKey="annualCost" 
                  fill="hsl(var(--primary))"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Projection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-primary" />
              Projeção Mensal de Custos (R$ milhões)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={monthlyProjection}>
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
                <Line
                  type="monotone"
                  dataKey="without"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--destructive))' }}
                  name="Sem Otimização"
                />
                <Line
                  type="monotone"
                  dataKey="with"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))' }}
                  name="Com ShipSense AI"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <span className="text-muted-foreground">Sem Otimização</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-muted-foreground">Com ShipSense AI</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cost Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Distribution by Class */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Custos por Classe</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <div className="flex items-center gap-8">
              <ResponsiveContainer width={200} height={200}>
                <PieChart>
                  <Pie
                    data={costByClass}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {costByClass.map((entry, index) => (
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
                    formatter={(value: number) => [`${value}%`, 'Proporção']}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3">
                {costByClass.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                    <span className="text-sm font-semibold">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Costs Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Resumo de Custos de Manutenção</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                <div>
                  <p className="font-semibold">Docagens Especiais</p>
                  <p className="text-sm text-muted-foreground">Manutenção completa em dique seco</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">R$ {(maintenanceCostByType.especial / 1000000).toFixed(2)}M</p>
                  <p className="text-xs text-muted-foreground">{maintenanceSchedule.filter(m => m.type === 'Especial').length} operações</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                <div>
                  <p className="font-semibold">Limpezas IWS</p>
                  <p className="text-sm text-muted-foreground">In-Water Survey / Limpeza subaquática</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">R$ {(maintenanceCostByType.iws / 1000).toFixed(0)}k</p>
                  <p className="text-xs text-muted-foreground">{maintenanceSchedule.filter(m => m.type === 'IWS').length} operações</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10 border border-primary/30">
                <div>
                  <p className="font-semibold">Total Investido</p>
                  <p className="text-sm text-muted-foreground">Manutenções realizadas</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-primary">
                    R$ {((maintenanceCostByType.especial + maintenanceCostByType.iws) / 1000000).toFixed(2)}M
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Table */}
      <Card>
        <CardHeader>
          <CardTitle>Planilha Detalhada de Custos por Embarcação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Embarcação</th>
                  <th>Classe</th>
                  <th>Bio-Score</th>
                  <th>Penalidade (%)</th>
                  <th>Custo Extra/Ano</th>
                  <th>CO₂ Extra/Ano</th>
                  <th>Última Limpeza</th>
                  <th>Próxima Limpeza</th>
                </tr>
              </thead>
              <tbody>
                {shipCostData.map((ship) => {
                  const fullShip = ships.find(s => s.sigla === ship.name);
                  return (
                    <tr key={ship.name}>
                      <td>
                        <div className="font-medium">{ship.fullName}</div>
                        <div className="text-xs text-muted-foreground">{ship.name}</div>
                      </td>
                      <td>{fullShip?.class}</td>
                      <td>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          ship.bioScore < 30 ? 'bg-success/20 text-success' :
                          ship.bioScore < 60 ? 'bg-warning/20 text-warning' :
                          'bg-destructive/20 text-destructive'
                        }`}>
                          {ship.bioScore}%
                        </span>
                      </td>
                      <td className={ship.fuelPenalty > 10 ? 'text-destructive font-semibold' : ''}>
                        +{ship.fuelPenalty}%
                      </td>
                      <td className="font-mono">R$ {ship.annualCost}k</td>
                      <td className="font-mono">{ship.annualCO2} ton</td>
                      <td>{fullShip && new Date(fullShip.lastCleaning).toLocaleDateString('pt-BR')}</td>
                      <td>{fullShip && new Date(fullShip.nextScheduledCleaning).toLocaleDateString('pt-BR')}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
