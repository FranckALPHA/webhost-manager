// Mock data for relances

export interface Relance {
  id: string;
  client: string;
  domaine: string;
  expiration: string;
  niveau: string;
  status: string;
}

export const relances: Relance[] = [
  { id: "652dl", client: "TAMO Jean Sammuel", domaine: "amec.com", expiration: "2024-01-15", niveau: "Moyen", status: "Envoyé" },
  { id: "783km", client: "Digital Corp", domaine: "digital.ci", expiration: "2024-02-20", niveau: "Élevé", status: "En attente" },
  { id: "456np", client: "StartUp Dev", domaine: "startup.ci", expiration: "2024-03-10", niveau: "Faible", status: "Envoyé" },
  { id: "921qr", client: "Agence Web Pro", domaine: "webpro.ci", expiration: "2024-03-15", niveau: "Moyen", status: "Envoyé" },
  { id: "357st", client: "Tech Solutions", domaine: "techsolutions.ci", expiration: "2024-03-20", niveau: "Élevé", status: "En attente" },
];
