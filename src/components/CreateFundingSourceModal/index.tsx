import React from "react";
import v from "voca";
import { Formik, Field, FormikProps } from "formik";
import { useSnackbar } from "notistack";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";

import { CreateFundingSourceProps } from "./interfaces";

// import { APP_ENV, } from "../../constants/config";
import { selectDwollaEnv } from "../../redux/selectors/authentication";

import DialogTitle from "../DialogTitle";
import Dwolla from "react-dwolla-iav";
import { useState } from "react";
import { CircularProgress } from "@material-ui/core";
import { useAppSelector } from "../../redux/store";

const CreateFundingSourceModal = (props: CreateFundingSourceProps) => {
  const { open, handleClose, iavToken } = props;
  const { enqueueSnackbar } = useSnackbar();
  const APP_ENV = useAppSelector(selectDwollaEnv);

  const handleCreateCard = () => {
    enqueueSnackbar("Successfully added card", {
      variant: "success",
    });
  };

  const ELEMENTS_OPTIONS = {
    fonts: [
      {
        cssSrc: "https://fonts.googleapis.com/css?family=Roboto",
      },
    ],
  };

  //DWOLLA
  const onSuccess = (data: any) => {
    console.log(data);

    handleClose(true);
    // enqueueSnackbar("Funding source added successfully", {
    //   variant: "success",
    // });
  }
  const onError = (err: any) => {
    console.log(err);
    enqueueSnackbar("There was an error adding your funding source", {
      variant: "default",
    });
  }

  return (
    <Dialog
      open={open || false}
      onClose={() => handleClose()}
      maxWidth="sm"
      fullWidth
      aria-labelledby="form-dialog-title"
      disableEscapeKeyDown

    >
      <DialogTitle onClose={() => handleClose()}>Add a new funding source</DialogTitle>
      <DialogContent>

        {iavToken ?
          <div >
            <Dwolla
              onSuccess={onSuccess}
              onError={onError}
              dwollaConfig={
                {
                  backButton: false,
                  customerToken: iavToken,
                  environment: APP_ENV==="production"?"prod":APP_ENV,
                  fallbackToMicroDeposits: false,
                  microDeposits: false,
                  stylesheets: [],
                  subscriber: (data: any) => {

                  },

                }}

            />
          </div> :
          <Grid container justify="center">

            <CircularProgress
              size={48}
              className="m-3"
            />
          </Grid>
        }
      </DialogContent>
    </Dialog >
  );
};
export default CreateFundingSourceModal;
