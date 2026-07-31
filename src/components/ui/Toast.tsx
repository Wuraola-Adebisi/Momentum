import React from "react";
import clsx from "clsx";
import { CheckCircle2, AlertCircle, X } from "lucide-react";
import type { ToastItem, ToastVariant } from "../../context/toast-context";

interface ToastViewportProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

const VARIANT_STYLES: Record<ToastVariant, string> = {
  success: "border-status-offer/30 text-status-offer",
  error: "border-status-rejected/30 text-status-rejected",
};

const VARIANT_ICONS: Record<ToastVariant, typeof CheckCircle2> = {
  success: CheckCircle2,
  error: AlertCircle,
};

export const ToastViewport: React.FC<ToastViewportProps> = ({
  toasts,
  onDismiss,
}) => {
  if (toasts.length === 0) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 right-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2 sm:bottom-6 sm:right-6 sm:w-full"
    >
      {toasts.map((toast) => {
        const Icon = VARIANT_ICONS[toast.variant];
        return (
          <div
            key={toast.id}
            className={clsx(
              "motion-safe:animate-toast-in flex items-start gap-3 rounded-xl border bg-surface p-4 shadow-lg",
              VARIANT_STYLES[toast.variant],
            )}
          >
            <Icon size={20} className="mt-0.5 shrink-0" />
            <p className="flex-1 font-body text-sm text-ink">{toast.message}</p>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              aria-label="Dismiss notification"
              className="shrink-0 text-muted transition-colors hover:text-ink"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};