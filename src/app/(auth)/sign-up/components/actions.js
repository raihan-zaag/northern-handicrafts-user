"use server";

import { SIGNUP_URL } from "@/constants/apiUrls";

export const handleSignUp = async (values) => {
  if (values) {
    let result;
    try {
      const res = await fetch(SIGNUP_URL, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const error = await res.json();
        return { message: error.message, error: true };
      }

      result = await res.json();
    } catch (e) {
      return { message: e?.message, error: true };
    }

    return { message: "Register Successfully Done.", error: false, result };
  }

  // revalidatePath("/");
  // redirect("/");
};
