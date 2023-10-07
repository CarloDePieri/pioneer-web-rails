import { Draft } from "@reduxjs/toolkit"
import { RootState } from "../../../app/store"
import { images } from "../../../res/images"
import { strings } from "../../../res/strings"

import { GameState } from "../gameSlice"
import { shuffle } from "../helpers"

export interface CompanyCard {
  id: string
  img: string | undefined
  description: string
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
        deck = companyDeck.filter((card) => card.id !== "C1")
      } else {
        deck = companyDeck
      }
      company.companyDeck = shuffle(deck).slice(0, 4)
    },
  }
}

export const companyDeck: CompanyCard[] = [
  {
    id: "C1",
    img: images.company?.companyC1,
    description: strings.company.companyC1,
  },
  {
    id: "C2",
    img: images.company?.companyC2,
    description: strings.company.companyC2,
  },
  {
    id: "C3",
    img: images.company?.companyC3,
    description: strings.company.companyC3,
  },
  {
    id: "C4",
    img: images.company?.companyC4,
    description: strings.company.companyC4,
  },
  {
    id: "C5",
    img: images.company?.companyC5,
    description: strings.company.companyC5,
  },
  {
    id: "C6",
    img: images.company?.companyC6,
    description: strings.company.companyC6,
  },
  {
    id: "C7",
    img: images.company?.companyC7,
    description: strings.company.companyC7,
  },
  {
    id: "C8",
    img: images.company?.companyC8,
    description: strings.company.companyC8,
  },
  {
    id: "C9",
    img: images.company?.companyC9,
    description: strings.company.companyC9,
  },
  {
    id: "C10",
    img: images.company?.companyC10,
    description: strings.company.companyC10,
  },
]
