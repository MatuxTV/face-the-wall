// TypeScript types for localization
export interface NavigationTranslations {
  home: string;
  about: string;
  music: string;
  shows: string;
  contact: string;
}

export interface ButtonTranslations {
  listenUs: string;
  followUs: string;
  tourDates: string;
}

export interface HeroTranslations {
  subtitle: string;
  listenButton: string;
  followers: string;
  albums: string;
  songs: string;
  tourDivTitle: string;
  tourDivSubtitle: string;
}

export interface AboutTranslations {
  title: string;
  description1: string;
  description2: string;
  description3: string;
  description4: string;
  description5: string;
  tile1: string;
  tile2: string;
  tile3: string;
  tile4: string;
}

export interface ourMusicTranslations {
  title: string;
  description: string;
}

export interface tourDatesTranslations {
  title: string;
  description: string;
  dates: {
    date: string;
    location: string;
    venue: string;
    status: string;
    href: string;
  }[];
}

export interface ContactTranslations {
  title: string;
  description: string;
  name: string;
  email: string;
  message: string;
  required: string;
  successMessage: string;
  errorMessage: string;
  submit: string;
}

export interface LocalizationData {
  nav: NavigationTranslations;
  buttons: ButtonTranslations;
  hero: HeroTranslations;
  about: AboutTranslations;
  our_music: ourMusicTranslations;
  tour: tourDatesTranslations;
  contact: ContactTranslations;
}

// Supported locales
export const SUPPORTED_LOCALES = ["sk", "en"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

// Default locale
export const DEFAULT_LOCALE: SupportedLocale = "sk";

// Type guard to check if a locale is supported
export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}

// Helper function to get safe locale
export function getSafeLocale(locale: string): SupportedLocale {
  return isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
}
