export const WORKSHOP_START = new Date("2026-08-29T16:00:00Z").getTime();
export const WORKSHOP_END = new Date("2026-08-29T20:00:00Z").getTime();

export function getWorkshopCountdown(now = Date.now()) {
  if (now >= WORKSHOP_END) return { status: "Workshop ended" };
  if (now >= WORKSHOP_START) return { status: "Live now" };

  const totalSeconds = Math.max(0, Math.floor((WORKSHOP_START - now) / 1000));
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60
  };
}
