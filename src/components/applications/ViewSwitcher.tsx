import { useSearchParams } from "react-router-dom";
import { LayoutGrid, Table2 } from "lucide-react";
import { Button } from "../ui";

export function ViewSwitcher() {
  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get("view") === "board" ? "board" : "table";

  function setView(next: "board" | "table") {
    const params = new URLSearchParams(searchParams);
    if (next === "table") {
      params.delete("view");
    } else {
      params.set("view", next);
    }
    setSearchParams(params);
  }

  return (
    <div className="inline-flex rounded-md border border-muted/20 p-0.5 bg-surface">
      <Button
        size="sm"
        variant={view === "table" ? "accent" : "ghost"}
        onClick={() => setView("table")}
        aria-pressed={view === "table"}
      >
        <Table2 size={16} />
        <span className="hidden sm:inline">Table</span>
      </Button>
      <Button
        size="sm"
        variant={view === "board" ? "accent" : "ghost"}
        onClick={() => setView("board")}
        aria-pressed={view === "board"}
      >
        <LayoutGrid size={16} />
        <span className="hidden sm:inline">Board</span>
      </Button>
    </div>
  );
}