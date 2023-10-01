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
              players: ["Carlo", "Giulia", "Andrea", "Silvia"],
              config: {
                forestMap: false,
                jokerExpansion: false,
                companyOwnerExpansion: false,
                advancedHandCardRule: false,
              },
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
              players: ["Carlo", "Giulia"],
              config: {
                forestMap: false,
                jokerExpansion: true,
                companyOwnerExpansion: false,
                advancedHandCardRule: false,
              },
            }),
          )
        }
      >
        New Game with Jokers
      </button>
    </div>
  )
}
