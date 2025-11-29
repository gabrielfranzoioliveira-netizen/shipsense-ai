import { useState } from "react";
import { Calendar, Wrench, CheckCircle2, Clock, AlertCircle, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { maintenanceSchedule, ships } from "@/data/ships";

export default function Maintenance() {
  const [filter, setFilter] = useState<'all' | 'scheduled' | 'completed'>('all');

  const filteredMaintenance = maintenanceSchedule.filter(m => 
    filter === 'all' || m.status === filter
  );

  const totalCost = maintenanceSchedule
    .filter(m => m.status === 'completed')
    .reduce((sum, m) => sum + (m.estimatedCost || 0), 0);

  const scheduledCount = maintenanceSchedule.filter(m => m.status === 'scheduled').length;
  const completedCount = maintenanceSchedule.filter(m => m.status === 'completed').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary" />
            Manutenções e Limpezas
          </h1>
          <p className="text-muted-foreground">Programação de docagens e serviços IWS</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Exportar Planilha
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Wrench className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{maintenanceSchedule.length}</p>
                <p className="text-sm text-muted-foreground">Total de Registros</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{scheduledCount}</p>
                <p className="text-sm text-muted-foreground">Programadas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{completedCount}</p>
                <p className="text-sm text-muted-foreground">Concluídas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-ocean/20 flex items-center justify-center">
                <span className="text-ocean font-bold text-sm">R$</span>
              </div>
              <div>
                <p className="text-2xl font-bold">{(totalCost / 1000000).toFixed(1)}M</p>
                <p className="text-sm text-muted-foreground">Investido</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <Button
          variant={filter === 'all' ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter('all')}
        >
          Todas
        </Button>
        <Button
          variant={filter === 'scheduled' ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter('scheduled')}
        >
          Programadas
        </Button>
        <Button
          variant={filter === 'completed' ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter('completed')}
        >
          Concluídas
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Registro de Manutenções</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Embarcação</th>
                  <th>Classe</th>
                  <th>Tipo</th>
                  <th>Data</th>
                  <th>Local</th>
                  <th>Status</th>
                  <th>Custo Estimado</th>
                </tr>
              </thead>
              <tbody>
                {filteredMaintenance.map((m) => {
                  const ship = ships.find(s => s.id === m.shipId);
                  return (
                    <tr key={m.id}>
                      <td>
                        <div className="font-medium">{m.shipName}</div>
                        {ship && <div className="text-xs text-muted-foreground">{ship.sigla}</div>}
                      </td>
                      <td>{ship?.class || '-'}</td>
                      <td>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          m.type === 'Especial' ? 'bg-primary/20 text-primary' : 
                          m.type === 'IWS' ? 'bg-ocean/20 text-ocean' : 
                          'bg-secondary text-muted-foreground'
                        }`}>
                          {m.type}
                        </span>
                      </td>
                      <td>{new Date(m.date).toLocaleDateString('pt-BR')}</td>
                      <td>{m.location || '-'}</td>
                      <td>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          m.status === 'completed' ? 'bg-success/20 text-success' :
                          m.status === 'scheduled' ? 'bg-warning/20 text-warning' :
                          'bg-destructive/20 text-destructive'
                        }`}>
                          {m.status === 'completed' ? <CheckCircle2 className="w-3 h-3" /> :
                           m.status === 'scheduled' ? <Clock className="w-3 h-3" /> :
                           <AlertCircle className="w-3 h-3" />}
                          {m.status === 'completed' ? 'Concluída' :
                           m.status === 'scheduled' ? 'Programada' : 'Atrasada'}
                        </span>
                      </td>
                      <td className="font-mono">
                        {m.estimatedCost 
                          ? `R$ ${(m.estimatedCost / 1000).toFixed(0)}k`
                          : '-'
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Cleaning Schedule by Ship */}
      <Card>
        <CardHeader>
          <CardTitle>Próximas Limpezas Programadas por Embarcação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Embarcação</th>
                  <th>Classe</th>
                  <th>Bio-Score Atual</th>
                  <th>Penalidade Combustível</th>
                  <th>Última Limpeza</th>
                  <th>Próxima Limpeza</th>
                  <th>Dias Restantes</th>
                </tr>
              </thead>
              <tbody>
                {ships
                  .sort((a, b) => new Date(a.nextScheduledCleaning).getTime() - new Date(b.nextScheduledCleaning).getTime())
                  .map((ship) => {
                    const daysUntil = Math.ceil(
                      (new Date(ship.nextScheduledCleaning).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                    );
                    return (
                      <tr key={ship.id}>
                        <td>
                          <div className="font-medium">{ship.name}</div>
                          <div className="text-xs text-muted-foreground">{ship.sigla}</div>
                        </td>
                        <td>{ship.class}</td>
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
                        <td>{new Date(ship.lastCleaning).toLocaleDateString('pt-BR')}</td>
                        <td>{new Date(ship.nextScheduledCleaning).toLocaleDateString('pt-BR')}</td>
                        <td>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            daysUntil < 30 ? 'bg-destructive/20 text-destructive' :
                            daysUntil < 90 ? 'bg-warning/20 text-warning' :
                            'bg-success/20 text-success'
                          }`}>
                            {daysUntil > 0 ? `${daysUntil} dias` : 'Vencida'}
                          </span>
                        </td>
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
