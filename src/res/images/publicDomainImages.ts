import { CardImageType } from "../images"

export function publicDomainCards(): CardImageType {
  let root = "/images/publicDomain/"

  const url = (path: string) => root + path

  return {
    deck: {
      back: url("deck/back.svg"),
      spades: {
        ace: url("deck/spades_ace.svg"),
        king: url("deck/spades_king.svg"),
        queen: url("deck/spades_queen.svg"),
        jack: url("deck/spades_jack.svg"),
        ten: url("deck/spades_ten.svg"),
      },
      hearts: {
        ace: url("deck/hearts_ace.svg"),
        king: url("deck/hearts_king.svg"),
        queen: url("deck/hearts_queen.svg"),
        jack: url("deck/hearts_jack.svg"),
        ten: url("deck/hearts_ten.svg"),
      },
      diamonds: {
        ace: url("deck/diamonds_ace.svg"),
        king: url("deck/diamonds_king.svg"),
        queen: url("deck/diamonds_queen.svg"),
        jack: url("deck/diamonds_jack.svg"),
        ten: url("deck/diamonds_ten.svg"),
      },
      clubs: {
        ace: url("deck/clubs_ace.svg"),
        king: url("deck/clubs_king.svg"),
        queen: url("deck/clubs_queen.svg"),
        jack: url("deck/clubs_jack.svg"),
        ten: url("deck/clubs_ten.svg"),
      },
    },
    jokers: {
      black: url("jokers/joker_black.svg"),
      red: url("jokers/joker_red.svg"),
    },
  }
}
