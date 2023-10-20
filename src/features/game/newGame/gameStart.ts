import { Draft } from "@reduxjs/toolkit"
import { RootState } from "../../../app/store"
import { GameState } from "../gameSlice"

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

export interface Player {
  id: string
  name: string
}

export interface NewGame {
  players: Player[]
  config: GameConfig
}

export const configSelector = {
  forest: (state: RootState) => state.gameState.present.config.forestMap,
  jokers: (state: RootState) => state.gameState.present.config.jokerExpansion,
  company: (state: RootState) =>
    state.gameState.present.config.companyOwnersExpansion,
  advanced: (state: RootState) =>
    state.gameState.present.config.advancedHandCardRule,
}

export function toggleConfig(state: Draft<GameState>) {
  return {
    forestMap() {
      state.config.forestMap = !state.config.forestMap
    },
    jokers() {
      state.config.jokerExpansion = !state.config.jokerExpansion
    },
    company() {
      state.config.companyOwnersExpansion = !state.config.companyOwnersExpansion
    },
    advanced() {
      state.config.advancedHandCardRule = !state.config.advancedHandCardRule
    },
  }
}
