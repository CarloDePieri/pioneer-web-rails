import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  draw,
  newRound,
  reset,
  selectDeck,
  selectDiscard,
  selectDisplay,
  selectObjectives,
  selectStatus,
} from "./gameSlice"
import { NewGame } from "./components/NewGame"
import { ActionCreators } from "redux-undo"

export function Game() {
  const status = useAppSelector(selectStatus)
  const dispatch = useAppDispatch()

  const objectives = useAppSelector(selectObjectives)
  const deck = useAppSelector(selectDeck)
  const display = useAppSelector(selectDisplay)
  const discard = useAppSelector(selectDiscard)

  if (status === "pre") {
    return <NewGame />
  } else {
    return (
      <div>
        <button onClick={() => dispatch(reset())}>Reset Game</button>
        <p>
          Objectives: {objectives.sheriff?.id} {objectives.ranch?.id}{" "}
          {objectives.train?.id}
        </p>
        <button onClick={() => dispatch(draw())}>Draw</button>
        <button onClick={() => dispatch(newRound())}>New Round</button>
        <button onClick={() => dispatch(ActionCreators.undo())}>Undo</button>
        <button onClick={() => dispatch(ActionCreators.redo())}>Redo</button>
        <p>Display:</p>
        <ul>
          {display.map((card) => (
            <li key={card.id}>{card.id}</li>
          ))}
        </ul>
        <p>Deck:</p>
        <ul>
          {deck.map((card) => (
            <li key={card.id}>{card.id}</li>
          ))}
        </ul>
        <p>Discard:</p>
        <ul>
          {discard.map((card) => (
            <li key={card.id}>{card.id}</li>
          ))}
        </ul>
      </div>
    )
  }
}
