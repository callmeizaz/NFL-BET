import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";

import CloseIcon from "@material-ui/icons/Close";

import useStyles from "./styles";

import { Props } from "./interfaces";

const DialogTitle = (props: Props) => {
  const { children, onClose } = props;
  const classes = useStyles();
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Grid item container alignContent="center">
        <Typography variant="h5" className={classes.typography}>{children}</Typography>
      </Grid>

      {onClose ? (
        <IconButton onClick={() => onClose(false)} className="p-2">
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};
export default DialogTitle;
