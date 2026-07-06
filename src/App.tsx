import { Routes, Route, Link } from "react-router-dom";

import { Button } from "./components/ui/Button";
import { Card } from "./components/ui/Card";
import { Badge } from "./components/ui/Badge";
import { Avatar } from "./components/ui/Avatar";
import { Input } from "./components/ui/Input";
import { Skeleton } from "./components/ui/Skeleton";
import { EmptyState } from "./components/ui/EmptyState";
import { Modal } from "./components/ui/Modal";
import { Drawer } from "./components/ui/Drawer";
import { Tooltip } from "./components/ui/Tooltip";
import { Dropdown } from "./components/ui/Dropdown";
import { DataTable } from "./components/ui/DataTable";

function DesignSystem() {
  return (
    <div className="p-10 space-y-10">

      <h1 className="text-2xl font-bold">Design System</h1>

      {/* Buttons */}
      <Card>
        <h2 className="font-semibold mb-3">Buttons</h2>
        <div className="flex gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </Card>

      {/* Inputs */}
      <Card>
        <h2 className="font-semibold mb-3">Inputs</h2>
        <Input placeholder="Type here..." />
      </Card>

      {/* Badges */}
      <Card>
        <h2 className="font-semibold mb-3">Badges</h2>
        <div className="flex gap-2">
          <Badge variant="applied">Applied</Badge>
          <Badge variant="interviewing">Interviewing</Badge>
          <Badge variant="offer">Offer</Badge>
        </div>
      </Card>

      {/* Avatar */}
      <Card>
        <h2 className="font-semibold mb-3">Avatar</h2>
        <Avatar name="Tech Corp" />
      </Card>

      {/* Skeleton */}
      <Card>
        <h2 className="font-semibold mb-3">Skeleton</h2>
        <Skeleton className="h-6 w-full" />
      </Card>

      {/* Empty State */}
      <Card>
        <EmptyState
          title="No data"
          description="This is a preview state"
        />
      </Card>

      {/* Tooltip */}
      <Card>
        <Tooltip content="Hello tooltip">
          <Button variant="ghost">Hover me</Button>
        </Tooltip>
      </Card>

      {/* Dropdown */}
      <Card>
        <Dropdown
          label="Select"
          options={[
            { label: "One", value: "1" },
            { label: "Two", value: "2" },
          ]}
          onSelect={(v) => console.log(v)}
        />
      </Card>

      {/* Table */}
      <Card>
        <DataTable
          data={[
            { a: "Alpha", b: "Beta" },
            { a: "Gamma", b: "Delta" },
          ]}
          columns={[
            { key: "a", header: "Column A", sortable: true },
            { key: "b", header: "Column B", sortable: true },
          ]}
        />
      </Card>

    </div>
  );
}

function Home() {
  return (
    <div className="p-10 space-y-4">
      <h1 className="text-xl font-bold">Momentum</h1>

      <Link to="/design-system">
        <Button>Go to Design System</Button>
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/design-system" element={<DesignSystem />} />
    </Routes>
  );
}