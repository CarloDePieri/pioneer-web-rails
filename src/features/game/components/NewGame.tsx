import { useAppDispatch } from "../../../app/hooks"

import { init } from "../gameSlice"

export function NewGame() {
  const dispatch = useAppDispatch()

  return (
    <div>
      <p>A new game?</p>
      <button
        onClick={() =>
          dispatch(
            init({
              forestGoals: false,
              jokerExpansion: false,
              companyOwnerExpansion: false,
            }),
          )
        }
      >
        New Game
      </button>
      <button
        onClick={() =>
          dispatch(
            init({
              forestGoals: false,
              jokerExpansion: true,
              companyOwnerExpansion: false,
            }),
          )
        }
      >
        New Game with Jokers
      </button>
    </div>
  )
}
