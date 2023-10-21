import ZoomInIcon from "@mui/icons-material/ZoomIn"
import { Card, Stack, Typography } from "@mui/material"
import CardMedia from "@mui/material/CardMedia"
import { ParseKeys } from "i18next"
import { PropsWithChildren } from "react"
import { useTranslation } from "react-i18next"
import { useAppDispatch } from "../../../app/hooks"
import { openCompanyGallery } from "../../gallery/gallerySlice"
import { CompanyCard as GameCompanyCard } from "./gameCompany"

interface Props extends PropsWithChildren<any> {
  card: GameCompanyCard
}

export function CompanyCard({ card }: Props) {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const description = t(`company.${card.id}` as ParseKeys)

  if (card.img) {
    return (
      <Card
        elevation={5}
        sx={{
          width: {
            xs: "12vw",
            sm: "12vw",
          },
        }}
      >
        <CardMedia
          component="img"
          image={card.img}
          alt={description}
          onClick={() => {
            dispatch(openCompanyGallery())
          }}
        />
      </Card>
    )
  } else {
    // ratio: 1.276
    return (
      <Card
        elevation={5}
        sx={{
          width: {
            xs: "12vw",
            sm: "12vw",
          },
          height: {
            xs: "20vw",
            sm: "9vw",
          },
          textAlign: "center",
        }}
        onClick={() => {
          dispatch(openCompanyGallery())
        }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ height: "100%" }}
        >
          <Typography variant={"h6"} fontWeight={"bold"} gutterBottom>
            {card.id.replace("company", "")}
          </Typography>
          <ZoomInIcon />
        </Stack>
      </Card>
    )
  }
}
