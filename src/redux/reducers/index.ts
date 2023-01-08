import { leaguesSlice } from "./leagueSlice";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import history from "../history";

import authenticationSlice from "./authenticationSlice";
import contestsSlice from "./contestsSlice";
import playersSlice from "./playersSlice";
import teamsSlice from "./teamsSlice";
import miscellaneousSlice from "./miscellaneousSlice";
import { userInfoSlice, userStateSlice } from "./userSlice";
import registrationSlice from "./registrationSlice";
import importSlice from "./importSlice";
import leagueContestsSlice from "./leagueContestsSlice";
import { addFundSlice, walletSlice } from "./walletSlice";
import cometAuthSlice from "./cometAuthSlice";

const rootPersistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  blacklist: [
    "router",
    "miscellaneous",
    "contestsSlice",
    "fundsSlice",
    "userInfoSlice",
    "addNewCardSlice",
    "fetchCardSlice",
    "addFundSlice",
    "addNewPayoutSlice",
    "playersSlice",
    "userStateSlice",
    "importSlice",
    "leagueContestsSlice",
  ],
};

const authPersistConfig = {
  key: "auth",
  storage: storage,
  blacklist: [
    "miscellaneous",
    "contestsSlice",
    "userInfoSlice",
    "walletSlice",
    "addNewCardSlice",
    "fetchCardSlice",
    "addFundSlice",
    "addNewPayoutSlice",
    "playersSlice",
    "importSlice",
    "leagueContestsSlice",
  ],
};

const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: persistReducer(authPersistConfig, authenticationSlice.reducer),
  miscellaneous: miscellaneousSlice.reducer,
  contests: contestsSlice.reducer,
  wallet: walletSlice.reducer,
  userInfo: userInfoSlice.reducer,
  registration: registrationSlice.reducer,
  addFundData: addFundSlice.reducer,
  players: playersSlice.reducer,
  teams: teamsSlice.reducer,
  userState: userStateSlice.reducer,
  leagues: leaguesSlice.reducer,
  import: importSlice.reducer,
  leagueContests: leagueContestsSlice.reducer,
  cometAuth:cometAuthSlice.reducer
});

const persistedRootReducer = persistReducer<any, any>(
  rootPersistConfig,
  rootReducer
);

export default persistedRootReducer;
