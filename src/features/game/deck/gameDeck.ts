import { createSelector, Draft } from "@reduxjs/toolkit"
import { RootState } from "../../../app/store"
import { images } from "../../../res/images"

import { GameState } from "../gameSlice"
import { pickRandom, repeat, shuffle } from "../helpers"
import { Player } from "../newGame/gameStart"

export interface Card {
  id: string
  symbol: string
  img: string
}

export interface SecretCard {
  playerId: string
  card: Card
}

export interface Table {
  deck: Card[]
  display: Card[]
  selectedCard: Card | undefined
  discard: Card[]
  secretRoundCards: SecretCard[]
}

export const initialTable: Table = {
  deck: [],
  display: [],
  selectedCard: undefined,
  discard: [],
  secretRoundCards: [],
}

export const deckSelector = {
  deck: (state: RootState) => state.gameState.present.table.deck,
  discard: (state: RootState) => state.gameState.present.table.discard,
  display: (state: RootState) => state.gameState.present.table.display,
  selectedCard: (state: RootState) =>
    state.gameState.present.table.selectedCard,
  secretCards: createSelector(
    [
      (state: RootState) => state.gameState.present.players,
      (state: RootState) => state.gameState.present.table.secretRoundCards,
    ],
    (players: Player[], secretRoundCards: SecretCard[]) => {
      return new Map<string, Card | undefined>(
        players.map((player) => [
          player.id,
          secretRoundCards.filter((card) => card.playerId === player.id)[0]
            ?.card,
        ]),
      )
    },
  ),
}

export function deck(state: Draft<GameState>) {
  let table = state.table

  function drawFromDeck(): Draft<Card> {
    let deck = state.table.deck
    if (deck.length === 0) {
      // reshuffle the discard pile into the deck
      state.table.deck = shuffle(state.table.discard)
    }
    // draw - since this function is handled by Immer this should be safe from race conditions
    return deck.pop() as Draft<Card>
  }
  function fromDeckToDisplay(): Draft<Card> {
    let card = drawFromDeck()
    state.table.display.push(card)
    return card
  }
  function fromDisplayToDiscard(): Draft<Card> | undefined {
    let card = state.table.display.pop()
    if (card) state.table.discard.push(card)
    return card
  }
  function isJoker(card: Draft<Card>): boolean {
    return card.id === jokers[0].id || card.id === jokers[1].id
  }
  function discardRandomJoker() {
    let randomJoker = pickRandom(jokers)
    table.display = table.display.filter((card) => card.id !== randomJoker.id)
    table.discard.push(randomJoker)
  }
  function resetPickedCard() {
    table.selectedCard = undefined
  }
  function clearDisplay() {
    // discard the current display, if present
    repeat(3, fromDisplayToDiscard)
  }

  return {
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
      // discard all cards in the display area
      clearDisplay()

      // reset the selected card
      resetPickedCard()

      // draw 3 cards
      if (state.config.jokerExpansion) {
        // check that only one joker at a time is in the display
        let drawnJokers = 0
        while (table.display.length < 3) {
          // draw the card, keeping track of the jokers
          if (isJoker(fromDeckToDisplay())) drawnJokers++
          if (drawnJokers === 2) {
            // if too many have been drawn, discard a joker...
            discardRandomJoker()
            drawnJokers--
            // ... and draw again
            fromDeckToDisplay()
          }
        }
      } else {
        repeat(3, fromDeckToDisplay)
      }
    },
    dealSecrets() {
      state.table.secretRoundCards = state.players.map((player): SecretCard => {
        return {
          playerId: player.id,
          card: drawFromDeck(),
        }
      })
    },
    showSecrets() {
      clearDisplay()
    },
    pick(cardId: string) {
      table.selectedCard = table.display.filter((card) => card.id === cardId)[0]
    },
    unpick() {
      resetPickedCard()
    },
  }
}

export const cardsDeck: Card[] = [
  { id: "AS", symbol: "🂡", img: images.deck.spades.ace },
  { id: "KS", symbol: "🂮", img: images.deck.spades.king },
  { id: "QS", symbol: "🂭", img: images.deck.spades.queen },
  { id: "JS", symbol: "🂫", img: images.deck.spades.jack },
  { id: "10S", symbol: "🂪", img: images.deck.spades.ten },
  { id: "AH", symbol: "🂱", img: images.deck.hearts.ace },
  { id: "KH", symbol: "🂾", img: images.deck.hearts.king },
  { id: "QH", symbol: "🂽", img: images.deck.hearts.queen },
  { id: "JH", symbol: "🂻", img: images.deck.hearts.jack },
  { id: "10H", symbol: "🂺", img: images.deck.hearts.ten },
  { id: "AD", symbol: "🃁", img: images.deck.diamonds.ace },
  { id: "KD", symbol: "🃎", img: images.deck.diamonds.king },
  { id: "QD", symbol: "🃍", img: images.deck.diamonds.queen },
  { id: "JD", symbol: "🃋", img: images.deck.diamonds.jack },
  { id: "10D", symbol: "🃊", img: images.deck.diamonds.ten },
  { id: "AC", symbol: "🃑", img: images.deck.clubs.ace },
  { id: "KC", symbol: "🃞", img: images.deck.clubs.king },
  { id: "QC", symbol: "🃝", img: images.deck.clubs.queen },
  { id: "JC", symbol: "🃛", img: images.deck.clubs.jack },
  { id: "10C", symbol: "🃚", img: images.deck.clubs.ten },
]

export const jokers: Card[] = [
  { id: "J1", symbol: "🃏", img: images.jokers.black },
  { id: "J2", symbol: "🂿", img: images.jokers.red },
]
