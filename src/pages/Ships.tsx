import { useState } from "react";
import { Search, Filter, Ship as ShipIcon, ArrowUpDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ships, getBioScoreBadge } from "@/data/ships";
import { ShipStatusBadge } from "@/components/ShipStatusBadge";
import { BioScoreGauge } from "@/components/BioScoreGauge";

export default function Ships() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [sortBy, setSortBy] = useState<'name' | 'bioScore' | 'fuelPenalty'>('bioScore');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedShip, setSelectedShip] = useState<typeof ships[0] | null>(null);

  const classes = ['all', ...new Set(ships.map(s => s.class))];

  const filteredShips = ships
    .filter(ship => {
      const matchesSearch = ship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ship.sigla.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesClass = selectedClass === 'all' || ship.class === selectedClass;
      return matchesSearch && matchesClass;
    })
    .sort((a, b) => {
      const modifier = sortOrder === 'asc' ? 1 : -1;
      if (sortBy === 'name') return a.name.localeCompare(b.name) * modifier;
      if (sortBy === 'bioScore') return (a.bioScore - b.bioScore) * modifier;
      return (a.fuelPenalty - b.fuelPenalty) * modifier;
    });

  const toggleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Embarcações</h1>
          <p className="text-muted-foreground">Gerenciamento e monitoramento da frota</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar embarcação..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {classes.map((cls) => (
            <Button
              key={cls}
              variant={selectedClass === cls ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedClass(cls)}
            >
              {cls === 'all' ? 'Todas' : cls}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ship List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <ShipIcon className="w-5 h-5 text-primary" />
                  Lista de Embarcações ({filteredShips.length})
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSort('bioScore')}
                    className="text-xs"
                  >
                    Bio-Score <ArrowUpDown className="w-3 h-3 ml-1" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSort('fuelPenalty')}
                    className="text-xs"
                  >
                    Penalidade <ArrowUpDown className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-[600px] overflow-y-auto scrollbar-thin">
                {filteredShips.map((ship) => (
                  <div
                    key={ship.id}
                    onClick={() => setSelectedShip(ship)}
                    className={`flex items-center justify-between p-4 border-b border-border/50 hover:bg-secondary/50 cursor-pointer transition-colors ${selectedShip?.id === ship.id ? 'bg-secondary' : ''}`}
                  >
                    <div className="flex items-center gap-4">
                      <BioScoreGauge score={ship.bioScore} size="sm" showLabel={false} />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{ship.name}</span>
                          <span className="text-xs text-muted-foreground">({ship.sigla})</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">{ship.class}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <ShipStatusBadge status={ship.status} />
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-semibold ${ship.fuelPenalty > 10 ? 'text-destructive' : ship.fuelPenalty > 5 ? 'text-warning' : 'text-success'}`}>
                        +{ship.fuelPenalty}%
                      </div>
                      <div className="text-xs text-muted-foreground">combustível</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ship Details */}
        <div>
          {selectedShip ? (
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>{selectedShip.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center">
                  <BioScoreGauge score={selectedShip.bioScore} size="lg" />
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Especificações</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">Classe</div>
                    <div className="font-medium">{selectedShip.class}</div>
                    <div className="text-muted-foreground">Tipo</div>
                    <div className="font-medium">{selectedShip.type}</div>
                    <div className="text-muted-foreground">DWT</div>
                    <div className="font-medium">{selectedShip.deadweight.toLocaleString()} t</div>
                    <div className="text-muted-foreground">Comprimento</div>
                    <div className="font-medium">{selectedShip.length} m</div>
                    <div className="text-muted-foreground">Boca</div>
                    <div className="font-medium">{selectedShip.beam} m</div>
                    <div className="text-muted-foreground">Calado</div>
                    <div className="font-medium">{selectedShip.draft} m</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Bioincrustação</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">Bio-Score</div>
                    <div className={`font-medium ${getBioScoreBadge(selectedShip.bioScore).replace('status-badge-', 'text-')}`}>
                      {selectedShip.bioScore}%
                    </div>
                    <div className="text-muted-foreground">Penalidade</div>
                    <div className="font-medium text-warning">+{selectedShip.fuelPenalty}%</div>
                    <div className="text-muted-foreground">Última Limpeza</div>
                    <div className="font-medium">
                      {new Date(selectedShip.lastCleaning).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="text-muted-foreground">Próxima Limpeza</div>
                    <div className="font-medium">
                      {new Date(selectedShip.nextScheduledCleaning).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                </div>

                {selectedShip.lastInspection && (
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Última Inspeção IWS</h4>
                    <div className="text-sm space-y-1">
                      <p className="text-muted-foreground">
                        {new Date(selectedShip.lastInspection.date).toLocaleDateString('pt-BR')}
                      </p>
                      <p>Condição: <span className="font-medium">{selectedShip.lastInspection.overallCondition}</span></p>
                      <p>Tipo: <span className="font-medium">{selectedShip.lastInspection.foulingType}</span></p>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Localização Atual</h4>
                  <div className="text-sm">
                    <p className="font-medium">{selectedShip.location.port || 'Em navegação'}</p>
                    <p className="text-muted-foreground text-xs mt-1">
                      {selectedShip.location.lat.toFixed(4)}°, {selectedShip.location.lng.toFixed(4)}°
                    </p>
                  </div>
                </div>

                <Button variant="hero" className="w-full">
                  Ver Análise Completa
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="sticky top-6">
              <CardContent className="p-12 text-center">
                <ShipIcon className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Selecione uma embarcação para ver detalhes
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
