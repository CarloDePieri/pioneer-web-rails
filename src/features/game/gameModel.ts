import { GameFlow } from "./gameFlows"
import { Goals } from "./goals/gameGoals"

export interface CompanyCard {
  id: string
  img: string
  description: string
}

// MAIN DECK
export interface Card {
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
  goals: Goals
  deck: DeckState
  companyCard: CompanyCard | undefined
  companyDeck: CompanyCard[]
  gameFlow: GameFlow
}
