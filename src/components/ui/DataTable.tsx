import React,{useState} from "react";
import { ArrowDown,ArrowUp } from "lucide-react";

export interface Column<T>{ key:keyof T; header:string; sortable?:boolean; render?:(row:T)=>React.ReactNode; }
interface DataTableProps<T>{ data:T[]; columns:Column<T>[]; onRowClick?:(row:T)=>void; getRowId?:(row:T)=>string; }
type SortDirection="asc"|"desc";

export function DataTable<T>({data,columns,onRowClick,getRowId}:DataTableProps<T>){
  const [sortKey,setSortKey]=useState<keyof T|null>(null);
  const [direction,setDirection]=useState<SortDirection>("asc");
  const sortedData=React.useMemo(()=>{
    if(!sortKey)return data;
    return [...data].sort((a,b)=>{
      const av=a[sortKey],bv=b[sortKey];
      if(av==null&&bv==null)return 0;if(av==null)return 1;if(bv==null)return -1;
      const result=String(av).localeCompare(String(bv),undefined,{numeric:true,sensitivity:"base"});
      return direction==="asc"?result:-result;
    });
  },[data,sortKey,direction]);
  const handleSort=(key:keyof T)=>{if(sortKey===key)setDirection(p=>p==="asc"?"desc":"asc");else{setSortKey(key);setDirection("asc");}};
  return <div className="w-full overflow-hidden rounded-2xl border border-line/80 bg-surface shadow-[0_1px_0_rgba(16,33,59,0.03)]">
    <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-sm">
      <thead><tr className="border-b border-line/70 bg-paper/70">
        {columns.map(col=><th key={String(col.key)} scope="col" className="p-4 text-left font-medium text-muted">
          {col.sortable ? <button type="button" onClick={()=>handleSort(col.key)} className="inline-flex min-h-9 items-center gap-1.5 rounded-md px-1 text-left hover:text-ink" aria-label={"Sort by "+col.header}>
            {col.header}{sortKey===col.key&&(direction==="asc"?<ArrowUp size={13} aria-hidden="true"/>:<ArrowDown size={13} aria-hidden="true"/>)}
          </button> : col.header}
        </th>)}
      </tr></thead>
      <tbody>{sortedData.map((row,i)=><tr key={getRowId?getRowId(row):i} className={`border-b border-line/60 last:border-0 transition-colors hover:bg-paper/60 ${onRowClick?"cursor-pointer":""}`} onClick={()=>onRowClick?.(row)}>
        {columns.map(col=><td key={String(col.key)} className="p-4 align-middle text-ink">{col.render?col.render(row):String(row[col.key]??"")}</td>)}
      </tr>)}</tbody>
    </table></div>
  </div>;
}