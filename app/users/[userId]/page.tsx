import { Item, ItemContent, ItemHeader, ItemTitle } from "@/components/ui/item";
import { TUserDTO } from "../types";
import { countries } from "@/lib/world-countries-json/countries";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldContent, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";


export default async function UserDetailPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch user for id: ${userId}`);
  }
  const user = await res.json() as TUserDTO;

  const country = countries.find(country => country.isoAlpha3 === user.country);

  return (
    <div className="container mx-auto px-4 my-6">
      <h1 className="text-xl font-semibold mb-6">User Details</h1>
      <Item variant="outline">
        <ItemHeader>
          <ItemTitle className="text-xl font-semibold">{user.fullname}</ItemTitle>
        </ItemHeader>
        <ItemContent className="flex flex-col gap-3">

          <div>{country?.name ?? user.country}</div>

          <div>{user.age} years old</div>

          <FieldSet>
            <FieldContent>
              <FieldLegend variant="label">
                Interests
              </FieldLegend>
            </FieldContent>

            <FieldGroup data-slot="checkbox-group">
              <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                {Object.entries(user.interests).filter(interest => interest[1]).map(interest => (
                  <Field orientation='horizontal' key={interest[0]}>
                    <Checkbox
                      id={interest[0]}
                      checked={interest[1]}
                      disabled
                    />
                    <FieldContent>
                      <FieldLabel htmlFor={interest[0]} className="capitalize">{interest[0]}</FieldLabel>
                    </FieldContent>
                  </Field>
                ))}
              </div>
            </FieldGroup>
          </FieldSet>
        </ItemContent>
      </Item>
    </div>
  );
}
