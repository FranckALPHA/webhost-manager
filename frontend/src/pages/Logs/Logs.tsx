import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const Logs = () => {
  const { data: logs, isLoading } = useQuery({
    queryKey: ["logs"],
    queryFn: () => api.logs.getAll(),
  });

  if (isLoading) return <div className="p-6">Chargement des logs...</div>;

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Audit Logs</h1>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Ressource</TableHead>
                <TableHead>Détails</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs?.map((log: any) => (
                <TableRow key={log.id}>
                  <TableCell className="text-sm">
                    {new Date(log.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell>ID: {log.user_id}</TableCell>
                  <TableCell>
                    <Badge variant={log.action === 'DELETE' ? 'destructive' : 'default'}>
                      {log.action}
                    </Badge>
                  </TableCell>
                  <TableCell>{log.resource} (#{log.resource_id})</TableCell>
                  <TableCell className="max-w-xs truncate text-xs text-muted-foreground">
                    {log.details}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Logs;
