// Mock data for dashboard

export interface Stat {
  label: string;
  value: number;
}

export interface ChartData {
  month: string;
  ventes: number;
}

export interface PaiementRecent {
  client: string;
  montant: string;
  date: string;
}

export interface HebergementExpirant {
  domaine: string;
  client: string;
  expiration: string;
}

export interface ClientARelancer {
  nom: string;
  montant: string;
  jours: number;
}

export const stats: Stat[] = [
  { label: "Clients", value: 10 },
  { label: "Hébergements", value: 9 },
  { label: "Paiements", value: 10 },
  { label: "Expirations", value: 10 },
];

export const chartData: ChartData[] = [
  { month: "Jan", ventes: 35 },
  { month: "Fev", ventes: 45 },
  { month: "Mar", ventes: 55 },
  { month: "Avr", ventes: 38 },
  { month: "Mai", ventes: 42 },
  { month: "Jui", ventes: 48 },
  { month: "Jul", ventes: 25 },
  { month: "Aou", ventes: 30 },
  { month: "Sep", ventes: 52 },
  { month: "Oct", ventes: 45 },
  { month: "Nov", ventes: 58 },
  { month: "Dec", ventes: 70 },
];

export const derniersPaiements: PaiementRecent[] = [
  { client: "Entreprise ABC", montant: "500 000 F", date: "01/03/2026" },
  { client: "Société XYZ", montant: "320 000 F", date: "28/02/2026" },
  { client: "Agence Web Pro", montant: "800 000 F", date: "27/02/2026" },
  { client: "Tech Solutions", montant: "1 500 000 F", date: "25/02/2026" },
];

export const hebergementsExpirants: HebergementExpirant[] = [
  { domaine: "digital.ci", client: "Digital Corp", expiration: "31/03/2026" },
  { domaine: "startup.ci", client: "StartUp Dev", expiration: "10/03/2026" },
];

export const clientsARelancer: ClientARelancer[] = [
  { nom: "Digital Corp", montant: "2 800 000 F", jours: 62 },
  { nom: "StartUp Dev", montant: "1 500 000 F", jours: 51 },
];
