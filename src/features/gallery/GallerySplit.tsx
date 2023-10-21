import ArrowLeftIcon from "@mui/icons-material/ArrowLeft"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import { Button, Grid, Stack } from "@mui/material"
import React from "react"
import { Trans, useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { CompanyGallery } from "./CompanyGallery"
import {
  openCompanyGallery,
  openGoalsGallery,
  selectGalleryWindow,
} from "./gallerySlice"
import { GoalsGallery } from "./GoalsGallery"

export function GallerySplit() {
  const dispatch = useAppDispatch()
  const window = useAppSelector(selectGalleryWindow)
  const { t } = useTranslation()

  if (window === "goals") {
    return (
      <Grid container spacing={2} style={{ width: "100%" }}>
        <Grid item xs={3} alignContent={"center"} justifyContent={"center"}>
          <Stack
            style={{ height: "100%" }}
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variant={"contained"}
              startIcon={<ArrowLeftIcon />}
              onClick={(event) => {
                event.stopPropagation()
                dispatch(openCompanyGallery())
              }}
            >
              {t("gallery.company")}
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={9}>
          <GoalsGallery />
        </Grid>
      </Grid>
    )
  } else {
    return (
      <Grid container spacing={2} style={{ width: "100%" }}>
        <Grid item xs={9}>
          <CompanyGallery />
        </Grid>
        <Grid item xs={3} alignContent={"center"} justifyContent={"center"}>
          <Stack
            style={{ height: "100%" }}
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variant={"contained"}
              endIcon={<ArrowRightIcon />}
              onClick={(event) => {
                event.stopPropagation()
                dispatch(openGoalsGallery())
              }}
            >
              {t("gallery.goals")}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    )
  }
}
