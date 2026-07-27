import { Card } from "../ui/Card";

interface AvgResponseTimeCardProps {
  avgResponseDays: number | null;
}

export function AvgResponseTimeCard({ avgResponseDays }: AvgResponseTimeCardProps) {
  return (
    <Card padding="lg">
      <h3 className="font-body text-sm font-medium text-muted">
        Avg. time to response
      </h3>

      {avgResponseDays === null ? (
        <>
          <p className="mt-1 font-display text-3xl font-semibold text-ink sm:text-4xl">
            N/A
          </p>
          <p className="mt-1 font-body text-sm text-muted">
            No responses logged yet, this fills in once a status changes.
          </p>
        </>
      ) : (
        <>
          <p className="mt-1 font-data text-3xl font-semibold text-ink sm:text-4xl">
            {avgResponseDays}
            <span className="ml-1 font-body text-lg font-normal text-muted">
              days
            </span>
          </p>
          <p className="mt-1 font-body text-sm text-muted">
            from applied date to first status change
          </p>
        </>
      )}
    </Card>
  );
}