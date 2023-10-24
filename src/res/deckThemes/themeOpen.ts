import { DeckTheme } from "../../features/settings/DeckTheme"

export const openThemeBuilder = (): DeckTheme => {
  let root = "/images/publicDomain"
  const url = (path: string, ext: string): string => `${root}/${path}.${ext}`
  const companyUrl = (name: string) => url(`company/${name}`, "png")

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
