import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ships, getBioScoreColor } from "@/data/ships";
import { ShipStatusBadge } from "@/components/ShipStatusBadge";
import { BioScoreGauge } from "@/components/BioScoreGauge";
import { Map, Navigation, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

// Custom ship icon based on bio score
const createShipIcon = (bioScore: number, status: string) => {
  let color = '#22c55e'; // green
  if (bioScore >= 60) color = '#ef4444'; // red
  else if (bioScore >= 30) color = '#eab308'; // yellow

  return L.divIcon({
    className: 'custom-ship-marker',
    html: `
      <div style="
        width: 32px;
        height: 32px;
        background: ${color};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px ${color}80;
        border: 2px solid white;
        position: relative;
      ">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
          <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
          <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/>
          <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/>
          <path d="M12 10v4"/>
          <path d="M12 2v3"/>
        </svg>
        ${status === 'navigating' ? `<div style="position: absolute; inset: -4px; border: 2px solid ${color}; border-radius: 50%; animation: ping 2s infinite;"></div>` : ''}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
};

function MapController({ center }: { center: [number, number] | null }) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.flyTo(center, 8, { duration: 1 });
    }
  }, [center, map]);
  
  return null;
}

export default function FleetMap() {
  const [selectedShip, setSelectedShip] = useState<typeof ships[0] | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);

  const filteredShips = ships.filter(ship => 
    filterStatus === 'all' || ship.status === filterStatus
  );

  const handleShipSelect = (ship: typeof ships[0]) => {
    setSelectedShip(ship);
    setMapCenter([ship.location.lat, ship.location.lng]);
  };

  return (
    <div className="p-6 space-y-6 h-[calc(100vh-24px)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Map className="w-6 h-6 text-primary" />
            Mapa da Frota
          </h1>
          <p className="text-muted-foreground">Localização em tempo real das embarcações</p>
        </div>
        <div className="flex gap-2">
          {['all', 'navigating', 'port', 'maintenance', 'anchor'].map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus(status)}
            >
              {status === 'all' ? 'Todas' : status === 'navigating' ? 'Navegando' : status === 'port' ? 'Porto' : status === 'maintenance' ? 'Manutenção' : 'Fundeado'}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100%-100px)]">
        {/* Map */}
        <div className="lg:col-span-3 h-full min-h-[400px]">
          <Card className="h-full overflow-hidden">
            <MapContainer
              center={[-15, -40]}
              zoom={4}
              className="h-full w-full"
              style={{ background: 'hsl(var(--charcoal))' }}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <MapController center={mapCenter} />
              {filteredShips.map((ship) => (
                <Marker
                  key={ship.id}
                  position={[ship.location.lat, ship.location.lng]}
                  icon={createShipIcon(ship.bioScore, ship.status)}
                  eventHandlers={{
                    click: () => handleShipSelect(ship),
                  }}
                >
                  <Popup>
                    <div className="p-2 min-w-[200px]">
                      <h3 className="font-bold text-foreground">{ship.name}</h3>
                      <p className="text-sm text-muted-foreground">{ship.class}</p>
                      <div className="mt-2 space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Bio-Score:</span>
                          <span className={getBioScoreColor(ship.bioScore)}>{ship.bioScore}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Penalidade:</span>
                          <span>+{ship.fuelPenalty}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Local:</span>
                          <span>{ship.location.port || 'Em navegação'}</span>
                        </div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </Card>
        </div>

        {/* Ship List */}
        <div className="h-full overflow-hidden">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-3 flex-shrink-0">
              <CardTitle className="flex items-center gap-2 text-base">
                <Navigation className="w-4 h-4 text-primary" />
                Embarcações ({filteredShips.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-0 scrollbar-thin">
              {filteredShips.map((ship) => (
                <div
                  key={ship.id}
                  onClick={() => handleShipSelect(ship)}
                  className={`p-3 border-b border-border/50 cursor-pointer transition-colors hover:bg-secondary/50 ${selectedShip?.id === ship.id ? 'bg-secondary' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <BioScoreGauge score={ship.bioScore} size="sm" showLabel={false} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{ship.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <ShipStatusBadge status={ship.status} />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 truncate">
                        {ship.location.port || 'Em navegação'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-success" />
          <span className="text-muted-foreground">Bio-Score Bom (&lt;30)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-warning" />
          <span className="text-muted-foreground">Atenção (30-60)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-destructive" />
          <span className="text-muted-foreground">Crítico (≥60)</span>
        </div>
      </div>
    </div>
  );
}
