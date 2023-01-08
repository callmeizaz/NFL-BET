import clsx from "classnames";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

import { IProps } from "./interfaces";

const RosterDetails = (props: IProps) => {
  const { fullName, photoUrl } = props;

  return (
    <Grid container className={clsx("w-full h-full")}>
      <List dense disablePadding>
        <ListItem dense disableGutters>
          <ListItemAvatar>
            <Avatar alt={fullName} src={photoUrl} className="rounded-lg" />
          </ListItemAvatar>
          <ListItemText primary={fullName} />
        </ListItem>
      </List>
      
    </Grid>
  );
};

export default RosterDetails;
