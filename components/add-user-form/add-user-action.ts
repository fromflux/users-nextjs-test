'use server';

import z from "zod";
import { addUserFromSchema } from "./add-user-form-schema";

export async function addUser(formData: z.infer<typeof addUserFromSchema>) {
  console.log('> addUser', formData);

  const data = addUserFromSchema.safeParse(formData);

  if (!data.success) {
    return {
      success: false,
    }
  }

  return { success: true }
}