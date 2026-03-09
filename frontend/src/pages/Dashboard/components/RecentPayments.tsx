import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Payment {
  client: string;
  date: string;
  montant: string;
}

interface RecentPaymentsProps {
  payments: Payment[];
}

export const RecentPayments = ({ payments }: RecentPaymentsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Derniers paiements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {payments.map((p, i) => (
          <div key={i} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
            <div>
              <p className="text-sm font-medium text-foreground">{p.client}</p>
              <p className="text-xs text-muted-foreground">{p.date}</p>
            </div>
            <span className="text-sm font-semibold text-foreground">{p.montant}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
