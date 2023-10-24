import { Box, Card, Stack, Typography } from "@mui/material"
import CardMedia from "@mui/material/CardMedia"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import { ParseKeys } from "i18next"
import React from "react"
import { useTranslation } from "react-i18next"
import { useAppSelector } from "../../app/hooks"
import { CompanyCard } from "../game/company/gameCompany"
import { selectCompanyCard } from "../game/gameSlice"

export function GalleryCompanyCard() {
  const card = useAppSelector(selectCompanyCard) as CompanyCard
  const { t } = useTranslation()
  const description = t(`company.${card.id}` as ParseKeys)
  const theme = useTheme()
  const largeScreen = useMediaQuery(theme.breakpoints.up("sm"))

  if (largeScreen) {
    return (
      <Stack justifyContent="center" alignItems="center">
        <Card
          elevation={5}
          style={{ display: "flex" }}
          onClick={(event) => event.stopPropagation()}
        >
          <CardMedia
            sx={{ width: "50vw" }}
            component="img"
            image={card.img}
            alt={description}
          />
          <Box
            justifyContent={"center"}
            alignItems={"center"}
            style={{
              flexGrow: 1,
              display: "flex",
              paddingLeft: 8,
              paddingRight: 8,
            }}
          >
            <Typography variant="body2" fontWeight={"bold"} align={"center"}>
              {description}
            </Typography>
          </Box>
        </Card>
      </Stack>
    )
  } else {
    return (
      <Card elevation={5} onClick={(event) => event.stopPropagation()}>
        <Stack
          direction={"column-reverse"}
          style={{
            height: "100%",
          }}
        >
          <Box
            justifyContent={"center"}
            alignItems={"center"}
            style={{
              flexGrow: 1,
              display: "flex",
              padding: 8,
            }}
          >
            <Typography variant="body2" fontWeight={"bold"} align={"center"}>
              {description}
            </Typography>
          </Box>
          <CardMedia component="img" image={card.img} alt={description} />
        </Stack>
      </Card>
    )
  }
}
