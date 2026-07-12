import { NavLink } from "react-router-dom";
import { LayoutDashboard, BriefcaseBusiness, BarChart3 } from "lucide-react";
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
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
];

export default function Sidebar({ collapsed = false }: SidebarProps) {
  return (
    <>
      <aside
        className={clsx(
          "hidden md:flex md:h-screen md:flex-col border-r border-muted/20 bg-paper transition-all duration-300",
          collapsed ? "md:w-20" : "md:w-20 lg:w-64",
        )}
      >
        {/* Logo */}

        <div className="flex h-16 items-center justify-center px-3 lg:justify-start lg:px-6">
          <span className="font-display text-2xl font-bold text-primary lg:hidden">
            M
          </span>

          {!collapsed && (
            <span className="hidden font-display text-xl font-bold text-ink lg:inline">
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

                    "justify-center lg:justify-start lg:gap-3",
                    collapsed && "lg:justify-center",

                    isActive
                      ? "bg-primary text-white"
                      : "text-muted hover:bg-surface hover:text-ink",
                  )
                }
              >
                <Icon size={20} strokeWidth={2} />

                {!collapsed && (
                  <span className="hidden lg:inline">{item.name}</span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Mobile bottom tab bar */}

      <nav className="fixed inset-x-0 bottom-0 z-20 flex h-16 items-center justify-around border-t border-muted/20 bg-paper md:hidden">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                clsx(
                  "flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs font-medium transition-colors duration-200",
                  isActive ? "text-primary" : "text-muted",
                )
              }
            >
              <Icon size={20} strokeWidth={2} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
}
