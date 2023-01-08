import clsx from "classnames";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { IProps } from "./interfaces";

const RosterDetailsDesktop = (props: IProps) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("xs"));
  const { players } = props;

  return (
    <Grid
      container
      justify={isSmall ? "center" : "flex-start"}
      alignContent="center"
      className={clsx("w-full h-full")}
    >
      {players?.map((player, index) => (
        <Typography className="text-xs">
          {player.player.fullName}
          {index !== players?.length - 1 ? "," : ""}
        </Typography>
      ))}
    </Grid>
  );
};

export default RosterDetailsDesktop;
