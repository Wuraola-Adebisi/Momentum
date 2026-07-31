import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Analytics from "./pages/Analytics";

import DashboardLayout from "./components/layout/DashboardLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import { Inbox } from "lucide-react";
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
  ErrorBoundary,
} from "./components/ui";

function DesignSystem() {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-paper p-10 space-y-10">
      <h1 className="text-2xl font-bold">Design System</h1>

      <Card>
        <h2 className="mb-3 font-semibold">Buttons</h2>
        <div className="flex gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </Card>

      <Card>
        <h2 className="mb-3 font-semibold">Inputs</h2>
        <Input placeholder="Type here..." />
      </Card>

      <Card>
        <h2 className="mb-3 font-semibold">Badges</h2>
        <div className="flex gap-2">
          <Badge variant="applied">Applied</Badge>
          <Badge variant="interviewing">Interviewing</Badge>
          <Badge variant="offer">Offer</Badge>
        </div>
      </Card>

      <Card>
        <h2 className="mb-3 font-semibold">Avatar</h2>
        <Avatar name="Tech Corp" />
      </Card>

      <Card>
        <h2 className="mb-3 font-semibold">Skeleton</h2>
        <Skeleton className="h-6 w-full" />
      </Card>

      <Card>
        <EmptyState
          icon={Inbox}
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
          onSelect={(value) => console.log(value)}
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
        <h2 className="mb-3 font-semibold">Modal</h2>

        <Button onClick={() => setModalOpen(true)}>Open modal</Button>

        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <h3 className="mb-2 font-semibold">Modal title</h3>

          <p className="mb-4 text-sm text-muted">
            This is a preview of the Modal primitive.
          </p>

          <Button onClick={() => setModalOpen(false)}>Close</Button>
        </Modal>
      </Card>

      <Card>
        <h2 className="mb-3 font-semibold">Drawer</h2>

        <Button onClick={() => setDrawerOpen(true)}>Open drawer</Button>

        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <div className="p-6">
            <h3 className="mb-2 font-semibold">Drawer title</h3>

            <p className="mb-4 text-sm text-muted">
              This is a preview of the Drawer primitive.
            </p>

            <Button onClick={() => setDrawerOpen(false)}>Close</Button>
          </div>
        </Drawer>
      </Card>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ErrorBoundary label="Home">
            <Homepage />
          </ErrorBoundary>
        }
      />

      <Route
        path="/login"
        element={
          <ErrorBoundary label="Login">
            <LoginPage />
          </ErrorBoundary>
        }
      />
      <Route
        path="/reset-password"
        element={
          <ErrorBoundary label="Reset password">
            <ResetPasswordPage />
          </ErrorBoundary>
        }
      />

      <Route
        path="/design-system"
        element={
          <ErrorBoundary label="Design system">
            <DesignSystem />
          </ErrorBoundary>
        }
      />

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/dashboard"
          element={
            <ErrorBoundary label="Dashboard">
              <Dashboard />
            </ErrorBoundary>
          }
        />
        <Route
          path="/applications"
          element={
            <ErrorBoundary label="Applications">
              <Applications />
            </ErrorBoundary>
          }
        />
        <Route
          path="/analytics"
          element={
            <ErrorBoundary label="Analytics">
              <Analytics />
            </ErrorBoundary>
          }
        />
      </Route>
    </Routes>
  );
}