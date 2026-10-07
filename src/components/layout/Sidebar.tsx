import { NavLink } from "react-router-dom";
import { LayoutDashboard,BriefcaseBusiness,BarChart3 } from "lucide-react";
import clsx from "clsx";

const navigation=[{name:"Dashboard",href:"/dashboard",icon:LayoutDashboard},{name:"Applications",href:"/applications",icon:BriefcaseBusiness},{name:"Analytics",href:"/analytics",icon:BarChart3}];

export default function Sidebar(){
  return <>
    <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-line/70 bg-surface/85 backdrop-blur md:flex">
      <div className="flex h-20 items-center px-7">
        <NavLink to="/dashboard" className="flex items-baseline gap-2" aria-label="Momentum home">
          <span className="font-display text-3xl text-ink">Momentum</span><span className="font-data text-[9px] uppercase tracking-[0.18em] text-primary">career OS</span>
        </NavLink>
      </div>
      <nav aria-label="Primary" className="flex flex-col gap-1 px-4">
        {navigation.map(({name,href,icon:Icon})=><NavLink key={href} to={href} className={({isActive})=>clsx("group flex min-h-11 items-center gap-3 rounded-xl px-3.5 text-sm font-medium",isActive?"bg-ink text-paper shadow-soft":"text-muted hover:bg-paper hover:text-ink")}>
          <Icon size={18} strokeWidth={1.9} aria-hidden="true"/><span>{name}</span>
        </NavLink>)}
      </nav>
      <div className="mt-auto border-t border-line/70 px-7 py-6"><p className="eyebrow">Keep moving</p><p className="mt-2 text-sm leading-6 text-muted">Track the work between applications, interviews, and offers.</p></div>
    </aside>
    <nav aria-label="Primary" className="fixed inset-x-0 bottom-0 z-20 flex h-16 items-center justify-around border-t border-line/80 bg-surface/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
      {navigation.map(({name,href,icon:Icon})=><NavLink key={href} to={href} className={({isActive})=>clsx("flex min-h-11 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl text-[11px] font-medium",isActive?"text-primary":"text-muted")}>
        <Icon size={19} strokeWidth={1.9} aria-hidden="true"/><span>{name}</span>
      </NavLink>)}
    </nav>
  </>;
}