import { createSelector, Draft } from "@reduxjs/toolkit"
import { ParseKeys } from "i18next"
import { RootState } from "../../../app/store"
import i18n from "../../../i18n"
import { getImageById } from "../../settings/DeckTheme"

import { GameState } from "../gameSlice"
import { pickRandom } from "../helpers"

const goalIds = [
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

// Goal and ActiveGoals are returned by selectors and used in components
export class Goal {
  readonly id: GoalId
  readonly img: string
  readonly description: string

  constructor(id: GoalId) {
    this.id = id
    this.img = getImageById.goal(id)
    this.description = i18n.t(`goals.${id}` as ParseKeys)
  }
}

export interface ActiveGoals {
  sheriff: Goal
  train: Goal
  ranch: Goal
}

export const goalsSelector = {
  activeGoals: createSelector(
    [
      (state: RootState) => state.gameState.present.goals,
      // this dependency is needed to rebuild the component on language change
      (state: RootState) => state.settings.lang,
    ],
    (goals: ActiveGoalIds, _: string): ActiveGoals => {
      return {
        sheriff: new Goal(goals.sheriff),
        train: new Goal(goals.train),
        ranch: new Goal(goals.ranch),
      }
    },
  ),
}

// ActiveGoalsIds are used in the state reducer actions
export interface ActiveGoalIds {
  sheriff: GoalId
  train: GoalId
  ranch: GoalId
}

export const initialGoals: ActiveGoalIds = {
  sheriff: goalIds[0],
  train: goalIds[0],
  ranch: goalIds[0],
}

export const goals = (state: Draft<GameState>) => {
  return {
    init() {
      let sheriffGoal
      let ranchGoal
      let trainGoal
      if (state.config.forestMap) {
        // shuffle in the forest specific goals
        sheriffGoal = pickRandom(
          goalDeck.desert.sheriff
            // remove the desert goals specified in the rules
            .filter((goalId) => !["1A", "1B", "1C", "1E"].includes(goalId))
            .concat(goalDeck.forestSpecific.sheriff),
        )
        ranchGoal = pickRandom(
          goalDeck.desert.ranch.concat(goalDeck.forestSpecific.ranch),
        )
        trainGoal = pickRandom(
          goalDeck.desert.train.concat(goalDeck.forestSpecific.train),
        )
      } else {
        sheriffGoal = pickRandom(goalDeck.desert.sheriff)
        ranchGoal = pickRandom(goalDeck.desert.ranch)
        trainGoal = pickRandom(goalDeck.desert.train)
      }
      state.goals.sheriff = sheriffGoal
      state.goals.ranch = ranchGoal
      state.goals.train = trainGoal
    },
  }
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
