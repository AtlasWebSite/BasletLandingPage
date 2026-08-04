type EventName = 
  | "cta_header_click"
  | "cta_hero_click"
  | "cta_secondary_hero_click"
  | "cta_demo_click"
  | "resource_cta_click"
  | "cta_assurance_click"
  | "feature_view"
  | "plan_select"
  | "faq_toggle"
  | "cta_final_click"
  | "app_access";

export const trackEvent = (eventName: EventName, properties?: Record<string, unknown>) => {
  if (typeof window !== "undefined") {
    if ((window as unknown as { gtag?: Function }).gtag) {
      (window as unknown as { gtag: Function }).gtag("event", eventName, properties);
    }
    console.log(`[Analytics Event]: ${eventName}`, properties || {});
  }
};
