import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["user", "owner"], {
    errorMap: () => ({ message: "Role must be selected" }),
  }),
});

console.log("Testing Login Schema with empty values:");
const loginResult = loginSchema.safeParse({ email: "", password: "" });
console.log(JSON.stringify(loginResult, null, 2));

console.log("\nTesting Signup Schema with empty values:");
const signupResult = signupSchema.safeParse({ email: "", password: "", role: "" });
console.log(JSON.stringify(signupResult, null, 2));
