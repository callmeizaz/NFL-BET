import React, { Fragment } from "react";
import { Formik, Field, FormikProps } from "formik";
import { useSnackbar } from "notistack";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import { AppDispatch, useAppDispatch, useAppSelector } from "../../redux/store";

import { TextField } from "formik-material-ui";

import DialogTitle from "../DialogTitle";

import createSupportTicket from "../../constants/schemas/createSupportTicket";

import {
  SupportModalProps,
  SupportForm,
  SupportTicketPaylod,
} from "./interfaces";

import { doAsyncCreateSupportTicket } from "../../redux/thunks/support";
import { selectUserInfoData } from "../../redux/selectors/users";

import useStyles from "./styles";

const SupportModal = (props: SupportModalProps) => {
  const classes = useStyles();
  const { open, handleClose } = props;
  const dispatch: AppDispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const CHARACTER_LIMIT = 620;

  const userInfoData = useAppSelector(selectUserInfoData);

  const submitSupportTicket = (payload: SupportTicketPaylod) => {
    dispatch(doAsyncCreateSupportTicket(payload)).then((response) => {
      if (response.type == "support/ticket/fulfilled") {
        handleClose(false);
        enqueueSnackbar("Successfully added support ticket", {
          variant: "success",
        });
      } else {
        return;
      }
    });
  };

  return (
    <Formik
      initialValues={{
        email: userInfoData?.email,
        name: userInfoData?.fullName,
        message: "",
      }}
      enableReinitialize
      validationSchema={createSupportTicket}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          setSubmitting(false);
        }, 3000);
        const payload = {
          message: values.message,
          userId: userInfoData.id,
        };
        submitSupportTicket(payload);
        resetForm();
      }}
    >
      {({ handleSubmit, values }: FormikProps<SupportForm>) => {
        return (
          <form>
            <Dialog
              open={open}
              onClose={() => handleClose(false)}
              fullWidth
              maxWidth="sm"
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle onClose={() => handleClose(false)}>
                Raise a support ticket
              </DialogTitle>
              <Fragment>
                <DialogContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Field
                        component={TextField}
                        size="small"
                        label="name"
                        variant="outlined"
                        name="name"
                        disabled
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        component={TextField}
                        size="small"
                        label="email"
                        variant="outlined"
                        name="email"
                        disabled
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        component={TextField}
                        size="small"
                        label="message"
                        variant="outlined"
                        multiline
                        rows={8}
                        name="message"
                        inputProps={{
                          maxlength: CHARACTER_LIMIT,
                        }}
                        helperText={`Character limit ${values.message.length}/${CHARACTER_LIMIT}`}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Grid container justify="flex-end">
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={6}
                      lg={4}
                      container
                      justify="center"
                    >
                      <Button
                        onClick={() => {
                          handleSubmit();
                        }}
                        className="text-white"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disableElevation
                      >
                        Send
                      </Button>
                    </Grid>
                  </Grid>
                </DialogActions>
              </Fragment>
            </Dialog>
          </form>
        );
      }}
    </Formik>
  );
};
export default SupportModal;
