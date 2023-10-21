import { Draft } from "@reduxjs/toolkit"
import { RootState } from "../../../app/store"
import { images } from "../../../res/images"

import { GameState } from "../gameSlice"
import { shuffle } from "../helpers"

export interface CompanyCard {
  id: string
  img: string | undefined
}

export interface CompanyOwners {
  companyCard: CompanyCard | undefined
  companyDeck: CompanyCard[]
}

export const initialCompanyOwners: CompanyOwners = {
  companyCard: undefined,
  companyDeck: [],
}

export const companySelector = {
  roundCard: (state: RootState) =>
    company(state.gameState.present).getCompanyCard(),
}

export const company = (state: Draft<GameState>) => {
  let company = state.companyOwners
  return {
    getCompanyCard() {
      return company.companyCard
    },
    draw() {
      let card = company.companyDeck.pop()
      if (card) {
        company.companyCard = card
      }
    },
    init() {
      let deck
      if (!state.config.forestMap) {
        // C1 company card does not work on desert maps!
        deck = companyDeck.filter((card) => card.id !== "companyC1")
      } else {
        deck = companyDeck
      }
      company.companyDeck = shuffle(deck).slice(0, 4)
    },
  }
}

export const companyDeck: CompanyCard[] = [
  {
    id: "companyC1",
    img: images.company?.companyC1,
  },
  {
    id: "companyC2",
    img: images.company?.companyC2,
  },
  {
    id: "companyC3",
    img: images.company?.companyC3,
  },
  {
    id: "companyC4",
    img: images.company?.companyC4,
  },
  {
    id: "companyC5",
    img: images.company?.companyC5,
  },
  {
    id: "companyC6",
    img: images.company?.companyC6,
  },
  {
    id: "companyC7",
    img: images.company?.companyC7,
  },
  {
    id: "companyC8",
    img: images.company?.companyC8,
  },
  {
    id: "companyC9",
    img: images.company?.companyC9,
  },
  {
    id: "companyC10",
    img: images.company?.companyC10,
  },
]
