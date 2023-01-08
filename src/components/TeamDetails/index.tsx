import clsx from "classnames";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

import { IProps } from "./interfaces";

const TeamDetails = (props: IProps) => {
  const { name, logoURL } = props;

  return (
    <Grid
      container
      className={clsx("w-full h-full")}
      justify="flex-start"
      alignContent="center"
    >
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar alt={name} src={logoURL} className="rounded-lg" />
          </ListItemAvatar>
          <ListItemText primary={name} />
        </ListItem>
      </List>
    </Grid>
  );
};

export default TeamDetails;
