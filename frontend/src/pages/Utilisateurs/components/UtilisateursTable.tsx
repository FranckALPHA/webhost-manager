import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Lock, Copy, MoreHorizontal } from "lucide-react";

export interface Utilisateur {
  id: string;
  nom: string;
  email: string;
  role: string;
  date: string;
  actionPassword: "generate" | "copy";
}

interface UtilisateursTableProps {
  utilisateurs: Utilisateur[];
  onGeneratePassword?: (utilisateur: Utilisateur) => void;
  onCopyPassword?: (utilisateur: Utilisateur) => void;
  onMoreActions?: (utilisateur: Utilisateur) => void;
}

export const UtilisateursTable = ({
  utilisateurs,
  onGeneratePassword,
  onCopyPassword,
  onMoreActions,
}: UtilisateursTableProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="h-14 text-base font-medium uppercase text-foreground">
                ID
              </TableHead>
              <TableHead className="h-14 text-base font-medium uppercase text-foreground">
                Noms & Prenoms
              </TableHead>
              <TableHead className="h-14 text-base font-medium uppercase text-foreground">
                Emails
              </TableHead>
              <TableHead className="h-14 text-base font-medium uppercase text-foreground">
                Role
              </TableHead>
              <TableHead className="h-14 text-base font-medium uppercase text-foreground">
                Date
              </TableHead>
              <TableHead className="h-14 text-base font-medium uppercase text-foreground">
                Password
              </TableHead>
              <TableHead className="h-14 text-base font-medium uppercase text-foreground">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {utilisateurs.map((u, idx) => (
              <TableRow key={`${u.id}-${idx}`}>
                <TableCell className="text-foreground">{u.id}</TableCell>
                <TableCell className="font-medium text-foreground">{u.nom}</TableCell>
                <TableCell className="text-foreground">{u.email}</TableCell>
                <TableCell className="text-foreground">{u.role}</TableCell>
                <TableCell className="text-foreground">{u.date}</TableCell>
                <TableCell>
                  {u.actionPassword === "generate" ? (
                    <Button
                      size="sm"
                      className="h-8 px-4"
                      onClick={() => onGeneratePassword?.(u)}
                    >
                      <Lock className="mr-1.5 h-3.5 w-3.5" />
                      Générer mot de passe
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="h-8 px-4"
                      onClick={() => onCopyPassword?.(u)}
                    >
                      <Copy className="mr-1.5 h-3.5 w-3.5" />
                      Copier
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  <button
                    className="text-foreground/80 transition-colors hover:text-foreground"
                    onClick={() => onMoreActions?.(u)}
                    aria-label="Actions"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="px-6 py-3 text-sm text-muted-foreground">
          0 lignes sur {utilisateurs.length} sélectionnées
        </div>
      </CardContent>
    </Card>
  );
};
