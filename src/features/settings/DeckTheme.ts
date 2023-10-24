import { openThemeBuilder } from "../../res/deckThemes/themeOpen"
import { originalThemeBuilder } from "../../res/deckThemes/themeOriginal"
import { CompanyId } from "../game/company/gameCompany"

export interface DeckTheme {
  company: Record<CompanyId, string>
}

type availableDeckNames = "open" | "original"
const availableDeckThemes: Record<availableDeckNames, DeckTheme> = {
  open: openThemeBuilder(),
  original: originalThemeBuilder(),
}
export const licensed: boolean =
  import.meta.env.VITE_LICENSED_IMAGES === "true" || false
const selectedDeckTheme = licensed
  ? availableDeckThemes.original
  : availableDeckThemes.open

export const getImageById = {
  company: (id: CompanyId): string => {
    return selectedDeckTheme.company[id]
  },
}
