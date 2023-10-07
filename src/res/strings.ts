import { localizedStrings as enStrings } from "./strings/strings.en"
import { localizedStrings as itStrings } from "./strings/strings.it"

const lang: "en" | "it" = "en"

function getStrings(): LocalizedStrings {
  switch (lang) {
    case "it":
      return itStrings
    case "en":
      return enStrings
    default:
      return enStrings
  }
}

export type LocalizedStrings = {
  goals: {
    goal1A: string
    goal1B: string
    goal1C: string
    goal1D: string
    goal1E: string
    goal1F: string
    goal1G: string
    goal1H: string
    goal1I: string
    goal1J: string
    goal1K: string
    goal1L: string
    goal1M: string
    goal1N: string
    goal1O: string
    goal2A: string
    goal2B: string
    goal2C: string
    goal2D: string
    goal2E: string
    goal2F: string
  }
  company: {
    companyC1: string
    companyC2: string
    companyC3: string
    companyC4: string
    companyC5: string
    companyC6: string
    companyC7: string
    companyC8: string
    companyC9: string
    companyC10: string
  }
}

export const strings: LocalizedStrings = getStrings()
