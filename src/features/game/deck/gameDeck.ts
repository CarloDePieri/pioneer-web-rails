import { createSelector, Draft } from "@reduxjs/toolkit"
import { RootState } from "../../../app/store"
import { selectedDeckTheme } from "../../settings/deckThemes"

import { GameState } from "../gameSlice"
import { pickRandom, repeat, shuffle } from "../helpers"
import { Player } from "../newGame/gameStart"
import { CardId, cardIds } from "./CardId"

export interface SecretCard {
  playerId: string
  cardId: CardId
}

export interface Table {
  deck: CardId[]
  display: CardId[]
  selectedCardId: CardId | undefined
  discard: CardId[]
  secretRoundCards: SecretCard[]
}

export const initialTable: Table = {
  deck: [],
  display: [],
  selectedCardId: undefined,
  discard: [],
  secretRoundCards: [],
}

export class GameCard {
  readonly id: CardId
  readonly img: string

  constructor(id: CardId) {
    this.id = id
    this.img = selectedDeckTheme.getImageById.deck(id)
  }
}

export const deckSelector = {
  deck: createSelector(
    [(state: RootState) => state.gameState.present.table.deck],
    (deck: CardId[]): GameCard[] => deck.map((cardId) => new GameCard(cardId)),
  ),
  discard: createSelector(
    [(state: RootState) => state.gameState.present.table.discard],
    (discard: CardId[]): GameCard[] =>
      discard.map((cardId) => new GameCard(cardId)),
  ),
  display: createSelector(
    [(state: RootState) => state.gameState.present.table.display],
    (display: CardId[]): GameCard[] =>
      display.map((cardId) => new GameCard(cardId)),
  ),
  selectedCard: createSelector(
    [(state: RootState) => state.gameState.present.table.selectedCardId],
    (cardId: CardId | undefined): GameCard | undefined =>
      cardId ? new GameCard(cardId) : undefined,
  ),
  secretCards: createSelector(
    [
      (state: RootState) => state.gameState.present.players,
      (state: RootState) => state.gameState.present.table.secretRoundCards,
    ],
    (players: Player[], secretRoundCards: SecretCard[]) => {
      return new Map<string, GameCard | undefined>(
        players.map((player) => [
          player.id,
          secretRoundCards.length > 0
            ? new GameCard(
                secretRoundCards.filter(
                  (card) => card.playerId === player.id,
                )[0].cardId,
              )
            : undefined,
        ]),
      )
    },
  ),
}

export function deck(state: Draft<GameState>) {
  let table = state.table
  let jokers: CardId[] = [cardIds[0], cardIds[1]]

  function drawFromDeck(): Draft<CardId> {
    let deck = state.table.deck
    if (deck.length === 0) {
      // reshuffle the discard pile into the deck
      state.table.deck = shuffle(state.table.discard)
      state.table.discard = []
    }
    // draw - since this function is handled by Immer this should be safe from race conditions
    // It's safe to say the deck will never be emptied
    return state.table.deck.pop() as Draft<CardId>
  }
  function fromDeckToDisplay(): Draft<CardId> {
    let cardId = drawFromDeck()
    state.table.display.push(cardId)
    return cardId
  }
  function fromDisplayToDiscard(): Draft<CardId> | undefined {
    let cardId = state.table.display.pop()
    if (cardId) state.table.discard.push(cardId)
    return cardId
  }
  function isJoker(cardId: Draft<CardId>): boolean {
    return cardId === jokers[0] || cardId === jokers[1]
  }
  function discardRandomJoker() {
    let randomJokerId = pickRandom(jokers)
    table.display = table.display.filter((cardId) => cardId !== randomJokerId)
    table.discard.push(randomJokerId)
  }
  function resetPickedCard() {
    table.selectedCardId = undefined
  }
  function clearDisplay() {
    // discard the current display, if present
    repeat(3, fromDisplayToDiscard)
  }

  return {
    init() {
      if (state.config.jokerExpansion) {
        // Using Joker Cards mini expansion
        table.deck = [...cardIds]
      } else {
        table.deck = cardIds.filter((cardId) => {
          return !jokers.includes(cardId)
        })
      }
    },
    newRound() {
      // recreate the deck and shuffle it
      table.deck = shuffle(
        table.deck
          .concat(table.display)
          .concat(table.discard)
          .concat(
            table.secretRoundCards.map((secretCard) => secretCard.cardId),
          ),
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
          cardId: drawFromDeck(),
        }
      })
    },
    showSecrets() {
      clearDisplay()
    },
    pick(cardId: string) {
      table.selectedCardId = table.display.filter((id) => id === cardId)[0]
    },
    unpick() {
      resetPickedCard()
    },
  }
}
