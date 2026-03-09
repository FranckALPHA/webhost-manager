import { Card, CardContent } from "@/components/ui/card";
import { Bell, CheckCircle, AlertTriangle, Info } from "lucide-react";

export interface Notification {
  id: string;
  titre: string;
  message: string;
  date: string;
  type: "warning" | "info" | "success";
}

const iconMap = {
  warning: <AlertTriangle className="h-5 w-5 text-warning" />,
  info: <Info className="h-5 w-5 text-info" />,
  success: <CheckCircle className="h-5 w-5 text-success" />,
};

const bgMap = {
  warning: "bg-warning/10",
  info: "bg-info/10",
  success: "bg-success/10",
};

interface NotificationItemProps {
  notification: Notification;
}

export const NotificationItem = ({ notification }: NotificationItemProps) => {
  return (
    <Card>
      <CardContent className="flex items-start gap-4 p-4">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${bgMap[notification.type]}`}>
          {iconMap[notification.type]}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">{notification.titre}</p>
            <span className="text-xs text-muted-foreground">{notification.date}</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{notification.message}</p>
        </div>
      </CardContent>
    </Card>
  );
};
