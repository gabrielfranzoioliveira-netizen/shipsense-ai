export interface Ship {
  id: string;
  name: string;
  sigla: string;
  class: 'Suezmax' | 'Aframax' | 'MR 2' | 'Gaseiro 7k';
  type: string;
  deadweight: number;
  length: number;
  beam: number;
  draft: number;
  depth: number;
  status: 'navigating' | 'port' | 'maintenance' | 'anchor';
  bioScore: number; // 0-100, higher = more fouling
  fuelPenalty: number; // percentage increase in fuel consumption
  lastCleaning: string;
  nextScheduledCleaning: string;
  location: {
    lat: number;
    lng: number;
    port?: string;
  };
  lastInspection?: {
    date: string;
    overallCondition: string;
    foulingType: string;
  };
}

export interface MaintenanceRecord {
  id: string;
  shipId: string;
  shipName: string;
  date: string;
  type: 'Especial' | 'Regular' | 'IWS';
  status: 'completed' | 'scheduled' | 'overdue';
  estimatedCost?: number;
  location?: string;
}

export interface FuelConsumption {
  sessionId: string;
  shipName: string;
  quantity: number;
  fuelType: string;
  date: string;
}

export const ships: Ship[] = [
  {
    id: 'ras',
    name: 'RAFAEL SANTOS',
    sigla: 'RAS',
    class: 'Suezmax',
    type: 'Petroleiro',
    deadweight: 156628,
    length: 274.2,
    beam: 48,
    draft: 17,
    depth: 23.2,
    status: 'navigating',
    bioScore: 72,
    fuelPenalty: 18,
    lastCleaning: '2025-08-23',
    nextScheduledCleaning: '2026-02-15',
    location: { lat: -23.9618, lng: -46.3253, port: 'Santos' },
    lastInspection: {
      date: '2025-08-23',
      overallCondition: '80%',
      foulingType: 'Moles'
    }
  },
  {
    id: 'hal',
    name: 'HENRIQUE ALVES',
    sigla: 'HAL',
    class: 'Suezmax',
    type: 'Petroleiro',
    deadweight: 157700,
    length: 274.2,
    beam: 48,
    draft: 17,
    depth: 23.2,
    status: 'navigating',
    bioScore: 55,
    fuelPenalty: 12,
    lastCleaning: '2025-09-26',
    nextScheduledCleaning: '2026-03-20',
    location: { lat: 1.2897, lng: 103.8501, port: 'Singapura' },
    lastInspection: {
      date: '2025-09-26',
      overallCondition: '55%',
      foulingType: 'Cracas e limo'
    }
  },
  {
    id: 'vol',
    name: 'VICTOR OLIVEIRA',
    sigla: 'VOL',
    class: 'Suezmax',
    type: 'Petroleiro',
    deadweight: 156492,
    length: 274.2,
    beam: 48,
    draft: 17,
    depth: 23.2,
    status: 'port',
    bioScore: 30,
    fuelPenalty: 6,
    lastCleaning: '2023-06-30',
    nextScheduledCleaning: '2026-01-15',
    location: { lat: -12.9714, lng: -38.5014, port: 'Salvador' },
    lastInspection: {
      date: '2021-03-03',
      overallCondition: '30%',
      foulingType: 'Cracas e limo'
    }
  },
  {
    id: 'frb',
    name: 'FELIPE RIBEIRO',
    sigla: 'FRB',
    class: 'Suezmax',
    type: 'Petroleiro',
    deadweight: 157700,
    length: 274.2,
    beam: 48,
    draft: 17,
    depth: 23.2,
    status: 'navigating',
    bioScore: 45,
    fuelPenalty: 10,
    lastCleaning: '2024-06-20',
    nextScheduledCleaning: '2025-12-20',
    location: { lat: -22.9068, lng: -43.1729, port: 'Rio de Janeiro' },
    lastInspection: {
      date: '2022-12-31',
      overallCondition: '80%',
      foulingType: 'Craca, alga e limo'
    }
  },
  {
    id: 'gic',
    name: 'GISELLE CARVALHO',
    sigla: 'GIC',
    class: 'Suezmax',
    type: 'Petroleiro',
    deadweight: 156504,
    length: 274.2,
    beam: 48,
    draft: 17,
    depth: 23.2,
    status: 'anchor',
    bioScore: 15,
    fuelPenalty: 3,
    lastCleaning: '2025-03-22',
    nextScheduledCleaning: '2025-12-01',
    location: { lat: -23.0068, lng: -44.3189, port: 'Angra dos Reis' },
    lastInspection: {
      date: '2023-01-10',
      overallCondition: '10%',
      foulingType: 'Craca, alga e limo'
    }
  },
  {
    id: 'rma',
    name: 'RAUL MARTINS',
    sigla: 'RMA',
    class: 'Suezmax',
    type: 'Petroleiro',
    deadweight: 156523,
    length: 274.2,
    beam: 48,
    draft: 17,
    depth: 23.2,
    status: 'maintenance',
    bioScore: 50,
    fuelPenalty: 11,
    lastCleaning: '2025-05-10',
    nextScheduledCleaning: '2025-11-15',
    location: { lat: 36.1408, lng: -5.3536, port: 'Gibraltar' },
    lastInspection: {
      date: '2024-12-08',
      overallCondition: '50%',
      foulingType: 'Cracas e limo'
    }
  },
  {
    id: 'pmo',
    name: 'PAULO MOURA',
    sigla: 'PMO',
    class: 'Suezmax',
    type: 'Petroleiro',
    deadweight: 156547,
    length: 274.2,
    beam: 48,
    draft: 17,
    depth: 23.2,
    status: 'navigating',
    bioScore: 75,
    fuelPenalty: 19,
    lastCleaning: '2025-05-18',
    nextScheduledCleaning: '2025-11-01',
    location: { lat: 1.2644, lng: 103.8222 },
    lastInspection: {
      date: '2025-05-18',
      overallCondition: '70-80%',
      foulingType: 'Craca, alga e limo'
    }
  },
  {
    id: 'mca',
    name: 'MARCOS CAVALCANTI',
    sigla: 'MCA',
    class: 'Suezmax',
    type: 'Petroleiro',
    deadweight: 156733,
    length: 274.2,
    beam: 48,
    draft: 17,
    depth: 23.2,
    status: 'port',
    bioScore: 8,
    fuelPenalty: 1,
    lastCleaning: '2024-01-28',
    nextScheduledCleaning: '2026-01-28',
    location: { lat: -23.0068, lng: -44.3189, port: 'Angra dos Reis' },
    lastInspection: {
      date: '2024-01-28',
      overallCondition: '5%',
      foulingType: 'Moles'
    }
  },
  {
    id: 'dap',
    name: 'DANIEL PEREIRA',
    sigla: 'DAP',
    class: 'Aframax',
    type: 'Petroleiro',
    deadweight: 114562,
    length: 249,
    beam: 43.8,
    draft: 15,
    depth: 21,
    status: 'navigating',
    bioScore: 35,
    fuelPenalty: 7,
    lastCleaning: '2023-09-13',
    nextScheduledCleaning: '2026-03-13',
    location: { lat: -20.17, lng: -19.14 },
    lastInspection: {
      date: '2021-01-18',
      overallCondition: '20%',
      foulingType: 'Craca, alga e limo'
    }
  },
  {
    id: 'csi',
    name: 'CARLA SILVA',
    sigla: 'CSI',
    class: 'Aframax',
    type: 'Petroleiro',
    deadweight: 114365,
    length: 249,
    beam: 43.8,
    draft: 15,
    depth: 21,
    status: 'port',
    bioScore: 25,
    fuelPenalty: 5,
    lastCleaning: '2025-10-10',
    nextScheduledCleaning: '2026-04-10',
    location: { lat: -23.0068, lng: -44.3189, port: 'Angra dos Reis' },
    lastInspection: {
      date: '2025-10-10',
      overallCondition: '2-3 NORMAN',
      foulingType: 'NORMAN'
    }
  },
  {
    id: 'reg',
    name: 'RENATO GOMES',
    sigla: 'REG',
    class: 'Aframax',
    type: 'Petroleiro',
    deadweight: 114481,
    length: 249,
    beam: 43.8,
    draft: 15,
    depth: 21,
    status: 'navigating',
    bioScore: 68,
    fuelPenalty: 16,
    lastCleaning: '2025-09-22',
    nextScheduledCleaning: '2026-03-22',
    location: { lat: 51.9244, lng: 4.4777, port: 'Rotterdam' },
    lastInspection: {
      date: '2025-09-22',
      overallCondition: '20%',
      foulingType: 'Moles'
    }
  },
  {
    id: 'gma',
    name: 'GABRIELA MARTINS',
    sigla: 'GMA',
    class: 'Aframax',
    type: 'Petroleiro',
    deadweight: 114441,
    length: 249,
    beam: 43.8,
    draft: 15,
    depth: 21,
    status: 'navigating',
    bioScore: 42,
    fuelPenalty: 9,
    lastCleaning: '2024-04-13',
    nextScheduledCleaning: '2025-10-13',
    location: { lat: -25.2536, lng: -48.2733, port: 'Paranaguá' }
  },
  {
    id: 'rpi',
    name: 'RODRIGO PINHEIRO',
    sigla: 'RPI',
    class: 'Aframax',
    type: 'Petroleiro',
    deadweight: 114434,
    length: 249,
    beam: 43.8,
    draft: 15,
    depth: 21,
    status: 'port',
    bioScore: 38,
    fuelPenalty: 8,
    lastCleaning: '2024-08-26',
    nextScheduledCleaning: '2026-02-26',
    location: { lat: 25.2760, lng: 56.3418, port: 'Fujairah' },
    lastInspection: {
      date: '2023-08-16',
      overallCondition: '80%',
      foulingType: 'Craca, alga e limo'
    }
  },
  {
    id: 'edc',
    name: 'EDUARDO COSTA',
    sigla: 'EDC',
    class: 'MR 2',
    type: 'Petroleiro',
    deadweight: 48501,
    length: 182.85,
    beam: 32.2,
    draft: 12.8,
    depth: 18.6,
    status: 'port',
    bioScore: 18,
    fuelPenalty: 4,
    lastCleaning: '2025-01-11',
    nextScheduledCleaning: '2025-07-11',
    location: { lat: -23.8104, lng: -45.4002, port: 'São Sebastião' },
    lastInspection: {
      date: '2025-01-11',
      overallCondition: '10%',
      foulingType: 'Moles e duras'
    }
  },
  {
    id: 'thf',
    name: 'THIAGO FERNANDES',
    sigla: 'THF',
    class: 'MR 2',
    type: 'Petroleiro',
    deadweight: 48573,
    length: 182.85,
    beam: 32.2,
    draft: 12.8,
    depth: 18.6,
    status: 'navigating',
    bioScore: 55,
    fuelPenalty: 12,
    lastCleaning: '2023-01-18',
    nextScheduledCleaning: '2025-12-18',
    location: { lat: -5.7945, lng: -35.2110 }
  },
  {
    id: 'ros',
    name: 'ROMARIO SILVA',
    sigla: 'ROS',
    class: 'MR 2',
    type: 'Petroleiro',
    deadweight: 48449,
    length: 182.85,
    beam: 32.2,
    draft: 12.8,
    depth: 18.6,
    status: 'maintenance',
    bioScore: 70,
    fuelPenalty: 17,
    lastCleaning: '2025-11-10',
    nextScheduledCleaning: '2026-05-10',
    location: { lat: -23.8104, lng: -45.4002, port: 'São Sebastião' },
    lastInspection: {
      date: '2025-11-10',
      overallCondition: '70%',
      foulingType: 'Moles e duras'
    }
  },
  {
    id: 'lme',
    name: 'LUCAS MENDONÇA',
    sigla: 'LME',
    class: 'MR 2',
    type: 'Petroleiro',
    deadweight: 48573,
    length: 182.85,
    beam: 32.2,
    draft: 12.8,
    depth: 18.6,
    status: 'anchor',
    bioScore: 28,
    fuelPenalty: 5,
    lastCleaning: '2024-02-13',
    nextScheduledCleaning: '2025-08-13',
    location: { lat: -22.9068, lng: -43.1729, port: 'Rio de Janeiro' }
  },
  {
    id: 'rib',
    name: 'RICARDO BARBOSA',
    sigla: 'RIB',
    class: 'Gaseiro 7k',
    type: 'Gaseiro',
    deadweight: 5079,
    length: 117.63,
    beam: 19.2,
    draft: 5.8,
    depth: 9.25,
    status: 'navigating',
    bioScore: 12,
    fuelPenalty: 2,
    lastCleaning: '2025-10-06',
    nextScheduledCleaning: '2026-04-06',
    location: { lat: -8.0539, lng: -34.8811, port: 'Recife' }
  },
  {
    id: 'brl',
    name: 'BRUNO LIMA',
    sigla: 'BRL',
    class: 'Gaseiro 7k',
    type: 'Gaseiro',
    deadweight: 5095,
    length: 117.63,
    beam: 19.2,
    draft: 5.8,
    depth: 9.25,
    status: 'port',
    bioScore: 60,
    fuelPenalty: 14,
    lastCleaning: '2024-05-08',
    nextScheduledCleaning: '2025-11-08',
    location: { lat: -8.4073, lng: -34.9032, port: 'Ipojuca' },
    lastInspection: {
      date: '2024-05-08',
      overallCondition: '60%',
      foulingType: 'Cracas e limo'
    }
  },
  {
    id: 'fsa',
    name: 'FÁBIO SANTOS',
    sigla: 'FSA',
    class: 'Gaseiro 7k',
    type: 'Gaseiro',
    deadweight: 5092,
    length: 117.63,
    beam: 19.2,
    draft: 5.8,
    depth: 9.25,
    status: 'navigating',
    bioScore: 5,
    fuelPenalty: 0,
    lastCleaning: '2024-08-10',
    nextScheduledCleaning: '2026-02-10',
    location: { lat: -3.7172, lng: -38.5433, port: 'Fortaleza' },
    lastInspection: {
      date: '2024-08-10',
      overallCondition: '0%',
      foulingType: 'N/A'
    }
  },
  {
    id: 'mva',
    name: 'MARIA VALENTINA',
    sigla: 'MVA',
    class: 'Gaseiro 7k',
    type: 'Gaseiro',
    deadweight: 5097,
    length: 117.63,
    beam: 19.2,
    draft: 5.8,
    depth: 9.25,
    status: 'port',
    bioScore: 5,
    fuelPenalty: 0,
    lastCleaning: '2024-11-04',
    nextScheduledCleaning: '2026-05-04',
    location: { lat: -3.7172, lng: -38.5433, port: 'Fortaleza' },
    lastInspection: {
      date: '2024-11-04',
      overallCondition: '0%',
      foulingType: 'N/A'
    }
  }
];

export const maintenanceSchedule: MaintenanceRecord[] = [
  { id: 'm1', shipId: 'rma', shipName: 'RAUL MARTINS', date: '2025-05-10', type: 'Especial', status: 'completed', estimatedCost: 850000, location: 'Gibraltar' },
  { id: 'm2', shipId: 'pmo', shipName: 'PAULO MOURA', date: '2025-11-01', type: 'Especial', status: 'scheduled', estimatedCost: 920000 },
  { id: 'm3', shipId: 'rib', shipName: 'RICARDO BARBOSA', date: '2025-10-06', type: 'Especial', status: 'completed', estimatedCost: 180000, location: 'Recife' },
  { id: 'm4', shipId: 'gic', shipName: 'GISELLE CARVALHO', date: '2025-03-22', type: 'Especial', status: 'completed', estimatedCost: 890000, location: 'Angra dos Reis' },
  { id: 'm5', shipId: 'frb', shipName: 'FELIPE RIBEIRO', date: '2024-06-20', type: 'Especial', status: 'completed', estimatedCost: 910000, location: 'Salvador' },
  { id: 'm6', shipId: 'reg', shipName: 'RENATO GOMES', date: '2024-01-07', type: 'Especial', status: 'completed', estimatedCost: 450000, location: 'Rotterdam' },
  { id: 'm7', shipId: 'csi', shipName: 'CARLA SILVA', date: '2024-02-26', type: 'Especial', status: 'completed', estimatedCost: 440000, location: 'Angra dos Reis' },
  { id: 'm8', shipId: 'gma', shipName: 'GABRIELA MARTINS', date: '2024-04-13', type: 'Especial', status: 'completed', estimatedCost: 460000, location: 'Paranaguá' },
  { id: 'm9', shipId: 'lme', shipName: 'LUCAS MENDONÇA', date: '2024-02-13', type: 'Especial', status: 'completed', estimatedCost: 220000, location: 'Rio de Janeiro' },
  { id: 'm10', shipId: 'rpi', shipName: 'RODRIGO PINHEIRO', date: '2024-08-26', type: 'Especial', status: 'completed', estimatedCost: 470000, location: 'Fujairah' },
  { id: 'm11', shipId: 'dap', shipName: 'DANIEL PEREIRA', date: '2023-09-13', type: 'Especial', status: 'completed', estimatedCost: 430000, location: 'Salvador' },
  { id: 'm12', shipId: 'ros', shipName: 'ROMARIO SILVA', date: '2025-11-10', type: 'IWS', status: 'completed', estimatedCost: 95000, location: 'São Sebastião' },
  { id: 'm13', shipId: 'hal', shipName: 'HENRIQUE ALVES', date: '2025-09-26', type: 'IWS', status: 'completed', estimatedCost: 120000, location: 'Singapura' },
  { id: 'm14', shipId: 'ras', shipName: 'RAFAEL SANTOS', date: '2025-08-23', type: 'IWS', status: 'completed', estimatedCost: 115000, location: 'Angra dos Reis' },
  { id: 'm15', shipId: 'csi', shipName: 'CARLA SILVA', date: '2025-10-10', type: 'IWS', status: 'completed', estimatedCost: 85000, location: 'Angra dos Reis' },
  { id: 'm16', shipId: 'reg', shipName: 'RENATO GOMES', date: '2025-08-17', type: 'IWS', status: 'completed', estimatedCost: 90000, location: 'Rotterdam' },
  { id: 'm17', shipId: 'brl', shipName: 'BRUNO LIMA', date: '2025-11-08', type: 'IWS', status: 'scheduled', estimatedCost: 65000, location: 'Ipojuca' },
  { id: 'm18', shipId: 'edc', shipName: 'EDUARDO COSTA', date: '2025-01-11', type: 'IWS', status: 'completed', estimatedCost: 75000, location: 'São Sebastião' },
];

export const costData = {
  cleaningCostPerM2: {
    underwater: 45, // USD per m²
    drydock: 85,
    iws: 35
  },
  fuelCostPerTon: 650, // USD per ton of fuel
  co2EmissionPerTonFuel: 3.114, // tons CO2 per ton fuel
  carbonCreditPrice: 45, // USD per ton CO2
};

export const getFleetStats = () => {
  const total = ships.length;
  const navigating = ships.filter(s => s.status === 'navigating').length;
  const inPort = ships.filter(s => s.status === 'port').length;
  const maintenance = ships.filter(s => s.status === 'maintenance').length;
  const atAnchor = ships.filter(s => s.status === 'anchor').length;
  
  const avgBioScore = ships.reduce((sum, s) => sum + s.bioScore, 0) / total;
  const avgFuelPenalty = ships.reduce((sum, s) => sum + s.fuelPenalty, 0) / total;
  
  const criticalShips = ships.filter(s => s.bioScore >= 60).length;
  const cleanShips = ships.filter(s => s.bioScore < 30).length;
  
  return {
    total,
    navigating,
    inPort,
    maintenance,
    atAnchor,
    avgBioScore: Math.round(avgBioScore),
    avgFuelPenalty: avgFuelPenalty.toFixed(1),
    criticalShips,
    cleanShips
  };
};

export const getBioScoreColor = (score: number): string => {
  if (score < 30) return 'text-success';
  if (score < 60) return 'text-warning';
  return 'text-destructive';
};

export const getBioScoreBadge = (score: number): string => {
  if (score < 30) return 'status-badge-success';
  if (score < 60) return 'status-badge-warning';
  return 'status-badge-danger';
};

export const getStatusColor = (status: Ship['status']): string => {
  switch (status) {
    case 'navigating': return 'text-ocean';
    case 'port': return 'text-success';
    case 'maintenance': return 'text-warning';
    case 'anchor': return 'text-muted-foreground';
    default: return 'text-foreground';
  }
};
