import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export interface Certificat {
  id: number;
  hebergement_id: number;
  nom_domaine: string;
  date_emission: string;
  date_expiration: string;
  issuer: string;
  statut: string;
}

interface CertificatsTableProps {
  certificats: Certificat[];
}

export const CertificatsTable = ({ certificats }: CertificatsTableProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="uppercase text-xs font-semibold tracking-wider">Domaine</TableHead>
              <TableHead className="uppercase text-xs font-semibold tracking-wider">Émetteur</TableHead>
              <TableHead className="uppercase text-xs font-semibold tracking-wider">Émission</TableHead>
              <TableHead className="uppercase text-xs font-semibold tracking-wider">Expiration</TableHead>
              <TableHead className="uppercase text-xs font-semibold tracking-wider">Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {certificats.map((cert) => (
              <TableRow key={cert.id}>
                <TableCell className="font-medium">{cert.nom_domaine}</TableCell>
                <TableCell className="text-muted-foreground">{cert.issuer}</TableCell>
                <TableCell className="text-muted-foreground">{new Date(cert.date_emission).toLocaleDateString()}</TableCell>
                <TableCell className="text-muted-foreground">{new Date(cert.date_expiration).toLocaleDateString()}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${cert.statut === 'valide' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {cert.statut}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
