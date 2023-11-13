import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { store } from "./app/store"
import { setLanguage } from "./features/settings/settingsSlice"
import * as en from "./res/strings/en.json"
import * as it from "./res/strings/it.json"

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS
    resources: (typeof resources)["en-US"]
  }
}

export const defaultNS = "translation"

export const resources = {
  "en-US": en,
  "it-IT": it,
}

i18n.on("languageChanged", (newLocale: string) => {
  try {
    // inform the store that the language has changed, so that dependant components can be re-rendered
    store.dispatch(setLanguage(newLocale))
  } catch (error) {
    if (error instanceof ReferenceError) {
      // the languageDetector set the language before the store was ready... try again in 1 second
      setTimeout(() => {
        store.dispatch(setLanguage(newLocale))
      }, 1000)
    } else {
      throw error
    }
  }
})

i18n
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: false,
    fallbackLng: "en-US",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources,
    defaultNS,
  })

export default i18n
