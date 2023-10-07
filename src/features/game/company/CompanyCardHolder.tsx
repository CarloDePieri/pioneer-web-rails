import { Stack } from "@mui/material"
import { useAppSelector } from "../../../app/hooks"
import { selectCompanyCard } from "../gameSlice"
import { CompanyCard } from "./CompanyCard"

export function CompanyCardHolder() {
  const companyCard = useAppSelector(selectCompanyCard)

  if (companyCard === undefined) {
    return <></>
  } else {
    return (
      <Stack mb={4} alignItems={"center"}>
        <CompanyCard card={companyCard} />
      </Stack>
    )
  }
}
