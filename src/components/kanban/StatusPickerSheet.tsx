import { Modal, Button } from "../ui";
import type { Application, ApplicationStatus } from "../../types";

interface StatusPickerSheetProps {
  application: Application | null;
  onClose: () => void;
  onSelect: (status: ApplicationStatus) => void;
}

const STATUS_OPTIONS: { label: string; value: ApplicationStatus }[] = [
  { label: "Applied", value: "applied" },
  { label: "Interviewing", value: "interviewing" },
  { label: "Offer", value: "offer" },
  { label: "Rejected", value: "rejected" },
];

export function StatusPickerSheet({ application, onClose, onSelect }: StatusPickerSheetProps) {
  return (
    <Modal open={application !== null} onClose={onClose}>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-display font-semibold text-ink">Move application</h2>
          {application && (
            <p className="text-sm text-muted mt-1">
              {application.roleTitle} at {application.companyName}
            </p>
          )}
        </div>

        <div className="space-y-2">
          {STATUS_OPTIONS.map((option) => (
            <Button
              key={option.value}
              variant={application?.status === option.value ? "accent" : "secondary"}
              className="w-full justify-start"
              disabled={application?.status === option.value}
              onClick={() => onSelect(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>

        <div className="flex justify-end pt-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}