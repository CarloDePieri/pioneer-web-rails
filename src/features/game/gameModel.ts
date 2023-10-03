import { CompanyOwners } from "./company/gameCompany"
import { GameFlow } from "./flow/gameFlows"
import { Goals } from "./goals/gameGoals"

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
  companyOwnersExpansion: boolean
  advancedHandCardRule: boolean
}

export interface NewGame {
  players: string[]
  config: GameConfig
}

export interface GameState {
  players: string[]
  config: GameConfig
  goals: Goals
  deck: DeckState
  companyOwners: CompanyOwners
  gameFlow: GameFlow
}
