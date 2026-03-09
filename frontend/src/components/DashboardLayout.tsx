import { Outlet } from "react-router-dom";
import AppSidebar from "@/components/AppSidebar";
import AppBar from "@/components/AppBar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="ml-56 flex-1 flex flex-col">
        <AppBar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
