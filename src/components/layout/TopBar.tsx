import { Search, Plus } from "lucide-react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Avatar } from "../ui/Avatar";

export default function TopBar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-muted/20 bg-paper px-4 md:px-8">

      {/* Search */}

      <div className="relative w-full max-w-[10rem] sm:max-w-xs md:max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
        />

        <Input
          placeholder="Search applications..."
          className="pl-10"
        />
      </div>

      {/* Actions */}

      <div className="ml-4 flex items-center gap-2 md:ml-8 md:gap-4">

        <Button variant="accent">
          <Plus size={18} />
          <span className="hidden sm:inline">Add Application</span>
        </Button>

        <Avatar name="Wuraola Adebisi" />
      </div>
    </header>
  );
}