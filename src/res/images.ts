import { licensedCards } from "./images/licensedImages"
import { publicDomainCards } from "./images/publicDomainImages"

export const licensed: boolean = import.meta.env.VITE_LICENSED_IMAGES === "true"

export type CardImageType = {
  deck: {
    spades: {
      ace: string
      king: string
      queen: string
      jack: string
      ten: string
    }
    hearts: {
      ace: string
      king: string
      queen: string
      jack: string
      ten: string
    }
    diamonds: {
      ace: string
      king: string
      queen: string
      jack: string
      ten: string
    }
    clubs: {
      ace: string
      king: string
      queen: string
      jack: string
      ten: string
    }
  }
  jokers: {
    black: string
    red: string
  }
  goals?: {
    goal1A: string
    goal1B: string
    goal1C: string
    goal1D: string
    goal1E: string
    goal1F: string
    goal1G: string
    goal1H: string
    goal1I: string
    goal1J: string
    goal1K: string
    goal1L: string
    goal1M: string
    goal1N: string
    goal1O: string
    goal2A: string
    goal2B: string
    goal2C: string
    goal2D: string
    goal2E: string
    goal2F: string
  }
}

const cardsImages: CardImageType = licensed
  ? licensedCards()
  : publicDomainCards()

export const images = {
  ...cardsImages,
}
