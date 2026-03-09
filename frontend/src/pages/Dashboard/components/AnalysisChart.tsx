import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

interface ChartData {
  month: string;
  ventes: number;
}

interface AnalysisChartProps {
  data: ChartData[];
}

export const AnalysisChart = ({ data }: AnalysisChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Analyse</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorVentes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(230, 80%, 60%)" stopOpacity={0.15} />
                <stop offset="95%" stopColor="hsl(230, 80%, 60%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(220, 13%, 91%)" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(215, 16%, 47%)' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(215, 16%, 47%)' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(220, 20%, 10%)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: '13px',
              }}
              formatter={(value: number) => [`${value.toLocaleString()}`, "Ventes"]}
            />
            <Area
              type="monotone"
              dataKey="ventes"
              stroke="hsl(230, 80%, 60%)"
              fill="url(#colorVentes)"
              strokeWidth={2.5}
              dot={{ fill: 'hsl(230, 80%, 60%)', stroke: 'hsl(0, 0%, 100%)', strokeWidth: 2, r: 4 }}
              activeDot={{ fill: 'hsl(230, 80%, 60%)', stroke: 'hsl(0, 0%, 100%)', strokeWidth: 2, r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
