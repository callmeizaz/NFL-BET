import * as Yup from "yup";

const resetPasswordSchema = Yup.object().shape({
  password: Yup.
  string().
  min(12).
  required("Password is required").
  matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\~\`\@\#\$\%\!\^\&\*\(\)\-\=\_\+\[\]\\\{\}\|\;\'\:\"\,\.\/\<\>\?])[A-Za-z\d\~\`\@\#\$\%\!\^\&\*\(\)\-\=\_\+\[\]\\\{\}\|\;\'\:\"\,\.\/\<\>\?]{12,}$/,
         `Password must contain at least 12 characters, one number, one uppercase alphabet, one lowercase alphabet, and one special character`),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

export default resetPasswordSchema;
