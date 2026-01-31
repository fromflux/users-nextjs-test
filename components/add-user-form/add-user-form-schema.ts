import z from "zod";

import { countryCodes } from "@/lib/world-countries-json/countries";

// fullname: 'fasd',
// age: '234',
// country: 'AFG',
// interests: [ 'coding', 'music' ]

export const addUserFromSchema = z.object({
  fullname: z.string().nonempty('Name is required'),
  age: z.coerce.number<number>().gte(18, { error: 'Age must be a number 18 or over' }),
  country: z.enum([...countryCodes, 'NIL']).refine(val => val !== 'NIL', { error: "Country is required" }),
  interests: z.object({
    coding: z.boolean(),
    music: z.boolean(),
    reading: z.boolean(),
    sports: z.boolean(),
  }).refine(
    interests => interests.coding === true
      || interests.music === true
      || interests.reading === true
      || interests.sports === true
    , { error: 'Please select at least one interest' }),
  // country: z.string('Must be valid country code').refine((val) => countryCodes.includes(val)),
  // interests: z.array(z.string()).nonempty(),
});