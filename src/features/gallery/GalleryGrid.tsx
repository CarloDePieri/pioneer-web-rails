import ArrowLeftIcon from "@mui/icons-material/ArrowLeft"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import { Box, Button, Container, Stack } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import React, { PropsWithChildren } from "react"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectConfigCompany } from "../game/gameSlice"
import {
  openCompanyGallery,
  openGoalsGallery,
  selectGalleryWindow,
} from "./gallerySlice"

interface Props extends PropsWithChildren<any> {
  children: string | React.JSX.Element | React.JSX.Element[]
}

export function GalleryGrid({ children }: Props) {
  const theme = useTheme()
  const largeScreen = useMediaQuery(theme.breakpoints.up("sm"))
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const window = useAppSelector(selectGalleryWindow)
  const isGoalsWindow = window === "goals"
  const company = useAppSelector(selectConfigCompany)

  const changeWindowButton = (
    <Box alignSelf={"center"}>
      <Button
        variant={"contained"}
        startIcon={isGoalsWindow ? <ArrowLeftIcon /> : ""}
        endIcon={isGoalsWindow ? "" : <ArrowRightIcon />}
        onClick={(event) => {
          event.stopPropagation()
          if (isGoalsWindow) dispatch(openCompanyGallery())
          else dispatch(openGoalsGallery())
        }}
      >
        {isGoalsWindow ? t("gallery.company") : t("gallery.goals")}
      </Button>
    </Box>
  )
  const showButtonRight = company && !isGoalsWindow
  const showButtonLeft = company && isGoalsWindow

  if (largeScreen) {
    return (
      <Container style={{ width: company ? "90vw" : "80vw" }}>
        <Stack direction={"row"} spacing={8} sx={{ height: "85vh" }}>
          {showButtonLeft ? changeWindowButton : <></>}
          {children}
          {showButtonRight ? changeWindowButton : <></>}
        </Stack>
      </Container>
    )
  } else {
    return (
      <Container style={{ width: "80vw" }}>
        <Stack
          justifyContent="center"
          alignItems="center"
          direction={"column"}
          spacing={8}
          sx={{ height: "100vh", pt: "5vh", pb: "5vh" }}
        >
          {children}
          {company ? changeWindowButton : <></>}
        </Stack>
      </Container>
    )
  }
}
