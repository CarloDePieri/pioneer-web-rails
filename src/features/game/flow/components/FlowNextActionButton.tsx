import { Fab } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { openGoalsGallery } from "../../../gallery/gallerySlice"
import {
  deal,
  dealSecrets,
  newRound,
  selectAdvancedHandCardRule,
  selectNextOp,
  showSecrets,
} from "../../gameSlice"
import { GameFlowState } from "../gameFlows"

export function FlowNextActionButton() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const next = useAppSelector(selectNextOp)
  const advanced = useAppSelector(selectAdvancedHandCardRule)

  const nextButtonOp = () => {
    switch (next) {
      case "DEAL":
        dispatch(deal())
        break
      case "NEW_ROUND":
        // Begin a new round
        dispatch(newRound())
        if (!advanced) {
          // Deal the first three cards
          dispatch(deal())
        } else {
          // Deal the secret cards
          dispatch(dealSecrets())
        }
        break
      case "SHOW_SECRETS":
        dispatch(showSecrets())
        break
      case "END_GAME":
        dispatch(openGoalsGallery())
        break
      default:
        break
    }
  }

  const nextButtonText = () => {
    let text = new Map<GameFlowState, string>([
      ["PICK", t("flow.actions.pick")],
      ["DEAL", t("flow.actions.deal")],
      ["NEW_ROUND", t("flow.actions.shuffle")],
      ["SHOW_SECRETS", t("flow.actions.secrets")],
      ["END_GAME", t("flow.actions.done")],
    ]).get(next)
    return text ?? ""
  }

  return (
    <Fab
      color={"success"}
      variant="extended"
      sx={{
        width: { xs: "20vw", sm: "10vw" },
        height: { xs: "20vw", sm: "10vw" },
      }}
      onClick={nextButtonOp}
      disabled={next === "PICK"}
    >
      {nextButtonText()}
    </Fab>
  )
}
