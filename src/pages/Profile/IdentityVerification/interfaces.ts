import { Moment } from "moment";

export interface IdentityVerificationProps {}

export interface IdentityVerificationForm {
  firstName: string;
  lastName: string;
  ssn: string;
  dateOfBirth: Moment;
  address1: string;
  city: string;
  state: {
    label: string;
    value: {
      key: string;
    };
  } | null;
  // country: {
  //   label: string;
  //   value: {
  //     key: string;
  //   };
  // } | null;
  phone: string;
  zipcode: string;
  file: File | Blob | null;
  // uploadBack: File | Blob | null;
}
