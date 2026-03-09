// Mock data for hébergements

export interface Hebergement {
  id: string;
  domaine: string;
  type: string;
  client: string;
  dateSouscription: string;
  dateExpiration: string;
  status: string;
}

export const hebergements: Hebergement[] = [
  {
    id: "652dl",
    domaine: "acme-website.com",
    type: "VPS",
    client: "Acme Corporation",
    dateSouscription: "2024-01-15",
    dateExpiration: "2025-01-15",
    status: "En cours",
  },
  {
    id: "783km",
    domaine: "digital.ci",
    type: "Mutualisé",
    client: "Digital Corp",
    dateSouscription: "2024-03-01",
    dateExpiration: "2025-03-01",
    status: "En cours",
  },
  {
    id: "456np",
    domaine: "startup.ci",
    type: "Dédié",
    client: "StartUp Dev",
    dateSouscription: "2024-02-10",
    dateExpiration: "2025-02-10",
    status: "En cours",
  },
  {
    id: "921qr",
    domaine: "webpro.ci",
    type: "VPS",
    client: "Agence Web Pro",
    dateSouscription: "2024-04-20",
    dateExpiration: "2025-04-20",
    status: "En cours",
  },
  {
    id: "357st",
    domaine: "techsolutions.ci",
    type: "Cloud",
    client: "Tech Solutions",
    dateSouscription: "2024-05-15",
    dateExpiration: "2025-05-15",
    status: "En cours",
  },
  {
    id: "864uv",
    domaine: "ecommerceplus.ci",
    type: "VPS",
    client: "E-Commerce Plus",
    dateSouscription: "2024-06-01",
    dateExpiration: "2025-06-01",
    status: "En cours",
  },
  {
    id: "219wx",
    domaine: "monsite.ci",
    type: "Mutualisé",
    client: "Société XYZ",
    dateSouscription: "2024-01-10",
    dateExpiration: "2025-01-10",
    status: "En cours",
  },
  {
    id: "572yz",
    domaine: "innovation.ci",
    type: "Dédié",
    client: "Innovation Labs",
    dateSouscription: "2024-07-01",
    dateExpiration: "2025-07-01",
    status: "En cours",
  },
];
