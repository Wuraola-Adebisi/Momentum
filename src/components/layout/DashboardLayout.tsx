import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />

        <main className="mx-auto w-full max-w-content flex-1 overflow-y-auto overflow-x-hidden p-4 pb-24 md:p-8 md:pb-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
