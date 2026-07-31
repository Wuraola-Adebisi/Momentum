import React from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "./Button";
import { Card } from "./Card";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  label?: string;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, info.componentStack);
  }

  handleRetry = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-[50vh] items-center justify-center p-4">
          <Card padding="lg" className="w-full max-w-md text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-status-rejected/10 text-status-rejected">
              <AlertTriangle size={26} />
            </div>

            <h2 className="font-display text-lg font-semibold text-ink">
              Something went wrong
            </h2>

            <p className="mt-1 font-body text-sm text-muted">
              {this.props.label
                ? `The ${this.props.label} page hit an unexpected error.`
                : "This part of the app hit an unexpected error."}{" "}
              Your data is safe, this is just a display problem.
            </p>

            <div className="mt-4 flex justify-center gap-3">
              <Button variant="ghost" onClick={this.handleRetry}>
                Try again
              </Button>
              <Button variant="primary" onClick={() => window.location.reload()}>
                Reload page
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}