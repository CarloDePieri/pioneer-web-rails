import { createSelector, Draft } from "@reduxjs/toolkit"
import { ParseKeys } from "i18next"
import { RootState } from "../../../app/store"
import i18n from "../../../i18n"
import { getImageById } from "../../settings/DeckTheme"

import { GameState } from "../gameSlice"
import { shuffle } from "../helpers"

const companyIds = [
  "companyC1",
  "companyC2",
  "companyC3",
  "companyC4",
  "companyC5",
  "companyC6",
  "companyC7",
  "companyC8",
  "companyC9",
  "companyC10",
] as const
export type CompanyId = (typeof companyIds)[number]

export interface CompanyOwners {
  companyCard: CompanyId | undefined
  companyDeck: CompanyId[]
}

export const initialCompanyOwners: CompanyOwners = {
  companyCard: undefined,
  companyDeck: [],
}

export interface CompanyCard {
  id: CompanyId
  img: string
  description: string
}

export const companySelector = {
  roundCard: createSelector(
    [
      (state: RootState) => state.gameState.present.companyOwners.companyCard,
      // this dependency is needed to rebuild the component on language change
      (state: RootState) => state.settings.lang,
    ],
    (card: CompanyId | undefined, _: string): CompanyCard | undefined => {
      if (card) {
        return {
          id: card,
          img: getImageById.company(card),
          description: i18n.t(`company.${card}` as ParseKeys),
        }
      }
    },
  ),
}

export const company = (state: Draft<GameState>) => {
  let company = state.companyOwners
  return {
    draw() {
      let card = company.companyDeck.pop()
      if (card) {
        company.companyCard = card
      }
    },
    init() {
      let deck: CompanyId[]
      if (!state.config.forestMap) {
        // C1 company card does not work on desert maps!
        deck = companyIds.slice(1, companyIds.length)
      } else {
        deck = [...companyIds]
      }
      company.companyDeck = shuffle(deck).slice(0, 4)
    },
  }
}
