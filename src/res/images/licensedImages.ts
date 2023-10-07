import { CardImageType } from "../images"

export function licensedCards(): CardImageType {
  let root = "src/res/images/licensed/"
  return {
    deck: {
      spades: {
        ace: root + "deck/spades_ace.png",
        king: root + "deck/spades_king.png",
        queen: root + "deck/spades_queen.png",
        jack: root + "deck/spades_jack.png",
        ten: root + "deck/spades_ten.png",
      },
      hearts: {
        ace: root + "deck/hearts_ace.png",
        king: root + "deck/hearts_king.png",
        queen: root + "deck/hearts_queen.png",
        jack: root + "deck/hearts_jack.png",
        ten: root + "deck/hearts_ten.png",
      },
      diamonds: {
        ace: root + "deck/diamonds_ace.png",
        king: root + "deck/diamonds_king.png",
        queen: root + "deck/diamonds_queen.png",
        jack: root + "deck/diamonds_jack.png",
        ten: root + "deck/diamonds_ten.png",
      },
      clubs: {
        ace: root + "deck/clubs_ace.png",
        king: root + "deck/clubs_king.png",
        queen: root + "deck/clubs_queen.png",
        jack: root + "deck/clubs_jack.png",
        ten: root + "deck/clubs_ten.png",
      },
    },
    jokers: {
      black: root + "jokers/joker_black.png",
      red: root + "jokers/joker_red.png",
    },
    goals: {
      goal1A: root + "goals/goal1A.png",
      goal1B: root + "goals/goal1B.png",
      goal1C: root + "goals/goal1C.png",
      goal1D: root + "goals/goal1D.png",
      goal1E: root + "goals/goal1E.png",
      goal1F: root + "goals/goal1F.png",
      goal1G: root + "goals/goal1G.png",
      goal1H: root + "goals/goal1H.png",
      goal1I: root + "goals/goal1I.png",
      goal1J: root + "goals/goal1J.png",
      goal1K: root + "goals/goal1K.png",
      goal1L: root + "goals/goal1L.png",
      goal1M: root + "goals/goal1M.png",
      goal1N: root + "goals/goal1N.png",
      goal1O: root + "goals/goal1O.png",
      goal2A: root + "goals/goal2A.png",
      goal2B: root + "goals/goal2B.png",
      goal2C: root + "goals/goal2C.png",
      goal2D: root + "goals/goal2D.png",
      goal2E: root + "goals/goal2E.png",
      goal2F: root + "goals/goal2F.png",
    },
  }
}
