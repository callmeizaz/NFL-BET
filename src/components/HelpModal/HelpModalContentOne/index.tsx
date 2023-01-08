import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";

const HelpModalContentOne = () => {
  return (
    <Fragment>
      <Typography variant="body1" align="justify">
        All contests on TopProp are head-to-head between two users
      </Typography>
      <Typography variant="body1" align="justify">
        You can create the contests you want to see or match contests created by
        another topprop user.
      </Typography>
      &nbsp;
      <Typography variant="body1" align="justify">
        1. Want to guarantee your contest goes live? Match a contest created by
        another user in the lobby.
      </Typography>
      <Typography variant="body1" align="justify">
        2. Can’t find the match up you want? Create the contest you want to see.
        When another user matches, it’s game on.”
      </Typography>
      &nbsp;
    </Fragment>
  );
};
export default HelpModalContentOne;
