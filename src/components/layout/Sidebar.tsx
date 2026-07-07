import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  CalendarDays,
  FileText,
  Settings,
} from "lucide-react";
import clsx from "clsx";

type SidebarProps = {
  collapsed?: boolean;
};

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Applications",
    href: "/applications",
    icon: BriefcaseBusiness,
  },
  {
    name: "Interviews",
    href: "/interviews",
    icon: CalendarDays,
  },
  {
    name: "Notes",
    href: "/notes",
    icon: FileText,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar({
  collapsed = false,
}: SidebarProps) {
  return (
    <aside
      className={clsx(
        "h-screen border-r border-gray-200 bg-paper transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}

      <div className="flex h-16 items-center px-6">
        {collapsed ? (
          <span className="mx-auto font-display text-2xl font-bold text-primary">
            M
          </span>
        ) : (
          <span className="font-display text-xl font-bold text-ink">
            Momentum
          </span>
        )}
      </div>

      {/* Navigation */}

      <nav className="mt-6 flex flex-col gap-2 px-3">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                clsx(
                  "flex items-center rounded-xl px-3 py-3 text-sm font-medium transition-colors duration-200",

                  collapsed ? "justify-center" : "gap-3",

                  isActive
                    ? "bg-primary text-white"
                    : "text-muted hover:bg-surface hover:text-ink"
                )
              }
            >
              <Icon size={20} strokeWidth={2} />

              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}