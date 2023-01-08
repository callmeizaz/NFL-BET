import { axiosInstance } from "../api";
import {
  LoginPayloadInterface,
  RegisterPayloadInterface,
  ForgotPasswordPayloadInterface,
  ResetPasswordPayloadInterface,
} from "../../typings/interfaces/authentication";

// Authentication services
export const Login = (payload: LoginPayloadInterface) => {
  return axiosInstance({
    method: "POST",
    url: `users/login/`,
    data: payload,
  });
};

// Registration services
export const Register = (payload: RegisterPayloadInterface) => {
  return axiosInstance({
    method: "POST",
    url: `users/sign-up`,
    data: payload,
  });
};

// Forgot service
export const ForgotPassword = (payload: ForgotPasswordPayloadInterface) => {
  return axiosInstance({
    method: "PATCH",
    url: `users/forgot-password`,
    data: payload,
  });
};


// Reset service
export const ResetPassword = (payload: ResetPasswordPayloadInterface) => {
  return axiosInstance({
    method: "PATCH",
    url: `users/reset-password`,
    data: payload,
  });
};
