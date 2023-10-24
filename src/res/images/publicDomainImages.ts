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
    goals: {
      goal1A: url("goals/goal1A.png"),
      goal1B: url("goals/goal1B.png"),
      goal1C: url("goals/goal1C.png"),
      goal1D: url("goals/goal1D.png"),
      goal1E: url("goals/goal1E.png"),
      goal1F: url("goals/goal1F.png"),
      goal1G: url("goals/goal1G.png"),
      goal1H: url("goals/goal1H.png"),
      goal1I: url("goals/goal1I.png"),
      goal1J: url("goals/goal1J.png"),
      goal1K: url("goals/goal1K.png"),
      goal1L: url("goals/goal1L.png"),
      goal1M: url("goals/goal1M.png"),
      goal1N: url("goals/goal1N.png"),
      goal1O: url("goals/goal1O.png"),
      goal2A: url("goals/goal2A.png"),
      goal2B: url("goals/goal2B.png"),
      goal2C: url("goals/goal2C.png"),
      goal2D: url("goals/goal2D.png"),
      goal2E: url("goals/goal2E.png"),
      goal2F: url("goals/goal2F.png"),
    },
    company: {
      companyC1: url("company/companyC1.png"),
      companyC2: url("company/companyC2.png"),
      companyC3: url("company/companyC3.png"),
      companyC4: url("company/companyC4.png"),
      companyC5: url("company/companyC5.png"),
      companyC6: url("company/companyC6.png"),
      companyC7: url("company/companyC7.png"),
      companyC8: url("company/companyC8.png"),
      companyC9: url("company/companyC9.png"),
      companyC10: url("company/companyC10.png"),
    },
  }
}
