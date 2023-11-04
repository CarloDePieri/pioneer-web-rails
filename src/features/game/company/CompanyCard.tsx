import { Card } from "@mui/material"
import CardMedia from "@mui/material/CardMedia"
import { PropsWithChildren } from "react"
import { useAppDispatch } from "../../../app/hooks"
import { openCompanyGallery } from "../../gallery/gallerySlice"
import { CompanyCard as GameCompanyCard } from "./Company"

interface Props extends PropsWithChildren<any> {
  card: GameCompanyCard
}

export function CompanyCard({ card }: Readonly<Props>) {
  const dispatch = useAppDispatch()

  return (
    <Card
      elevation={5}
      sx={{
        width: {
          xs: "20vw",
          sm: "12vw",
        },
      }}
    >
      <CardMedia
        component="img"
        image={card.img}
        alt={card.description}
        onClick={() => {
          dispatch(openCompanyGallery())
        }}
      />
    </Card>
  )
}
