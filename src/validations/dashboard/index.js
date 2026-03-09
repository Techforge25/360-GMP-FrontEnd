import { object, string } from "yup";

export const searchSchema = object({
     query: string(),
     location:
          string()
               .matches(/^[a-zA-Z\s]*$/, "Only letters and spaces allowed"),
     type: string(),
});