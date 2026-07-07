import { Search, Plus } from "lucide-react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Avatar } from "../ui/Avatar";

export default function TopBar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-paper px-8">

      {/* Search */}

      <div className="relative w-full max-w-md">
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

      <div className="ml-8 flex items-center gap-4">

        <Button>
          <Plus size={18} />
          Add Application
        </Button>

        <Avatar name="Wuraola Adebisi" />
      </div>
    </header>
  );
}