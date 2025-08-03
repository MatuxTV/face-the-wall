import { redirect } from "next/navigation";

const supportedLanguages = ["en", "sk"];

export default function Home() {
  // Get the browser's preferred language
  const browserLang =
    typeof window !== "undefined" ? navigator.language.slice(0, 2) : "en";

  // Check if the browser's language is supported
  const lang = supportedLanguages.includes(browserLang) ? browserLang : "en";

  // Redirect to the appropriate language page
  redirect(`/${lang}`);

  return null; // This will never render because of the redirect
}