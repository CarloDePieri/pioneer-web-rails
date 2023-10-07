import { CardImageType } from "../images"

export function publicDomainCards(): CardImageType {
  let root = "src/res/images/publicDomain/"
  return {
    deck: {
      spades: {
        ace: root + "deck/spades_ace.svg",
        king: root + "deck/spades_king.svg",
        queen: root + "deck/spades_queen.svg",
        jack: root + "deck/spades_jack.svg",
        ten: root + "deck/spades_ten.svg",
      },
      hearts: {
        ace: root + "deck/hearts_ace.svg",
        king: root + "deck/hearts_king.svg",
        queen: root + "deck/hearts_queen.svg",
        jack: root + "deck/hearts_jack.svg",
        ten: root + "deck/hearts_ten.svg",
      },
      diamonds: {
        ace: root + "deck/diamonds_ace.svg",
        king: root + "deck/diamonds_king.svg",
        queen: root + "deck/diamonds_queen.svg",
        jack: root + "deck/diamonds_jack.svg",
        ten: root + "deck/diamonds_ten.svg",
      },
      clubs: {
        ace: root + "deck/clubs_ace.svg",
        king: root + "deck/clubs_king.svg",
        queen: root + "deck/clubs_queen.svg",
        jack: root + "deck/clubs_jack.svg",
        ten: root + "deck/clubs_ten.svg",
      },
    },
    jokers: {
      black: root + "jokers/joker_black.svg",
      red: root + "jokers/joker_red.svg",
    },
  }
}
