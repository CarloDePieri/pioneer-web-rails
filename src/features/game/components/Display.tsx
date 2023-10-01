import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { pick, selectDisplay, selectPickedCard, unpick } from "../gameSlice"

export function Display() {
  const dispatch = useAppDispatch()
  const display = useAppSelector(selectDisplay)
  const selectedCard = useAppSelector(selectPickedCard)
  const getColor = (id: string) => (id === selectedCard?.id ? "red" : "black")

  const togglePick = (id: string) => {
    if (id === selectedCard?.id) {
      dispatch(unpick())
    } else {
      dispatch(pick(id))
    }
  }

  return (
    <div>
      <p>Display:</p>
      <ul>
        {display.map((card) => (
          <li
            key={card.id}
            onClick={() => togglePick(card.id)}
            style={{ color: getColor(card.id) }}
          >
            {card.id}
          </li>
        ))}
      </ul>
    </div>
  )
}
