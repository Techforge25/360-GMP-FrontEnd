import { object, ref, string } from "yup";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()[\]{}|\\<>+=._-])[A-Za-z\d@$!%*?&^#()[\]{}|\\<>+=._-]+$/;

export const signupSchema = object({
  email: string().email("Invalid email").required("Email is required"),
  password: string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long.")
    .matches(
      passwordRegex,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
    ),
  confirmPassword: string()
    .required("Confirm password is required")
    .oneOf([ref("password")], "Passwords do not match"),
});

export const forgotPasswordSchema = object({
  email: string().email("Invalid email").required("Email is required"),
})