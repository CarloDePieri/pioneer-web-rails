import { Box, Card, Stack, Typography } from "@mui/material"
import CardMedia from "@mui/material/CardMedia"
import React from "react"
import { useAppSelector } from "../../../app/hooks"
import { CompanyCard } from "../company/Company"
import { selectCompanyCard } from "../gameSlice"
import useIsLargeScreen from "../../theme/useIsLargeScreen"

export function GalleryCompanyCard() {
  // get the card - I'm sure it's there by now
  const card = useAppSelector(selectCompanyCard) as CompanyCard
  const description = card.description
  const image = card.img

  const isLargeScreen = useIsLargeScreen()

  if (isLargeScreen) {
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
            image={image}
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
          <CardMedia component="img" image={image} alt={description} />
        </Stack>
      </Card>
    )
  }
}
