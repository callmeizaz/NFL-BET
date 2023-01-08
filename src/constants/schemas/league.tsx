import * as Yup from "yup";

export const inviteMembersSchema = Yup.object().shape({
  invitees: Yup.array().of(
    Yup.object().shape({
      email: Yup.string()
        .email("Email is invalid")
        .required("Email is required"),
    })
  ),
});
