// export interface LoginPayloadInterface {
//   id: string;
// }

export interface LoginPayloadInterface {
  emailOrUsername: string;
  password: string;
  state?: string;
  country?: string;
}

export interface RegisterPayloadInterface {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordPayloadInterface {
  email: string;
}

export interface ResetPasswordPayloadInterface {
  password: string;
  confirmPassword: string;
  forgotPasswordToken: string;
}
