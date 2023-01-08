import React, { Fragment } from "react";

import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "../DialogTitle";
import RosterTable from "../LeagueInfoTable/RosterTable";

import { RosterModalProps } from "./interfaces";

const SupportModal = (props: RosterModalProps) => {
  const { open, handleClose, currentTeam } = props;

  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      fullWidth
      maxWidth="sm"
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle onClose={() => handleClose(false)}>
        Team Roster for {currentTeam?.name}
      </DialogTitle>
      <Fragment>
        <DialogContent>
          <Grid container className="pb-8">
            <RosterTable currentTeam={currentTeam}/>
          </Grid>
        </DialogContent>
      </Fragment>
    </Dialog>
  );
};
export default SupportModal;
