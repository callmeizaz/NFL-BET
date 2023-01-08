import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { ConfirmationDialogProps } from "./interfaces";

const ConfirmationDialog = (props: ConfirmationDialogProps) => {
  const {
    open,
    handleClose,
    handleConfirm,
    titleText,
    descriptionText,
    agreeText,
    disagreeText,
  } = props;
  return (
    <Dialog
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{titleText}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {descriptionText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()} color="primary">
          {disagreeText || "Cancel"}
        </Button>
        <Button
          onClick={() => {
            handleConfirm();
            handleClose();
          }}
          variant="contained"
          color="primary"
        >
          {agreeText || "Proceed"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmationDialog;
