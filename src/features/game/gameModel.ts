import { CompanyOwners } from "./company/gameCompany"
import { DeckState } from "./deck/gameDeck"
import { GameFlow } from "./flow/gameFlows"
import { Goals } from "./goals/gameGoals"

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
