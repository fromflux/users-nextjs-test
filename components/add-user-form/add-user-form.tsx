'use client';

import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { addUserFromSchema } from "@/components/add-user-form/add-user-form-schema";
import { addUser } from "@/components/add-user-form/add-user-action";
import { toast } from "sonner";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import countriesData from "@/lib/world-countries-json/countries.json";
import { countryCodes } from "@/lib/world-countries-json/countries";
import { Checkbox } from "../ui/checkbox";

export default function AddUserForm() {
  const form = useForm({
    defaultValues: {
      fullname: '',
      age: 0,
      country: 'NIL' as const,
      interests: {
        coding: false,
        music: false,
        reading: false,
        sports: false,
      }
    },
    resolver: zodResolver(addUserFromSchema)
  });

  async function onSubmit(formData: z.infer<typeof addUserFromSchema>) {
    console.log('onSubmit', formData)

    const res = await addUser(formData);

    console.log('res', res)

    if (res.success) {
      form.reset();
      toast.success('User added successfully')
    } else {
      toast.error('Failed to add user')
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>

        <Controller
          control={form.control}
          name="fullname"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
              <Input id={field.name} {...field} aria-invalid={fieldState.invalid} />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
          <Controller
            control={form.control}
            name="age"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Age</FieldLabel>
                <Input type='number' id={field.name} {...field} aria-invalid={fieldState.invalid} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name='country'
            render={({ field: { onChange, onBlur, ...field }, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Country</FieldLabel>
                <Select {...field} onValueChange={onChange}>
                  <SelectTrigger onBlur={onBlur} id={field.name} aria-label='Select country' aria-invalid={fieldState.invalid}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={'NIL'}>Select a country</SelectItem>
                    {countriesData.map((country, index) => (
                      <SelectItem key={country.isoAlpha3} value={countryCodes[index]}>{country.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <FieldSet>
          <FieldContent aria-invalid={form.control.getFieldState('interests').invalid}>
            <FieldLegend
              aria-invalid={form.control.getFieldState('interests').invalid}
              variant="label"
            >
              Interests
            </FieldLegend>
            <FieldDescription>Select at least one interest</FieldDescription>
          </FieldContent>

          <FieldGroup data-slot="checkbox-group">
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
              <Controller
                control={form.control}
                name='interests.coding'
                render={({ field: { value, onChange, ...field }, fieldState }) => (
                  <Field data-invalid={form.control.getFieldState('interests').invalid} orientation='horizontal'>
                    <Checkbox
                      id={field.name}
                      {...field}
                      checked={value}
                      onCheckedChange={onChange}
                      aria-invalid={form.control.getFieldState('interests').invalid}
                    />
                    <FieldContent>
                      <FieldLabel htmlFor={field.name}>Coding</FieldLabel>
                    </FieldContent>
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name='interests.music'
                render={({ field: { value, onChange, ...field }, fieldState }) => (
                  <Field data-invalid={form.control.getFieldState('interests').invalid} orientation='horizontal'>
                    <Checkbox
                      id={field.name}
                      {...field}
                      checked={value}
                      onCheckedChange={onChange}
                      aria-invalid={form.control.getFieldState('interests').invalid}
                    />
                    <FieldContent>
                      <FieldLabel htmlFor={field.name}>Music</FieldLabel>
                    </FieldContent>
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name='interests.reading'
                render={({ field: { value, onChange, ...field }, fieldState }) => (
                  <Field data-invalid={form.control.getFieldState('interests').invalid} orientation='horizontal'>
                    <Checkbox
                      id={field.name}
                      {...field}
                      checked={value}
                      onCheckedChange={onChange}
                      aria-invalid={form.control.getFieldState('interests').invalid}
                    />
                    <FieldContent>
                      <FieldLabel htmlFor={field.name}>Reading</FieldLabel>
                    </FieldContent>
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name='interests.sports'
                render={({ field: { value, onChange, ...field }, fieldState }) => (
                  <Field data-invalid={form.control.getFieldState('interests').invalid} orientation='horizontal'>
                    <Checkbox
                      id={field.name} {...field}
                      checked={value} onCheckedChange={onChange}
                      aria-invalid={form.control.getFieldState('interests').invalid}
                    />
                    <FieldContent>
                      <FieldLabel htmlFor={field.name}>Sports</FieldLabel>
                    </FieldContent>
                  </Field>
                )}
              />
            </div>

            {form.formState.isDirty || form.formState.isSubmitted && form.control.getFieldState('interests').error && (
              <FieldError errors={[{ message: form.control.getFieldState('interests').error?.message }]} />
            )}

          </FieldGroup>
        </FieldSet>

        <Button type="submit">Add</Button>

      </FieldGroup>
    </form>
  );
}
