/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
// "use server";

// import { signIn } from "next-auth/react";

// export async function authenticate(_currentState: unknown, formData: FormData) {
//   try {
//     await signIn("credentials", {
//       redirect: false,
//       email: formData.get("email"),
//       password: formData.get("password"),
//     });
//   } catch (error: any) {
//     switch (error?.type) {
//       case "CredentialsSignin":
//         return "Invalid credentials.";
//       default:
//         return "Something went wrong.";
//     }
//   }
// }

"use server";
import { signIn } from "next-auth/react";
import { mockUsers } from "./mockUsers";

export async function authenticate(_currentState: unknown, formData: FormData) {
  try {
    // Call NextAuth's `signIn` function with credentials
    // const response = await signIn("credentials", {
    //   redirect: false, // Prevent automatic redirection
    //   email: formData.get("email"),
    //   password: formData.get("password"),
    // });

    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    const user = mockUsers.find((user) => user.email === email);

    // Check if the user exists and the password matches
    if (!user || user.password !== password) {
      return "Invalid credentials.";
    }

    // if (response?.error) {
    //   // Return an error message if the sign-in fails
    //   return response.error === "CredentialsSignin"
    //     ? "Invalid credentials."
    //     : "Something went wrong.";
    // }

    // return null; // Successful login, no error message
  } catch (error: any) {
    return "Something went wrong.";
  }
}
