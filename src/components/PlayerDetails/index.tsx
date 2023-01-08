import clsx from "classnames";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

import { IProps } from "./interfaces";

const PlayerDetails = (props: IProps) => {
  const { fullName, photoUrl, position, teamName } = props;

  return (
    <Grid container className={clsx("w-full h-full")}>
      <Grid
        item
        xs={3}
        sm={1}
        md={4}
        lg={3}
        container
        direction="column"
        justify="center"
      >
        <Avatar alt={fullName} src={photoUrl} className="rounded-lg" />
      </Grid>
      <Grid
        item
        xs={9}
        sm={11}
        md={8}
        lg={9}
        container
        direction="column"
        justify="center"
        className="pl-1 min-w-0 overflow-hidden"
      >
        <Typography noWrap variant="subtitle1" className="w-full font-bold">
          {fullName}
        </Typography>
        <Typography variant="caption">{`${position} | ${teamName}`}</Typography>
      </Grid>
    </Grid>
  );
};

export default PlayerDetails;
