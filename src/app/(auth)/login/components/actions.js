"use server";

import { LOGIN_URL } from "@/constants/apiUrls";

export const handleLogin = async (values) => {
  if (values) {
    let result;
    try {
      const res = await fetch(LOGIN_URL, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(res);

      if (!res.ok) {
        const error = await res.json();
        return { message: error.message, error: true };
      }

      result = await res.json();
      return { message: "Login Successful", error: false, result };
    } catch (e) {
      return { message: e?.message, error: true };
    }
  }

  // revalidatePath("/");
  // redirect("/");
};
