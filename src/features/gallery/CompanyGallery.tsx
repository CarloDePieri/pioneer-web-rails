import { Box, Card, CardContent, Stack, Typography } from "@mui/material"
import CardMedia from "@mui/material/CardMedia"
import { ParseKeys } from "i18next"
import { useTranslation } from "react-i18next"
import { useAppSelector } from "../../app/hooks"
import { CompanyCard } from "../game/company/gameCompany"
import { selectCompanyCard } from "../game/gameSlice"

export function CompanyGallery() {
  const card = useAppSelector(selectCompanyCard) as CompanyCard
  const { t } = useTranslation()
  const description = t(`company.${card.id}` as ParseKeys)

  if (card.img !== undefined) {
    return (
      <Stack justifyContent="center" alignItems="center">
        <Card
          elevation={5}
          sx={{ width: "60vw", display: "flex" }}
          onClick={(event) => event.stopPropagation()}
        >
          <CardMedia
            sx={{ width: "30vw" }}
            component="img"
            image={card.img}
            alt={description}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography
                component="div"
                variant="body1"
                align={"center"}
                fontWeight={"bold"}
              >
                {description}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </Stack>
    )
  } else {
    return (
      <Stack justifyContent="center" alignItems="center">
        <Card
          elevation={5}
          sx={{ width: "60vw", display: "flex" }}
          onClick={(event) => event.stopPropagation()}
        >
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ width: "30vw" }}
          >
            <Typography
              component="div"
              variant="body1"
              align={"center"}
              fontWeight={"bold"}
            >
              {card.id.replace("company", "")}
            </Typography>
          </Stack>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography
                component="div"
                variant="body1"
                align={"center"}
                fontWeight={"bold"}
              >
                {description}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </Stack>
    )
  }
}
