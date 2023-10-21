import { Draft } from "@reduxjs/toolkit"
import { RootState } from "../../../app/store"
import { images } from "../../../res/images"

import { GameState } from "../gameSlice"
import { pickRandom } from "../helpers"

export interface Goal {
  id: string
  img: string | undefined
}

export interface Goals {
  sheriff: Goal | undefined
  train: Goal | undefined
  ranch: Goal | undefined
}

export const initialGoals: Goals = {
  sheriff: undefined,
  train: undefined,
  ranch: undefined,
}

export const goalsSelector = {
  activeGoals: (state: RootState) => state.gameState.present.goals,
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
            .filter((goal) => !["1A", "1B", "1C", "1E"].includes(goal.id))
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

export const goalDeck: {
  desert: {
    sheriff: Goal[]
    ranch: Goal[]
    train: Goal[]
  }
  forestSpecific: {
    sheriff: Goal[]
    ranch: Goal[]
    train: Goal[]
  }
} = {
  desert: {
    sheriff: [
      {
        id: "goal1A",
        img: images.goals?.goal1A,
      },
      {
        id: "goal1B",
        img: images.goals?.goal1B,
      },
      {
        id: "goal1C",
        img: images.goals?.goal1C,
      },
      {
        id: "goal1D",
        img: images.goals?.goal1D,
      },
      {
        id: "goal1E",
        img: images.goals?.goal1E,
      },
    ],
    ranch: [
      {
        id: "goal1F",
        img: images.goals?.goal1F,
      },
      {
        id: "goal1G",
        img: images.goals?.goal1G,
      },
      {
        id: "goal1H",
        img: images.goals?.goal1H,
      },
      {
        id: "goal1I",
        img: images.goals?.goal1I,
      },
      {
        id: "goal1J",
        img: images.goals?.goal1J,
      },
    ],
    train: [
      {
        id: "goal1K",
        img: images.goals?.goal1K,
      },
      {
        id: "goal1L",
        img: images.goals?.goal1L,
      },
      {
        id: "goal1M",
        img: images.goals?.goal1M,
      },
      {
        id: "goal1N",
        img: images.goals?.goal1N,
      },
      {
        id: "goal1O",
        img: images.goals?.goal1O,
      },
    ],
  },
  forestSpecific: {
    sheriff: [
      {
        id: "goal2A",
        img: images.goals?.goal2A,
      },
      {
        id: "goal2B",
        img: images.goals?.goal2B,
      },
      {
        id: "goal2C",
        img: images.goals?.goal2C,
      },
    ],
    ranch: [
      {
        id: "goal2D",
        img: images.goals?.goal2D,
      },
    ],
    train: [
      {
        id: "goal2E",
        img: images.goals?.goal2E,
      },
      {
        id: "goal2F",
        img: images.goals?.goal2F,
      },
    ],
  },
}
