import React, { useState, useEffect } from "react";
import { useHistory, matchPath } from "react-router-dom";
import { Route } from "react-router-dom";
import { reverse } from "named-urls";
import { useLocation } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
// import { CometChat } from "@cometchat-pro/chat";

import Sidebar from "../Sidebar";
import FundsPopUp from "../FundsPopup";

import { AppDispatch, useAppSelector, useAppDispatch } from "../../redux/store";

// import {
//   doAsyncCometRegistration,
//   getAsyncLoginAuthToken,
// } from "../../redux/thunks/comet";

import {
  selectUserData,
  selectCometApiKey,
  selectCometAppId,
  selectCometAuthKey,
  selectCometRegion,
  selectConfig,
} from "../../redux/selectors/authentication";
import { selectUserInfoData } from "../../redux/selectors/users";
// import { setCometUser } from "../../redux/reducers/cometAuthSlice";

import redirectPaths from "../../constants/redirectRoutes";
import { Props } from "./interfaces";
import routes from "../../constants/routes";
import useStyles from "./styles";
// import { COMET_AUTH_KEY } from "../../constants/config";
import { APP_ENV } from "../../constants/config";

const ProtectedRoute: React.VFC<Props> = ({
  component,
  layout: Layout,
  ...rest
}) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const dispatch: AppDispatch = useAppDispatch();
  const userData = useAppSelector(selectUserData);
  const config = useAppSelector(selectConfig);
  const userInfoData = useAppSelector(selectUserInfoData);
  const cometAppId = useAppSelector(selectCometAppId);
  const cometApiKey = useAppSelector(selectCometApiKey);
  const cometAuthKey = useAppSelector(selectCometAuthKey);
  const cometRegion = useAppSelector(selectCometRegion);

  // console.log(
  //   !config?.hasDeposits,
  //   config?.paidContests,
  //   !config?.hasDeposits && config?.paidContests
  // );

  const [isFundsPopUpOpen, setIsFundsPopUpOpen] = useState(
    !config?.hasDeposits && config?.paidContests
  );
  // popup data
  const fundsPopupData = {
    id: "100percDepositMatch29Dec2021",
    title: "100% Deposit Match up to $50",
    offerMessage:
      "Deposit up to $50 and receive a 100% deposit match of immediately playable funds",
    offerDuration: "State restrictions apply. See Rules for more details",
  };

  // const cometChatInit = async () => {
  //   const appSetting = new CometChat.AppSettingsBuilder()
  //     .subscribePresenceForAllUsers()
  //     .setRegion(cometRegion)
  //     .build();
  //   CometChat.init(cometAppId, appSetting).then(
  //     () => {
  //       if (CometChat.setSource) {
  //         CometChat.setSource("ui-kit", "web", "reactjs");
  //       }
  //       cometChatSession(userInfoData);
  //       console.log("Comet Initialization completed successfully");
  //     },
  //     (error) => {
  //       console.log("Comet Initialization failed with error:", error);
  //       // Check the reason for error and take appropriate action.
  //     }
  //   );
  // };

  // const cometChatSession = async (userInfo: any) => {
  //   const id = userInfo?.id;
  //   const uid = `${APP_ENV}_${userInfo?.id}`;
  //   const name = userInfo?.fullName;
  //   const user = await CometChat.getLoggedinUser();
  //   await CometChat.login(uid, cometAuthKey).then(
  //     (user) => {
  //       console.log("Login successfully", user);
  //       dispatch(setCometUser({ ...user }));
  //     },
  //     (error) => {
  //       // Register a new comet user and login the user
  //       console.log("Login failed with exception:", { error });
  //       if (error.code === "ERR_UID_NOT_FOUND") {
  //         let user = new CometChat.User(uid);
  //         user.setName(name);
  //         CometChat.createUser(user, cometAuthKey).then(
  //           (user) => {
  //             CometChat.login(uid, cometAuthKey).then(
  //               (user) => {
  //                 console.log("New Comet User Login successful", user);
  //                 dispatch(setCometUser({ ...user }));
  //               },
  //               (error) => {
  //                 console.log("Login failed with exception:", { error });
  //               }
  //             );
  //           },
  //           (error) => {
  //             console.log("Error creating a new Comet user", error);
  //           }
  //         );
  //       }
  //     }
  //   );
  // };

  useEffect(() => {
    if (userData === null) {
      const match = matchPath(
        location.pathname,
        routes.dashboard.league.invitation
      );

      let isMatchedPath = false;

      redirectPaths.forEach((path) => {
        const match = matchPath(location.pathname, path);

        if (match?.isExact) {
          isMatchedPath = true;
        }
      });
      const encoded = encodeURI(location.pathname);

      history.push({
        pathname: routes.public.login,
        search: isMatchedPath ? `?returnUrl=${encoded}` : "",
      });
    } else {
      if (userInfoData) {
        // cometChatInit();
      }
      // if (config?.paidContests && !config?.hasDeposits) {
      //   setIsFundsPopUpOpen(true);
      // } else {
      //   setIsFundsPopUpOpen(false);
      // }
    }
  }, [userData, userInfoData, location]);

  const handleFundsPopUpConfirm = () => {
    history.replace(`${reverse(routes.profile.home)}?tab=wallet`);
    setIsFundsPopUpOpen(false);
  };

  useEffect(() => {
    const popUpEmails = localStorage.getItem("popUpEmails") || "{}";
    const popUpEmailsObject = JSON.parse(popUpEmails);
    const foundEmail = popUpEmailsObject[userData?.email];
    if (!config?.hasDeposits && config?.paidContests) {
      if (foundEmail) {
        if (foundEmail != fundsPopupData.id) {
          setIsFundsPopUpOpen(true);
        } else {
          setIsFundsPopUpOpen(false);
        }
      } else {
        setIsFundsPopUpOpen(true);
      }
    }

    // if (foundEmail.id != fundsPopupData.id) {
    //   setIsFundsPopUpOpen(true);
    // } else {
    //   setIsFundsPopUpOpen(false);
    // }
  }, []);

  return (
    <Route
      render={(props) => (
        <div className={classes.root}>
          <CssBaseline />
          <Sidebar />
          <Layout component={component} />
          <FundsPopUp
            open={isFundsPopUpOpen}
            handleClose={setIsFundsPopUpOpen}
            handleConfirm={handleFundsPopUpConfirm}
            popupData={fundsPopupData}
          />
        </div>
      )}
      {...rest}
    />
  );
};

export default ProtectedRoute;
