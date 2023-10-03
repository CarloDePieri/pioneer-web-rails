import { Draft } from "@reduxjs/toolkit"

import { GameState } from "../gameSlice";
import { pickRandom, repeat, shuffle } from "../helpers"

export interface Card {
  id: string
  symbol: string
  img: string
}

export interface Table {
  deck: Card[]
  display: Card[]
  selectedCard: Card | undefined
  discard: Card[]
}

export const initialTable: Table = {
  deck: [],
  display: [],
  selectedCard: undefined,
  discard: [],
}

export function deck(state: Draft<GameState>) {
  let table = state.table

  function moveCard(
    source: Draft<Card>[],
    destination: Draft<Card>[],
  ): Draft<Card> | undefined {
    let card = source.pop()
    if (card) {
      destination.push(card)
    }
    return card
  }
  function drawCard(): Draft<Card> | undefined {
    return moveCard(table.deck, table.display)
  }
  function discardCard(): Draft<Card> | undefined {
    return moveCard(table.display, table.discard)
  }
  function isJoker(card: Draft<Card> | undefined): boolean {
    if (card) {
      return card.id === jokers[0].id || card.id === jokers[1].id
    } else {
      return false
    }
  }
  function discardJoker() {
    let randomJoker = pickRandom(jokers)
    table.display = table.display.filter((card) => card.id !== randomJoker.id)
    table.discard.push(randomJoker)
  }
  function resetPickedCard() {
    table.selectedCard = undefined
  }

  return {
    getDeck() {
      return table.deck
    },
    getDiscard() {
      return table.discard
    },
    getDisplay() {
      return table.display
    },
    getSelectedCard() {
      return table.selectedCard
    },
    actions: {
      init() {
        if (state.config.jokerExpansion) {
          // Using Joker Cards mini expansion
          table.deck = cardsDeck.concat(jokers)
        } else {
          table.deck = cardsDeck
        }
      },
      newRound() {
        // recreate the deck and shuffle it
        table.deck = shuffle(
          table.deck.concat(table.display).concat(table.discard),
        )
        // reset the rest of the deck state
        table.display = []
        table.discard = []
        resetPickedCard()
      },
      deal() {
        // discard the current display, if present
        repeat(3, discardCard)

        // reset the selected card
        resetPickedCard()

        // draw 3 cards
        if (state.config.jokerExpansion) {
          // check that only one joker at a time is in the display
          let drawnJokers = 0
          while (table.display.length < 3) {
            // draw the card, keeping track of the jokers
            if (isJoker(drawCard())) drawnJokers++
            if (drawnJokers === 2) {
              // if too many have been drawn, discard a joker...
              discardJoker()
              drawnJokers--
              // ... and draw again
              drawCard()
            }
          }
        } else {
          repeat(3, drawCard)
        }
      },
      pick(cardId: string) {
        table.selectedCard = table.display.filter(
          (card) => card.id === cardId,
        )[0]
      },
      unpick() {
        resetPickedCard()
      },
    },
  }
}

export const cardsDeck: Card[] = [
  { id: "AS", symbol: "🂡", img: "aceSpades.png" },
  { id: "KS", symbol: "🂮", img: "kingSpades.png" },
  { id: "QS", symbol: "🂭", img: "queenSpades.png" },
  { id: "JS", symbol: "🂫", img: "jackSpades.png" },
  { id: "10S", symbol: "🂪", img: "tenSpades.png" },
  { id: "AH", symbol: "🂱", img: "aceHearts.png" },
  { id: "KH", symbol: "🂾", img: "kingHearts.png" },
  { id: "QH", symbol: "🂽", img: "queenHearts.png" },
  { id: "JH", symbol: "🂻", img: "jackHearts.png" },
  { id: "10H", symbol: "🂺", img: "tenHearts.png" },
  { id: "AD", symbol: "🃁", img: "aceDiamonds.png" },
  { id: "KD", symbol: "🃎", img: "kingDiamonds.png" },
  { id: "QD", symbol: "🃍", img: "queenDiamonds.png" },
  { id: "JD", symbol: "🃋", img: "jackDiamonds.png" },
  { id: "10D", symbol: "🃊", img: "tenDiamonds.png" },
  { id: "AC", symbol: "🃑", img: "aceClubs.png" },
  { id: "KC", symbol: "🃞", img: "kingClubs.png" },
  { id: "QC", symbol: "🃝", img: "queenClubs.png" },
  { id: "JC", symbol: "🃛", img: "jackClubs.png" },
  { id: "10C", symbol: "🃚", img: "tenClubs.png" },
]

export const jokers: Card[] = [
  { id: "J1", symbol: "🃏", img: "jokerClubsSpades.png" },
  { id: "J2", symbol: "🂿", img: "jokerDiamondsHearts.png" },
]
