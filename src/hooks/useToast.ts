import { useCallback, useContext } from "react";
import { ToastContext } from "../context/toast-context";

export function useToast() {
  const { showToast, dismissToast } = useContext(ToastContext);

  const success = useCallback(
    (message: string) => showToast("success", message),
    [showToast],
  );

  const error = useCallback(
    (message: string) => showToast("error", message),
    [showToast],
  );

  return { success, error, dismiss: dismissToast };
}