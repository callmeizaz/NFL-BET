import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { Button, Grid } from "@material-ui/core";
import { useHistory } from "react-router";
import routes from "../../../constants/routes";

const HelpModalContentTwo = ({ close }: any) => {
  const history = useHistory();
  const redirect = () => {
    close();
    history.push(routes.dashboard.home);
  };

  return (
    <Fragment>
      <Typography variant="h6" align="left">
        Create
      </Typography>
      <Typography variant="body1" align="left">
        1. Select a Player
      </Typography>
      <Typography variant="body1" align="left">
        2. Select an Opponent
      </Typography>
      <Typography variant="body1" align="left">
        3. Set the Entry Fee
      </Typography>
      <Typography variant="body1" align="justify">
        4. Check the Bonus Points{" "}
        <Tooltip enterTouchDelay={0}
          title="'Bonus Points' are added to the score of the contest
        underdog. For example, if Saquon is getting 2 Bonus Points vs CMC, CMC
        will have to outscore Saquon by at least 2 fantasy points to win."
        >
          <InfoOutlinedIcon fontSize="small" />
        </Tooltip>
      </Typography>
      <Typography variant="body1" align="left">
        5. Create the Contest - it's Game On as soon as another user matches.
      </Typography>
      &nbsp;
      <Typography variant="h6" align="left">
        Match
      </Typography>
      <Typography variant="body1" align="left">
        1. Click on any open contest in the Lobby
      </Typography>
      <Typography variant="body1" align="left">
        2. Confirm your Player and your Opponent
      </Typography>
      <Typography variant="body1" align="left">
        3. Check the Bonus Points{" "}
        <Tooltip enterTouchDelay={0}
          title="'Bonus Points' are added to the
          score of the contest underdog. For example, if Saquon is getting 2 Bonus
          Points vs CMC, CMC will have to outscore Saquon by at least 2 fantasy
          points to win."
        >
          <InfoOutlinedIcon fontSize="small" />
        </Tooltip>
      </Typography>
      <Typography variant="body1" align="justify">
        4. Match the Contest and it's Game On.
      </Typography>
      <Grid container className="mt-3">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className="text-white"
            onClick={() => redirect()}
          >
            Start Playing
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};
export default HelpModalContentTwo;
