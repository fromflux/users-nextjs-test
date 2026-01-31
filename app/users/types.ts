import { countryCodes } from "@/lib/world-countries-json/countries";

export type TUserDTO = {
  id: string
  fullname: string
  age: number
  country: typeof countryCodes[number]
  interests: { coding: boolean, music: boolean, reading: boolean, sports: boolean }
}