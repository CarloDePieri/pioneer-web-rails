import { DeckTheme } from "../../features/settings/DeckTheme"

export const originalThemeBuilder = (): DeckTheme => {
  let root = "/images/licensed"
  const url = (path: string): string => `${root}/${path}.png`
  const companyUrl = (name: string): string => url(`company/${name}`)
  const goalUrl = (name: string): string => url(`goals/${name}`)

  // noinspection DuplicatedCode
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
    goals: {
      goal1A: goalUrl("goal1A"),
      goal1B: goalUrl("goal1B"),
      goal1C: goalUrl("goal1C"),
      goal1D: goalUrl("goal1D"),
      goal1E: goalUrl("goal1E"),
      goal1F: goalUrl("goal1F"),
      goal1G: goalUrl("goal1G"),
      goal1H: goalUrl("goal1H"),
      goal1I: goalUrl("goal1I"),
      goal1J: goalUrl("goal1J"),
      goal1K: goalUrl("goal1K"),
      goal1L: goalUrl("goal1L"),
      goal1M: goalUrl("goal1M"),
      goal1N: goalUrl("goal1N"),
      goal1O: goalUrl("goal1O"),
      goal2A: goalUrl("goal2A"),
      goal2B: goalUrl("goal2B"),
      goal2C: goalUrl("goal2C"),
      goal2D: goalUrl("goal2D"),
      goal2E: goalUrl("goal2E"),
      goal2F: goalUrl("goal2F"),
    },
  }
}
