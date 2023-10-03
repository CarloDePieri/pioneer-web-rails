import { Draft } from "@reduxjs/toolkit"
import { GameState } from "../gameModel"
import { pickRandom } from "../helpers"

export interface Goal {
  id: string
  img: string
  description: string
}

export interface Goals {
  sheriff: Goal | undefined
  train: Goal | undefined
  ranch: Goal | undefined
}

export const goals = (state: Draft<GameState>) => {
  return {
    getActive: () => {
      return state.goals
    },
    init: () => {
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
        id: "1A",
        img: "goal1A.png",
        description: "Deliver 5 Gold Nuggets to Banks.",
      },
      {
        id: "1B",
        img: "goal1B.png",
        description: "Dig up 8 Gold Nuggets.",
      },
      {
        id: "1C",
        img: "goal1C.png",
        description: "Complete 2 Banks.",
      },
      {
        id: "1D",
        img: "goal1D.png",
        description: "Complete 3 Saloons.",
      },
      {
        id: "1E",
        img: "goal1E.png",
        description: "Complete 1 Fort.",
      },
    ],
    ranch: [
      {
        id: "1F",
        img: "goal1F.png",
        description: "Connect 3 Stations to the edges of the map.",
      },
      {
        id: "1G",
        img: "goal1G.png",
        description: "Build a track along 4 different Mountain ranges.",
      },
      {
        id: "1H",
        img: "goal1H.png",
        description: "Complete 5 ranches.",
      },
      {
        id: "1I",
        img: "goal1I.png",
        description: "Build 2 Tunnels from 2 different Stations.",
      },
      {
        id: "1J",
        img: "goal1J.png",
        description:
          "Complete 1 Building with tracks from more than 1 Station.",
      },
    ],
    train: [
      {
        id: "1K",
        img: "goal1K.png",
        description: "Connect to 6 Towns.",
      },
      {
        id: "1L",
        img: "goal1L.png",
        description: "Connect 3 Towns to the same Station.",
      },
      {
        id: "1M",
        img: "goal1M.png",
        description: "Build 2 Bridges from 2 different Stations.",
      },
      {
        id: "1N",
        img: "goal1N.png",
        description: "Connect 1 Town to 2 different Stations.",
      },
      {
        id: "1O",
        img: "goal1O.png",
        description: "Complete 2 Rail Yards.",
      },
    ],
  },
  forestSpecific: {
    sheriff: [
      {
        id: "2A",
        img: "goal2A.png",
        description: "Deliver 6 Bandits in Jails.",
      },
      {
        id: "2B",
        img: "goal2B.png",
        description:
          "Complete 2 Jails (this does not mean fill them with Bandits).",
      },
      {
        id: "2C",
        img: "goal2C.png",
        description: "Build 2 tracks along 3 different Forts.",
      },
    ],
    ranch: [
      {
        id: "2D",
        img: "goal2D.png",
        description:
          "Build tracks extending from 4 different Stations, connecting to Mountain ranges.",
      },
    ],
    train: [
      {
        id: "2E",
        img: "goal2E.png",
        description: "Connect to 3 Towns by Mountains.",
      },
      {
        id: "2F",
        img: "goal2F.png",
        description: "Connect to 3 Towns by the River.",
      },
    ],
  },
}
