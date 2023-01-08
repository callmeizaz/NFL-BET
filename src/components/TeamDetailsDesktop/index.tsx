import clsx from "classnames";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import RosterDetailsDesktop from "../RosterDetailsDesktop";

import { IProps } from "./interfaces";

const TeamDetailsDesktop = (props: IProps) => {
  const { ownerName, photoUrl, teamName, players } = props;

  return (
    <Grid container className={clsx("w-full h-full")}>
      <Grid
        item
        xs={3}
        sm={1}
        md={4}
        lg={3}
        xl={2}
        container
        direction="column"
        justify="center"
      >
        <Avatar alt={teamName} src={photoUrl} className="rounded-lg" />
      </Grid>
      <Grid
        item
        xs={9}
        sm={11}
        md={8}
        lg={9}
        xl={10}
        container
        direction="column"
        justify="center"
        className="pl-3 min-w-0 overflow-hidden"
      >
        <Typography noWrap variant="subtitle1" className="w-full font-bold">
          {teamName}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {ownerName}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <RosterDetailsDesktop players={players} />
      </Grid>
    </Grid>
  );
};

export default TeamDetailsDesktop;
