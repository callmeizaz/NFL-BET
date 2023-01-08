import { axiosInstance } from "../api";
import { UserPayloadInterface } from "../../typings/interfaces/contests";
import { SupportTicketPayloadInterface } from "../../typings/interfaces/support";
import { UserLocationPayloadInterface } from "../../typings/interfaces/location";
import { GOOGLE_GEOCODING_KEY } from "../../constants/config";
/* User services */

// User Information service
export const FetchUserInfo = (userData: UserPayloadInterface) => {
  const { userId } = userData;
  return axiosInstance({
    method: "GET",
    url: `users/${userId}`,
  });
};

export const SendSupportMessage = (
  supportData: SupportTicketPayloadInterface
) => {
  const { userId } = supportData;
  return axiosInstance({
    method: "POST",
    url: `users/${userId}/contact-submissions`,
    data: {
      message: supportData.message,
    },
  });
};

export const FetchUserState = async (
  userLocation: UserLocationPayloadInterface
) => {
  const { lat, lon } = userLocation.locationData;
  const resp = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GOOGLE_GEOCODING_KEY}`
  );
  return resp.json();
};
