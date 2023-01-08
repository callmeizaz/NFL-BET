import * as Yup from "yup";

import {
  checkIfContainsBannedWords,
  checkIfContainsSpaces,
} from "../../helpers/validation";

const phoneRegExp = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;

const registerSchema = Yup.object().shape({
  fullName: Yup.string().required("Fullname is required"),
  username: Yup.string()
    .min(4)
    .max(20)
    .test(
      "is-bad-word",
      "Username contains profanity.Please pick another username",
      (word) => checkIfContainsBannedWords(word || "")
    )
    .test(
      "has-spaces",
      "Username can only be a single word. Please use a different username",
      (word) => checkIfContainsSpaces(word || "")
    )
    .required("Username is required"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .min(12)
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\~\`\@\#\$\%\!\^\&\*\(\)\-\=\_\+\[\]\\\{\}\|\;\'\:\"\,\.\/\<\>\?])[A-Za-z\d\~\`\@\#\$\%\!\^\&\*\(\)\-\=\_\+\[\]\\\{\}\|\;\'\:\"\,\.\/\<\>\?]{12,}$/,
      `Password must contain at least 12 characters, one number, one uppercase alphabet, one lowercase alphabet, and one special character`
    ),
  confirmPassword: Yup.string()
    .when("password", {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both Password need to be same"
      ),
    })
    .required("Confirm Password is required"),
  tosAccepted: Yup.boolean().oneOf(
    [true],
    "Terms of Service must be accepted to proceed"
  ),
  phone: Yup.string().test(
    "len",
    "Must be exactly 10 characters",
    (val: any) => {
      if (val == null || false || "" || undefined) {
        return true;
      } else {
        return val?.length === 10;
      }
    }
  ),

  // phone: Yup.string()
  //   .min(10, "Phone number is not valid")
  //   .matches(phoneRegExp, "Phone is not valid")
  //   .nullable(),
});

export default registerSchema;
