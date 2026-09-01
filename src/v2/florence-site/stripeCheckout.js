const UPGRADE_INTENT_KEY = "florence-upgrade-intent";
const SYSTEM_UPGRADE_URL = "/florence/system?upgrade=pro";

export function startFlorenceCheckout() {
  try {
    sessionStorage.setItem(UPGRADE_INTENT_KEY, "1");
    localStorage.setItem(UPGRADE_INTENT_KEY, "1");
  } catch {
    /* ignore */
  }

  window.location.assign(SYSTEM_UPGRADE_URL);
}
