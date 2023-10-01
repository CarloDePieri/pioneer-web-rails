interface Objective {
  id: string
  img: string
}

interface Objectives {
  sheriff: Objective | undefined
  train: Objective | undefined
  ranch: Objective | undefined
}

// MAIN DECK
interface Card {
  id: string
  img: string
}

interface DeckState {
  deck: Card[]
  display: Card[]
  selectedCard: Card | undefined
  discard: Card[]
}

// GAME STATE
export interface GameConfig {
  forestMap: boolean
  jokerExpansion: boolean
  companyOwnerExpansion: boolean
  advancedHandCardRule: boolean
}

export interface NewGame {
  players: string[]
  config: GameConfig
}

export interface GameState {
  status: "pre" | "started" | "done"
  players: string[]
  dealerId: number
  round: number
  turn: number
  config: GameConfig
  objectives: Objectives
  deck: DeckState
}

export const deckCards: Card[] = [
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
