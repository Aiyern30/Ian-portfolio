import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

// Define your supported locales
export const locales = ["en", "ms", "zh"] as const;
export type Locale = (typeof locales)[number];
const defaultLocale: Locale = "en";

export default getRequestConfig(async ({ locale }) => {
  // Use default locale when none is provided; 404 only on invalid locales.
  if (locale && !locales.includes(locale as Locale)) notFound();
  const resolvedLocale = (locale as Locale) ?? defaultLocale;
  const effectiveLocale = locales.includes(resolvedLocale)
    ? resolvedLocale
    : defaultLocale;

  return {
    locale: effectiveLocale,
    messages: (await import(`./${effectiveLocale}.json`)).default,
  };
});
