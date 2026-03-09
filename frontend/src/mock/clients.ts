// Mock data for clients

export interface Client {
  id: number;
  nom: string;
  email: string;
  telephone: string;
  nbHebergement: string;
}

export const clients: Client[] = [
  { id: 1, nom: "Global Solutions", email: "contact@globalsol.com", telephone: "+237 659 632 154", nbHebergement: "01" },
  { id: 2, nom: "Digital Corp", email: "contact@digitalcorp.com", telephone: "+237 678 456 123", nbHebergement: "03" },
  { id: 3, nom: "StartUp Dev", email: "hello@startupdev.ci", telephone: "+237 691 234 567", nbHebergement: "02" },
  { id: 4, nom: "Agence Web Pro", email: "info@webpro.ci", telephone: "+237 655 789 012", nbHebergement: "05" },
  { id: 5, nom: "Tech Solutions", email: "contact@techsolutions.ci", telephone: "+237 682 345 678", nbHebergement: "04" },
  { id: 6, nom: "E-Commerce Plus", email: "support@ecommerceplus.ci", telephone: "+237 699 876 543", nbHebergement: "02" },
];
