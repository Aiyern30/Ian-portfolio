import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n/locales/request";

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,

  // Used when no locale matches
  defaultLocale: "en",

  // Always use a locale prefix for non-default locales
  localePrefix: "always",
});

export const config = {
  // Match only internationalized pathnames
  // Skip all paths that should not be internationalized
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
