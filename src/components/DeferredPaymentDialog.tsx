import { lazy, Suspense, useState } from "react";
const Checkout = lazy(() =>
  import("./PaymentDialog").then((module) => ({ default: module.PaymentDialog })),
);

export function PaymentDialog({ trigger }: { trigger: React.ReactNode }) {
  const [requested, setRequested] = useState(false);
  if (!requested) return <span onClick={() => setRequested(true)}>{trigger}</span>;
  return (
    <Suspense fallback={<span aria-busy="true">{trigger}</span>}>
      <Checkout trigger={trigger} initialOpen />
    </Suspense>
  );
}
