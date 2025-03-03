import type { DecodedIdToken } from "firebase-admin/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";
import { auth } from "@/app/lib/firebase-admin";

export function serverAction<Schema extends z.Schema, Return>(
  inputSchema: Schema,
  action: (authUser: DecodedIdToken, input: z.infer<Schema>) => Promise<Return>
): (input: z.infer<Schema>) => Promise<Return> {
  return async (input: z.infer<Schema>) => {
    try {
      const token = (await cookies()).get("token")?.value;
      if (!token) {
        return redirect("/errors/401");
      }

      const authUser = await auth.verifyIdToken(token);
      if (!authUser) {
        return redirect("/errors/401");
      }

      const safeInput = inputSchema.safeParse(input);
      if (safeInput.error) {
        return redirect("/errors/500");
      }

      return await action(authUser, safeInput.data);
    } catch (e) {
      console.error(e);

      return redirect("/errors/500");
    }
  };
}
