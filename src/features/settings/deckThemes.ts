import { openThemeBuilder } from "../../res/deckThemes/themeOpen"
import { originalThemeBuilder } from "../../res/deckThemes/themeOriginal"
import { DeckTheme } from "./DeckTheme"

type availableDeckNames = "open" | "original"
const availableDeckThemes: Record<availableDeckNames, DeckTheme> = {
  open: openThemeBuilder,
  original: originalThemeBuilder,
}

const licensed: boolean =
  import.meta.env.VITE_LICENSED_IMAGES === "true" || true
export const selectedDeckTheme = licensed
  ? availableDeckThemes.original
  : availableDeckThemes.open
