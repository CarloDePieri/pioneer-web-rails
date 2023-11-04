import Fingerprint from "@mui/icons-material/Fingerprint"
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import React from "react"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { selectPlayers } from "../gameSlice"
import {
  pickAdvancedGalleryPlayer,
  resetAdvancedGalleryPlayer,
  selectAdvancedGalleryIsCardShown,
  selectAdvancedGalleryPlayerId,
  toggleCard,
} from "./advancedSlice"
import useLongPress from "./useLongPress"

export function AdvancedGalleryPlayerSelector() {
  const { t } = useTranslation()
  const theme = useTheme()
  const dispatch = useAppDispatch()

  const players = useAppSelector(selectPlayers)
  const isCardShown = useAppSelector(selectAdvancedGalleryIsCardShown)
  const playerId = useAppSelector(selectAdvancedGalleryPlayerId)

  const onLongPressButton = useLongPress<HTMLButtonElement, string>(
    {
      onLongPress() {
        dispatch(toggleCard())
      },
      onClick() {
        if (isCardShown) {
          dispatch(toggleCard())
          dispatch(resetAdvancedGalleryPlayer())
        }
      },
    },
    { delay: 500 },
  )

  return (
    <Stack sx={{ height: "100%" }} justifyContent="center" alignItems="center">
      <FormControl fullWidth>
        <InputLabel id="select-player-label">
          {t("advanced.secretsGallery.playerLabel")}
        </InputLabel>
        <Select
          disabled={isCardShown}
          labelId="select-player-label"
          id="select-player"
          value={playerId ?? ""}
          label={t("advanced.secretsGallery.playerLabel")}
          onChange={(event) =>
            dispatch(pickAdvancedGalleryPlayer(event.target.value))
          }
        >
          {players.map((player) => {
            return (
              <MenuItem key={player.id} value={player.id}>
                {player.name}
              </MenuItem>
            )
          })}
        </Select>
        <FormHelperText
          hidden={playerId !== undefined}
          sx={{ color: theme.palette.primary.main }}
        >
          {t("advanced.secretsGallery.selectPlayerHint")}
        </FormHelperText>
        <Button
          fullWidth
          variant={isCardShown ? "outlined" : "contained"}
          size={"large"}
          disabled={playerId === undefined}
          sx={{ mt: "5vh" }}
          {...onLongPressButton(playerId)}
        >
          <Fingerprint />
        </Button>
        <FormHelperText
          hidden={playerId === undefined}
          sx={{ color: theme.palette.primary.main }}
        >
          {isCardShown
            ? t("advanced.secretsGallery.hideHint")
            : t("advanced.secretsGallery.showHint")}
        </FormHelperText>
      </FormControl>
    </Stack>
  )
}
