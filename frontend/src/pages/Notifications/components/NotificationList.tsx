import { Bell } from "lucide-react";
import { Notification, NotificationItem } from "./NotificationItem";

interface NotificationListProps {
  notifications: Notification[];
}

export const NotificationList = ({ notifications }: NotificationListProps) => {
  return (
    <div>
      <div className="space-y-4 p-6">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Bell className="h-4 w-4" />
          <span className="text-sm">{notifications.length} notifications</span>
        </div>

        <div className="space-y-3">
          {notifications.map((n) => (
            <NotificationItem key={n.id} notification={n} />
          ))}
        </div>
      </div>
    </div>
  );
};
