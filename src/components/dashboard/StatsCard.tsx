import React from "react";
import clsx from "clsx";
import type { LucideIcon } from "lucide-react";
import { Card } from "../ui/Card";

type StatAccent = "primary" | "interviewing" | "offer" | "ink";
interface StatsCardProps { label:string; value:string; icon:LucideIcon; accent?:StatAccent; }

const ACCENT_STYLES:Record<StatAccent,{icon:string;rule:string}> = {
  primary:{icon:"bg-primary/10 text-primary",rule:"bg-primary"},
  interviewing:{icon:"bg-status-interviewing/10 text-status-interviewing",rule:"bg-status-interviewing"},
  offer:{icon:"bg-status-offer/10 text-status-offer",rule:"bg-status-offer"},
  ink:{icon:"bg-ink/10 text-ink",rule:"bg-ink"},
};

export const StatsCard:React.FC<StatsCardProps>=({label,value,icon:Icon,accent="primary"})=>{
  const style=ACCENT_STYLES[accent];
  return <Card padding="md" className="relative overflow-hidden">
    <div className={"absolute inset-x-0 top-0 h-1 " + style.rule} />
    <div className="flex items-start justify-between gap-4">
      <div><p className="eyebrow">{label}</p><p className="mt-3 font-data text-3xl font-medium tracking-[-0.04em] text-ink">{value}</p></div>
      <div className={clsx("flex h-10 w-10 shrink-0 items-center justify-center rounded-full",style.icon)}><Icon size={18} aria-hidden="true"/></div>
    </div>
  </Card>;
};