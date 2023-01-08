import { useRouteMatch } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

import { NavbarItemsProps } from "./interfaces";

import useStyles from "./styles";

const NavbarItems = ({
  label,
  path,
  icons,
  handleLinkClick,
  activePaths,
}: NavbarItemsProps) => {
  const classes = useStyles();
  const isActive = useRouteMatch({
    path: activePaths,
    strict: true,
    exact: true,
  });
  
  const [NavbarOutlineIcon, NavbarContainedIcon] = icons;
  return (
    
      <ButtonBase
        onClick={() => {
          handleLinkClick(path);
        }}
        disableRipple
        className={classes.btn__wrapper}
      >
        <Grid
          item
          container
          direction="column"
          justify="center"
          alignContent="center"
        >
          <Grid item container justify="center">
            {isActive ? (
              <NavbarOutlineIcon className={classes.svgMenuIcon} />
            ) : (
              <NavbarContainedIcon className={classes.svgMenuIcon} />
            )}
          </Grid>
          <Grid item container justify="center">
            <Typography
              variant="h6"
              color={isActive ? "primary" : "initial"}
              gutterBottom
            >
              {label}
            </Typography>
          </Grid>
        </Grid>
      </ButtonBase>
  );
};

export default NavbarItems;
