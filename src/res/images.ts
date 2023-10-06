const licensed = import.meta.env.VITE_LICENSED_IMAGES

function getCard(path: string) {
  if (licensed) return "src/res/images/licensed/" + path + ".png"
  else return "src/res/images/publicDomain/" + path + ".svg"
}

export const images = {
  deck: {
    spades: {
      ace: getCard("deck/spades_ace"),
      king: getCard("deck/spades_king"),
      queen: getCard("deck/spades_queen"),
      jack: getCard("deck/spades_jack"),
      ten: getCard("deck/spades_10"),
    },
    hearts: {
      ace: getCard("deck/hearts_ace"),
      king: getCard("deck/hearts_king"),
      queen: getCard("deck/hearts_queen"),
      jack: getCard("deck/hearts_jack"),
      ten: getCard("deck/hearts_10"),
    },
    diamonds: {
      ace: getCard("deck/diamonds_ace"),
      king: getCard("deck/diamonds_king"),
      queen: getCard("deck/diamonds_queen"),
      jack: getCard("deck/diamonds_jack"),
      ten: getCard("deck/diamonds_10"),
    },
    clubs: {
      ace: getCard("deck/clubs_ace"),
      king: getCard("deck/clubs_king"),
      queen: getCard("deck/clubs_queen"),
      jack: getCard("deck/clubs_jack"),
      ten: getCard("deck/clubs_10"),
    },
  },
  jokers: {
    black: getCard("jokers/joker_black"),
    red: getCard("jokers/joker_red"),
  },
}
