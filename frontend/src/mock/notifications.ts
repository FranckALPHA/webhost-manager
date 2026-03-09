// Mock data for notifications

export interface Notification {
  id: number;
  type: "warning" | "info" | "success";
  titre: string;
  message: string;
  date: string;
}

export const notifications: Notification[] = [
  { id: 1, type: "warning", titre: "Hébergement expiré", message: "L'hébergement de Digital Corp (digital.ci) a expiré le 31/12/2025.", date: "Il y a 2h" },
  { id: 2, type: "info", titre: "Nouveau client", message: "E-Commerce Plus vient de créer un compte.", date: "Il y a 5h" },
  { id: 3, type: "success", titre: "Paiement reçu", message: "Tech Solutions a effectué un paiement de 15 000 000 F.", date: "Hier" },
  { id: 4, type: "warning", titre: "Relance automatique", message: "Une relance a été envoyée à StartUp Dev pour un montant de 1 500 000 F.", date: "Hier" },
  { id: 5, type: "info", titre: "Mise à jour système", message: "Le serveur principal a été mis à jour avec succès.", date: "Il y a 2 jours" },
  { id: 6, type: "success", titre: "Hébergement renouvelé", message: "L'hébergement de Société XYZ (monsite.ci) a été renouvelé.", date: "Il y a 3 jours" },
];
