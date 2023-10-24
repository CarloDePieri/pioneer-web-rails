import { DeckTheme } from "../../features/settings/DeckTheme"

export const originalThemeBuilder = (): DeckTheme => {
  let root = "/images/licensed"
  const url = (path: string): string => `${root}/${path}.png`
  const companyUrl = (name: string): string => url(`company/${name}`)

  return {
    company: {
      companyC1: companyUrl("companyC1"),
      companyC2: companyUrl("companyC2"),
      companyC3: companyUrl("companyC3"),
      companyC4: companyUrl("companyC4"),
      companyC5: companyUrl("companyC5"),
      companyC6: companyUrl("companyC6"),
      companyC7: companyUrl("companyC7"),
      companyC8: companyUrl("companyC8"),
      companyC9: companyUrl("companyC9"),
      companyC10: companyUrl("companyC10"),
    },
  }
}
