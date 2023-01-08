import React, { Fragment } from "react";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { HelpModalProps } from "./interfaces";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "../DialogTitle";
import Popover from "@material-ui/core/Popover";
import Container from "@material-ui/core/Container";
import HelpModalContentTwo from "./HelpModalContentTwo";
import HelpModalContentOne from "./HelpModalContentOne";
import HelpModalContentThree from "./HelpModalContentThree";
import HelpModalContentFour from "./HelpModalContentFour";
import CloseIcon from "@material-ui/icons/Close";

const HelpModal = (props: HelpModalProps) => {
  const { open, handleClose, anchorEl, id } = props;

  const getModalContent = (id: any) => {
    if (id == 1) {
      return <HelpModalContentOne />;
    }
    if (id == 2) {
      return <HelpModalContentTwo close={handleClose} />;
    }
    if (id == 3) {
      return <HelpModalContentThree />;
    }
    // if (id == 4) {
    //   return <HelpModalContentFour />;
    // }

    return <Fragment></Fragment>;
  };

  const getModalTitle = (id: any) => {
    let title: any = "";
    switch (id) {
      case 1:
        title = (
          <Typography color="primary" variant="h5" align="left">
            Create or Match: Two Ways to Play
          </Typography>
        );
        break;
      case 2:
        title = (
          <Typography color="primary" variant="h5" align="left">
            Create vs Match
          </Typography>
        );
        break;
      case 3:
        title = (
          <Typography color="primary" variant="h5" align="left">
            Scoring
          </Typography>
        );
        break;
    }

    return title;
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      scroll="body"
      aria-labelledby="battleground"
    >
      <DialogTitle onClose={handleClose}>{getModalTitle(id)}</DialogTitle>
      <Container style={{ padding: "50px" }} maxWidth="sm">
        {getModalContent(id)}
      </Container>
    </Dialog>
  );
};
export default HelpModal;
