import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-paper">

      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">

        <TopBar />

        <main className="flex-1 overflow-auto p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
}