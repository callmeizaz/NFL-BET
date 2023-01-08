import { RootState } from "../store";

export const selectUserData = (state: RootState) => state.auth.userData;
export const selectToken = (state: RootState) => state.auth.token;
export const selectRunType = (state: RootState) => state.auth.type;
export const selectDwollaEnv = (state: RootState) => state.auth.DWOLLA_ENV;
export const selectCometAppId = (state: RootState) => state.auth.COMET_APP_ID;
export const selectCometAuthKey = (state: RootState) => state.auth.COMET_AUTH_KEY;
export const selectCometApiKey = (state: RootState) => state.auth.COMET_API_KEY;
export const selectCometRegion = (state: RootState) => state.auth.COMET_REGION;
export const selectConfig = (state: RootState) => state.auth.config;
