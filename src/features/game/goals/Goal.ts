import { ParseKeys } from "i18next"
import i18n from "../../../i18n"
import { selectedDeckTheme } from "../../settings/deckThemes"

export const goalIds = [
  "goal1A",
  "goal1B",
  "goal1C",
  "goal1D",
  "goal1E",
  "goal1F",
  "goal1G",
  "goal1H",
  "goal1I",
  "goal1J",
  "goal1K",
  "goal1L",
  "goal1M",
  "goal1N",
  "goal1O",
  "goal2A",
  "goal2B",
  "goal2C",
  "goal2D",
  "goal2E",
  "goal2F",
] as const
export type GoalId = (typeof goalIds)[number]

export class Goal {
  readonly id: GoalId
  readonly img: string
  readonly description: string

  constructor(id: GoalId) {
    this.id = id
    this.img = selectedDeckTheme.getImageById.goal(id)
    this.description = i18n.t(`goals.${id}` as ParseKeys)
  }
}

export interface ActiveGoals {
  sheriff: Goal
  train: Goal
  ranch: Goal
}

// organize goals by biomes and types
export const goalDeck: {
  desert: {
    sheriff: GoalId[]
    ranch: GoalId[]
    train: GoalId[]
  }
  forestSpecific: {
    sheriff: GoalId[]
    ranch: GoalId[]
    train: GoalId[]
  }
} = {
  desert: {
    sheriff: ["goal1A", "goal1B", "goal1C", "goal1D", "goal1E"],
    ranch: ["goal1F", "goal1G", "goal1H", "goal1I", "goal1J"],
    train: ["goal1K", "goal1L", "goal1M", "goal1N", "goal1O"],
  },
  forestSpecific: {
    sheriff: ["goal2A", "goal2B", "goal2C"],
    ranch: ["goal2D"],
    train: ["goal2E", "goal2F"],
  },
}
