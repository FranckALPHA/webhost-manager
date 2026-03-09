import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";

interface Stat {
  label: string;
  value: number;
  color: string;
}

interface RelancesStatsProps {
  stats: Stat[];
}

export const RelancesStats = ({ stats }: RelancesStatsProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className={`${stat.color} border`}>
          <CardContent className="p-5">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
              {stat.label}
              <Info className="h-3.5 w-3.5" />
            </div>
            <p className="text-4xl font-bold text-foreground">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
