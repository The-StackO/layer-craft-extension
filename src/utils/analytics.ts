import { analytics } from '#analytics';

export const trackEvent = (eventName: string, eventProperties?: Record<string, string>) => {
  try {
    analytics.track(eventName, eventProperties);
  } catch (error) {
    console.warn('Analytics tracking failed:', error);
  }
};

export const autoTrack = (container: Document | ShadowRoot | Element) => {
  try {
    analytics.autoTrack(container);
  } catch (error) {
    console.warn('Analytics autoTrack failed:', error);
  }
};
