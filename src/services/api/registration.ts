import { axiosInstance } from ".";
import { RegisterPayloadInterface } from "../../typings/interfaces/register";
import { ForgotPasswordPayloadInterface } from "../../typings/interfaces/forgotpassword";

// Registration services
export const Register = (payload: RegisterPayloadInterface) => {
  return axiosInstance({
    method: "POST",
    url: `users/sign-up`,
    data: payload
  });
};

// Forgot service
export const ForgotPassword = (payload: ForgotPasswordPayloadInterface) => {
  return axiosInstance({
    method: "PATCH",
    url: `users/forgot-password`,
    data: payload
  });
};


