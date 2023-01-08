import { RootState } from "../store";

export const selectCometUserData = (state: RootState) => state.cometAuth.userData;
