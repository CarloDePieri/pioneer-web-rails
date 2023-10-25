export const companyIds = [
  "companyC1",
  "companyC2",
  "companyC3",
  "companyC4",
  "companyC5",
  "companyC6",
  "companyC7",
  "companyC8",
  "companyC9",
  "companyC10",
] as const
export type CompanyId = (typeof companyIds)[number]

export interface CompanyCard {
  id: CompanyId
  img: string
  description: string
}
