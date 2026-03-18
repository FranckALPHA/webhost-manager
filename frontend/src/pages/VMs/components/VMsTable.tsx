import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Play, Square, RotateCw, Pause, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface VM {
  id: number;
  os: string;
  cpu: number;
  ram: number;
  disk: number;
  ip_address: string;
  statut: string;
}

interface VMsTableProps {
  vms: VM[];
  onAction?: (id: number, action: "start" | "stop" | "restart" | "suspend") => void;
  onDelete?: (id: number) => void;
}

export const VMsTable = ({ vms, onAction, onDelete }: VMsTableProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="uppercase text-xs font-semibold tracking-wider">OS</TableHead>
              <TableHead className="uppercase text-xs font-semibold tracking-wider">IP Address</TableHead>
              <TableHead className="uppercase text-xs font-semibold tracking-wider">Resources (C/R/D)</TableHead>
              <TableHead className="uppercase text-xs font-semibold tracking-wider">Statut</TableHead>
              <TableHead className="uppercase text-xs font-semibold tracking-wider">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vms.map((vm) => (
              <TableRow key={vm.id}>
                <TableCell className="font-medium">{vm.os}</TableCell>
                <TableCell className="text-muted-foreground">{vm.ip_address}</TableCell>
                <TableCell className="text-muted-foreground">
                  {vm.cpu} vCPU / {vm.ram} GB / {vm.disk} GB
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    vm.statut === 'running' ? 'bg-green-100 text-green-700' : 
                    vm.statut === 'arrêtée' ? 'bg-gray-100 text-gray-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {vm.statut}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" size="icon" className="h-8 w-8 text-green-600"
                      disabled={vm.statut === 'running'}
                      onClick={() => onAction?.(vm.id, "start")}
                      title="Démarrer"
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" size="icon" className="h-8 w-8 text-red-600"
                      disabled={vm.statut === 'arrêtée'}
                      onClick={() => onAction?.(vm.id, "stop")}
                      title="Arrêter"
                    >
                      <Square className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" size="icon" className="h-8 w-8 text-blue-600"
                      disabled={vm.statut !== 'running'}
                      onClick={() => onAction?.(vm.id, "restart")}
                      title="Redémarrer"
                    >
                      <RotateCw className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" size="icon" className="h-8 w-8 text-yellow-600"
                      disabled={vm.statut !== 'running'}
                      onClick={() => onAction?.(vm.id, "suspend")}
                      title="Suspendre"
                    >
                      <Pause className="h-4 w-4" />
                    </Button>
                    <div className="mx-1 h-4 w-[1px] bg-border" />
                    <Button 
                      variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10"
                      onClick={() => onDelete?.(vm.id)}
                      title="Supprimer la simulation"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
