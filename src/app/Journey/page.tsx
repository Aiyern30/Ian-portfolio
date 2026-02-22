import { redirect } from "next/navigation";
import { locales } from "@/i18n/locales/request";

export default function JourneyRedirectPage() {
  const defaultLocale = locales[0];
  redirect(`/${defaultLocale}/Journey`);
}
