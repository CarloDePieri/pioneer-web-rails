import { useAppSelector } from "../../../app/hooks";
import { selectCompanyCard } from "../gameSlice";

export function CompanyCard() {
  let companyCard = useAppSelector(selectCompanyCard)

  return (
    <div>
      <p>Company Card: {companyCard ? companyCard.id : ""}</p>
    </div>
  )
}
