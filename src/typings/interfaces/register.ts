import moment from "moment";

export interface RegisterPayloadInterface {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  promo?: string | null;
  signUpState: string | null;
  signUpCountry: string | null;
  dateOfBirth: moment.Moment;
  phone: string | null;
}
