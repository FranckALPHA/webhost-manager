// Mock data for utilisateurs

export interface Utilisateur {
  id: string;
  nom: string;
  email: string;
  role: string;
  date: string;
  actionPassword: "generate" | "copy";
}

export const utilisateurs: Utilisateur[] = [
  {
    id: "652dl",
    nom: "TAMO Jean Sammuel",
    email: "jean.tamo@webhost.com",
    role: "admin",
    date: "2024-01-15",
    actionPassword: "generate",
  },
  {
    id: "783km",
    nom: "KAMGA Marie",
    email: "marie.kamga@webhost.com",
    role: "user",
    date: "2024-02-10",
    actionPassword: "copy",
  },
  {
    id: "456np",
    nom: "NGASSA Pierre",
    email: "pierre.ngassa@webhost.com",
    role: "user",
    date: "2024-03-05",
    actionPassword: "copy",
  },
  {
    id: "921qr",
    nom: "FOFANA Aissata",
    email: "aissata.fofana@webhost.com",
    role: "admin",
    date: "2024-03-20",
    actionPassword: "generate",
  },
];
