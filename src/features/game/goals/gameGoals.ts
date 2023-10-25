import { createSelector, Draft } from "@reduxjs/toolkit"
import { RootState } from "../../../app/store"

import { GameState } from "../gameSlice"
import { pickRandom } from "../helpers"
import { ActiveGoals, Goal, goalDeck, GoalId, goalIds } from "./Goal"

export interface ActiveGoalIds {
  sheriff: GoalId
  train: GoalId
  ranch: GoalId
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
