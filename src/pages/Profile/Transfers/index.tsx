import { Fragment, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TransfersTable from "../../../components/TransfersTable";

import {
  AppDispatch,
  useAppDispatch,
  useAppSelector,
} from "../../../redux/store";

import { resetLoading } from "../../../redux/reducers/walletSlice";

import useStyles from "./styles";

import CircularProgress from "@material-ui/core/CircularProgress";
import { selectUserData } from "../../../redux/selectors/authentication";
import { fetchAsyncTransfers } from "../../../redux/thunks/wallet";
import { selectWalletFundsData, selectWalletTransfersData } from "../../../redux/selectors/wallet";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core";

const Transfers = (props: any) => {
  const dispatch: AppDispatch = useAppDispatch();
  const transfersData = useAppSelector(selectWalletTransfersData);
  const userData = useAppSelector(selectUserData);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  // Transfers Dispatch
  useEffect(() => {
    if (userData !== null) {
      setLoading(true);
      const id = userData?.id;
      dispatch(
        fetchAsyncTransfers({ userId: id })
      ).then(() => {
        setLoading(false);
        setTimeout(() => {
          dispatch(resetLoading());
        }, 500);
      });
    }
  }, [userData]);

  return (
    <Fragment>
      <Grid container className="mb-5">
        <Grid item xs={12} container>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant={isSmall ? "h6" : "h5"}>
              Transfers
            </Typography>
          </Grid>

        </Grid>

        <Grid container className="spacer__0-5" />

        <Grid item xs={12}>
          {transfersData.length ? (
            <TransfersTable
              data={transfersData}
            />
          ) : !transfersData.length ? (
            <Fragment>
              <Grid container justify="flex-start">
                <Typography variant={isSmall ? "h6" : "h5"}
                  color="primary"
                >
                  No transfers yet
                </Typography>
              </Grid>
            </Fragment>
          ) :
            (
              <Fragment>
                {loading && (
                  <CircularProgress
                    size={24}
                    className="absolute top-1/2 left-1/2 -mt-3 -ml-3"
                  />
                )}
              </Fragment>
            )
          }
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Transfers;
