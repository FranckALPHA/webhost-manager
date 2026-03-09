import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";

interface Stat {
  label: string;
  value: string;
  suffix: string;
  badge: string;
  badgeColor: string;
  color: string;
}

interface PaiementsStatsProps {
  stats: Stat[];
}

export const PaiementsStats = ({ stats }: PaiementsStatsProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className={`${stat.color} border`}>
          <CardContent className="p-5">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-2">
              {stat.label}
              <Info className="h-3.5 w-3.5" />
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              <span className="text-sm font-medium text-muted-foreground">{stat.suffix}</span>
            </div>
            <span className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${stat.badgeColor}`}>
              {stat.badge}
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
