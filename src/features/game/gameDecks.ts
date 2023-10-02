import { Card, Goal } from "./gameModel"

export const cardsDeck: Card[] = [
  { id: "🂡", img: "aceSpades.png" },
  { id: "🂮", img: "kingSpades.png" },
  { id: "🂭", img: "queenSpades.png" },
  { id: "🂫", img: "jackSpades.png" },
  { id: "🂪", img: "tenSpades.png" },
  { id: "🂱", img: "aceHearts.png" },
  { id: "🂾", img: "kingHearts.png" },
  { id: "🂽", img: "queenHearts.png" },
  { id: "🂻", img: "jackHearts.png" },
  { id: "🂺", img: "tenHearts.png" },
  { id: "🃁", img: "aceDiamonds.png" },
  { id: "🃎", img: "kingDiamonds.png" },
  { id: "🃍", img: "queenDiamonds.png" },
  { id: "🃋", img: "jackDiamonds.png" },
  { id: "🃊", img: "tenDiamonds.png" },
  { id: "🃑", img: "aceClubs.png" },
  { id: "🃞", img: "kingClubs.png" },
  { id: "🃝", img: "queenClubs.png" },
  { id: "🃛", img: "jackClubs.png" },
  { id: "🃚", img: "tenClubs.png" },
]

export const jokers: Card[] = [
  { id: "🃏", img: "jokerClubsSpades.png" },
  { id: "🂿", img: "jokerDiamondsHearts.png" },
]

export const goalDeck: {
  desert: {
    sheriff: Goal[]
    ranch: Goal[]
    train: Goal[]
  }
  forest: {
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
  forest: {
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
