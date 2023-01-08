import * as Yup from "yup";
import {
  checkIfFilesAreTooBig,
  checkIfFilesAreCorrectType,
} from "../../helpers/validation";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const identityVerificationSchema = (ssnDigits: number) => Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  ssn: Yup.string()
    .test("len", ssnDigits == 4 ? `Must be your SSN last ${ssnDigits} digits` : `Must be your full SSN (${ssnDigits} digits).`, (val: any) => val?.length === ssnDigits)
    .required(),
  dateOfBirth: Yup.object().nullable().required(),
  address1: Yup.string().required(),
  city: Yup.string().required(),
  phone: Yup.string()
    .test("len", "Must be exactly 10 characters", (val: any) => val?.length === 10)
    .required(),
  state: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.object().required(),
    })
    // .nullable()
    .required(),

  zipcode: Yup.string()
    .test("len", "Must be exactly 5 characters", (val: any) => val?.length === 5)
    .required(),
  file: Yup.mixed()
    // .required("A file is required")
    .test("is-correct-file", "File is too large", (file) =>
      checkIfFilesAreTooBig(9, file)
    )
    .test("is-correct-type", "File is of incorrect type", (file) =>
      checkIfFilesAreCorrectType(SUPPORTED_FORMATS, file)
    ),
  // uploadBack: Yup.mixed()
  //   .required("A file is required")
  //   .test("is-correct-file", "File is too large", (file) =>
  //     checkIfFilesAreTooBig(9, file)
  //   )
  //   .test("is-correct-type", "File is of incorrect type", (file) =>
  //     checkIfFilesAreCorrectType(SUPPORTED_FORMATS, file)
  //   ),
});

export default identityVerificationSchema;
