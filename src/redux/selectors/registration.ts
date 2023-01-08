import { RootState } from "../store";

export const selectRegistrationData = (state: RootState) => state.registration.registrationData;
// export const selectRegisteredUserToken = state => state.registration.registrationData.data;
