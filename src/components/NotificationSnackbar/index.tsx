import React, { Fragment } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

// import style from "./style.module.scss";

import { NotificationSnackbarProps } from "./interfaces";

const NotificationSnackbar = ({
  isVisible,
  message,
  createNotification,
}: NotificationSnackbarProps) => {
  const handleClose = () => {
    createNotification({ isVisible: false, message: "" });
  };

  return (
    <Fragment>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={isVisible}
        autoHideDuration={6000}
        onClose={() => handleClose()}
        message={message}
        action={
          <Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => handleClose()}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Fragment>
        }
      />
    </Fragment>
  );
};

export default NotificationSnackbar;
