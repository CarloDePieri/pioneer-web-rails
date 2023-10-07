import { CardImageType } from "../images"

export function licensedCards(): CardImageType {
  let root = "/images/licensed"
  const url = (path: string): string => `${root}/${path}.png`
  return {
    deck: {
      spades: {
        ace: url("deck/spades_ace"),
        king: url("deck/spades_king"),
        queen: url("deck/spades_queen"),
        jack: url("deck/spades_jack"),
        ten: url("deck/spades_ten"),
      },
      hearts: {
        ace: url("deck/hearts_ace"),
        king: url("deck/hearts_king"),
        queen: url("deck/hearts_queen"),
        jack: url("deck/hearts_jack"),
        ten: url("deck/hearts_ten"),
      },
      diamonds: {
        ace: url("deck/diamonds_ace"),
        king: url("deck/diamonds_king"),
        queen: url("deck/diamonds_queen"),
        jack: url("deck/diamonds_jack"),
        ten: url("deck/diamonds_ten"),
      },
      clubs: {
        ace: url("deck/clubs_ace"),
        king: url("deck/clubs_king"),
        queen: url("deck/clubs_queen"),
        jack: url("deck/clubs_jack"),
        ten: url("deck/clubs_ten"),
      },
    },
    jokers: {
      black: url("jokers/joker_black"),
      red: url("jokers/joker_red"),
    },
    goals: {
      goal1A: url("goals/goal1A"),
      goal1B: url("goals/goal1B"),
      goal1C: url("goals/goal1C"),
      goal1D: url("goals/goal1D"),
      goal1E: url("goals/goal1E"),
      goal1F: url("goals/goal1F"),
      goal1G: url("goals/goal1G"),
      goal1H: url("goals/goal1H"),
      goal1I: url("goals/goal1I"),
      goal1J: url("goals/goal1J"),
      goal1K: url("goals/goal1K"),
      goal1L: url("goals/goal1L"),
      goal1M: url("goals/goal1M"),
      goal1N: url("goals/goal1N"),
      goal1O: url("goals/goal1O"),
      goal2A: url("goals/goal2A"),
      goal2B: url("goals/goal2B"),
      goal2C: url("goals/goal2C"),
      goal2D: url("goals/goal2D"),
      goal2E: url("goals/goal2E"),
      goal2F: url("goals/goal2F"),
    },
  }
}
