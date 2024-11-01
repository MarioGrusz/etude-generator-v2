"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createSession, deleteSession } from "~/app/lib/session";
import { getUser } from "~/server/db/getUser";
import bcrypt from "bcrypt";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function login(prevState: unknown, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;
  const user = await getUser(email);

  if (user && (await bcrypt.compare(password, user.password))) {
    await createSession(user.id);
    redirect("/admin");
  } else {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
