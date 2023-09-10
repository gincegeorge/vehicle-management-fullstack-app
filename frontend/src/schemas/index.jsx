import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Email can't be empty"),
  password: Yup.string().min(6).required("Pasword can't be empty"),
});

export const signUpSchema = Yup.object({
  name: Yup.string().min(2).required("Name can't be empty"),
  email: Yup.string().email().required("Email can't be empty"),
  password: Yup.string().min(6).required("Password can't be empty"),
});
