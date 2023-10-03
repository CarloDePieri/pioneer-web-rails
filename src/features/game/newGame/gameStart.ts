export interface GameConfig {
  forestMap: boolean
  jokerExpansion: boolean
  companyOwnersExpansion: boolean
  advancedHandCardRule: boolean
}

export const initialGameConfig: GameConfig = {
  forestMap: false,
  jokerExpansion: false,
  companyOwnersExpansion: false,
  advancedHandCardRule: false,
}

export interface NewGame {
  players: string[]
  config: GameConfig
}
