import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

import {
  Button,
  Card,
  Badge,
  Avatar,
  Input,
  Skeleton,
  EmptyState,
  Modal,
  Drawer,
  Tooltip,
  Dropdown,
  DataTable,
} from "./components/ui";

import ProtectedRoute from "./components/auth/ProtectedRoute";

function Home() {
  return (
    <div className="p-10 space-y-4 bg-paper min-h-screen">
      <h1 className="text-xl font-bold">Momentum</h1>

      <div className="flex gap-3">
        <Link to="/design-system">
          <Button>Design System</Button>
        </Link>

        <Link to="/login">
          <Button variant="secondary">Login Page</Button>
        </Link>

        <Link to="/dashboard">
          <Button variant="ghost">Dashboard (Protected)</Button>
        </Link>
      </div>

      <Card>
        <p className="text-gray-500 text-sm">
          Base shell working. Router + Auth layer now integrated.
        </p>
      </Card>
    </div>
  );
}

function DesignSystem() {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="p-10 space-y-10 bg-paper min-h-screen">

      <h1 className="text-2xl font-bold">Design System</h1>

      <Card>
        <h2 className="font-semibold mb-3">Buttons</h2>
        <div className="flex gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </Card>

      <Card>
        <h2 className="font-semibold mb-3">Inputs</h2>
        <Input placeholder="Type here..." />
      </Card>

      <Card>
        <h2 className="font-semibold mb-3">Badges</h2>
        <div className="flex gap-2">
          <Badge variant="applied">Applied</Badge>
          <Badge variant="interviewing">Interviewing</Badge>
          <Badge variant="offer">Offer</Badge>
        </div>
      </Card>

      <Card>
        <h2 className="font-semibold mb-3">Avatar</h2>
        <Avatar name="Tech Corp" />
      </Card>

      <Card>
        <h2 className="font-semibold mb-3">Skeleton</h2>
        <Skeleton className="h-6 w-full" />
      </Card>

      <Card>
        <EmptyState
          title="No data"
          description="This is a preview state"
        />
      </Card>

      <Card>
        <Tooltip content="Hello tooltip">
          <Button variant="ghost">Hover me</Button>
        </Tooltip>
      </Card>

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

      <Card>
        <h2 className="font-semibold mb-3">Modal</h2>
        <Button onClick={() => setModalOpen(true)}>Open modal</Button>

        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <h3 className="font-semibold mb-2">Modal title</h3>
          <p className="text-sm text-gray-500 mb-4">
            This is a preview of the Modal primitive.
          </p>
          <Button onClick={() => setModalOpen(false)}>Close</Button>
        </Modal>
      </Card>

      <Card>
        <h2 className="font-semibold mb-3">Drawer</h2>
        <Button onClick={() => setDrawerOpen(true)}>Open drawer</Button>

        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <div className="p-6">
            <h3 className="font-semibold mb-2">Drawer title</h3>
            <p className="text-sm text-gray-500 mb-4">
              This is a preview of the Drawer primitive.
            </p>
            <Button onClick={() => setDrawerOpen(false)}>Close</Button>
          </div>
        </Drawer>
      </Card>

    </div>
  );
}

function Dashboard() {
  return (
    <div className="p-10 space-y-3">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-gray-500">
        This route is protected. If you see this, auth is working.
      </p>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/design-system" element={<DesignSystem />} />

      {/* Protected route test */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}