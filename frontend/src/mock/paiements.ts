// Mock data for paiements

export interface Paiement {
  id: string;
  client: string;
  prix: string;
  date: string;
  methode: string;
  status: string;
}

export const paiements: Paiement[] = [
  { id: "652dl", client: "ACME TECH", prix: "185 000 FCFA", date: "2024-01-15", methode: "VISA", status: "En cours" },
  { id: "783km", client: "DIGITAL CORP", prix: "320 000 FCFA", date: "2024-02-20", methode: "MasterCard", status: "En cours" },
  { id: "456np", client: "STARTUP DEV", prix: "500 000 FCFA", date: "2024-03-10", methode: "VISA", status: "En cours" },
  { id: "921qr", client: "WEB PRO", prix: "800 000 FCFA", date: "2024-03-15", methode: "PayPal", status: "En cours" },
  { id: "357st", client: "TECH SOLUTIONS", prix: "1 500 000 FCFA", date: "2024-03-20", methode: "VISA", status: "En cours" },
  { id: "864uv", client: "E-COMMERCE PLUS", prix: "250 000 FCFA", date: "2024-03-25", methode: "MasterCard", status: "En cours" },
];
