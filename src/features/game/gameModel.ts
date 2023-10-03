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

