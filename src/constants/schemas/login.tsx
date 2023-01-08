import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  emailOrUsername: Yup.string().required("Email Or Username is required"),
  password: Yup.string().required("Password is required"),
});

export default loginSchema;
