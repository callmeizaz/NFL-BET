import { UserInfo } from "../../typings/interfaces/users";
import { RootState } from "../store";

export const selectFundsData = (state: RootState) => state.userInfo.fundsData;
export const selectUserInfoData = (state: RootState): UserInfo =>
  state.userInfo.userInfoData;
export const selectUserStateData = (state: RootState) =>
  state.userState.locationData;
// export const selectContestsData = state => state
