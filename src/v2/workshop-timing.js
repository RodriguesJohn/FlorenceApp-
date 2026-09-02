export const MASTERCLASS_URL =
  "https://maven.com/p/5e5901/ai-native-design-systems-masterclass";
export const MASTERCLASS_DATE_LABEL = "September 9 · 12:00 PM PDT";
export const MASTERCLASS_ARIA =
  "Register for the free AI Native Design Systems Masterclass on September 9 at 12:00 PM Pacific Daylight Time";

export const WORKSHOP_START = new Date("2026-09-09T19:00:00Z").getTime();
export const WORKSHOP_END = new Date("2026-09-09T19:45:00Z").getTime();

export function getWorkshopCountdown(now = Date.now()) {
  if (now >= WORKSHOP_END) return { status: "Masterclass ended" };
  if (now >= WORKSHOP_START) return { status: "Live now" };

  const totalSeconds = Math.max(0, Math.floor((WORKSHOP_START - now) / 1000));
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60
  };
}
