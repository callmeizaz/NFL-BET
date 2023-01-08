import { axiosInstance } from "../api";
import { SupportTicketPayloadInterface } from "../../typings/interfaces/support";

// User Information service
export const FetchUserInfo = (supportTicket: SupportTicketPayloadInterface) => {
  const { userId } = supportTicket;
  return axiosInstance({
    method: "POST",
    data: supportTicket,
    url: `users/${userId}/contact-submissions`,
  });
};
