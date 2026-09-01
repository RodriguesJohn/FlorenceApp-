import { useFlorenceVisitCount } from "./useFlorenceVisitCount.js";

export function FlorenceVisitors() {
  const count = useFlorenceVisitCount();

  if (count == null) return null;

  return (
    <p className="florence-visitors">
      <span className="florence-visitors-label">Visitors</span>
      <span className="florence-visitors-count">
        {count.toLocaleString("en-US")}
      </span>
    </p>
  );
}
