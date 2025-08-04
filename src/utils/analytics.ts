import { analytics } from '#analytics';

export const trackEvent = (eventName: string, eventProperties?: Record<string, string>) => {
  analytics.track(eventName, eventProperties);
};

export const autoTrack = (container: Document | ShadowRoot | Element) => {
  analytics.autoTrack(container);
};
