import { NotificationList } from "./components/NotificationList";
import { notifications } from "@/mock/notifications";

export const Notifications = () => {
  return (
    <div>
      <NotificationList notifications={notifications} />
    </div>
  );
};

export default Notifications;
