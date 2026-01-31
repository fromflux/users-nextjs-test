'use server';

import z from "zod";
import { addUserFromSchema } from "./add-user-form-schema";

export async function addUser(formData: z.infer<typeof addUserFromSchema>) {
  const parsed = addUserFromSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
    }
  }

  const res = fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    method: 'POST',
    body: JSON.stringify(parsed.data),
  })

  if (!(await res).ok) {
    throw new Error('Failed to add user');
  }

  return { success: true }
}