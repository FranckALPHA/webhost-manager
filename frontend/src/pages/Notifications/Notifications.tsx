import { useQuery } from "@tanstack/react-query";
import { NotificationList } from "./components/NotificationList";
import { api } from "@/lib/api";

export const Notifications = () => {
  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => api.notifications.getAll(),
  });

  if (isLoading) return <div className="p-6">Chargement des notifications...</div>;

  return (
    <div className="space-y-6">
      <div className="p-6 pb-0">
        <h1 className="text-2xl font-bold">Centre de notifications</h1>
      </div>
      <NotificationList notifications={notifications || []} />
    </div>
  );
};

export default Notifications;
