import React, { useState, useRef, Fragment, useEffect } from "react";
import { useHistory, matchPath } from "react-router-dom";
import v from "voca";
// import { CometChat } from "@cometchat-pro/chat";
import { Link as RouterLink } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Hidden from "@material-ui/core/Hidden";
import Popover from "@material-ui/core/Popover";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import KeyboardArrowDownOutlinedIcon from "@material-ui/icons/KeyboardArrowDownOutlined";

import NavbarItems from "../NavbarItems";
import SupportModal from "../SupportModal";

import { ReactComponent as TrophyOutlineIcon } from "../../icons/trophy-outline.svg";
import { ReactComponent as TrophyContainedIcon } from "../../icons/trophy-contained.svg";
// import { ReactComponent as GroupOutlineIcon } from "../../icons/group-outline.svg";
// import { ReactComponent as GroupContainedIcon } from "../../icons/group-contained.svg";
import { ReactComponent as BattlegroundOutlineIcon } from "../../icons/battleground-outline.svg";
import { ReactComponent as BattlegroundContainedIcon } from "../../icons/battleground-contained.svg";
import TPLogo from "../../icons/logo/TopProp_Full_Logo.png";

import routes from "../../constants/routes";

import { useTheme } from "@material-ui/core/styles";
import useStyles from "./styles";

import { SideBarProps } from "./interfaces";

import { useAppSelector, AppDispatch, useAppDispatch } from "../../redux/store";

import { logout } from "../../redux/reducers/authenticationSlice";
import { setCometUser } from "../../redux/reducers/cometAuthSlice";
import { fetchAsyncUserInfo } from "../../redux/thunks/users";
import { selectUserInfoData } from "../../redux/selectors/users";

import { selectWalletFundsData } from "../../redux/selectors/wallet";
import {
  selectUserData,
  selectConfig,
} from "../../redux/selectors/authentication";
import { selectMobileOpen } from "../../redux/selectors/miscallaneous";
import { toggleSidebar } from "../../redux/reducers/miscellaneousSlice";

import { renderCurrency } from "../../helpers/currency";
import { fetchAsyncWalletFunds } from "../../redux/thunks/wallet";

const navbarItems = [
  {
    label: "League",
    path: routes.dashboard.league.home,
    activePaths: [routes.dashboard.league.home, routes.dashboard.league.manage],
    icons: [TrophyOutlineIcon, TrophyContainedIcon],
  },
  {
    label: "Battleground",
    path: routes.dashboard.home,
    activePaths: [routes.dashboard.home],
    icons: [BattlegroundContainedIcon, BattlegroundOutlineIcon],
  },
];

export default function ResponsiveDrawer(props: SideBarProps) {
  const dispatch: AppDispatch = useAppDispatch();
  const history = useHistory();

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  const userInfoData = useAppSelector(selectUserInfoData);

  const fundsData = useAppSelector(selectWalletFundsData);
  const userData = useAppSelector(selectUserData);
  const config = useAppSelector(selectConfig);

  const { window } = props;
  const buttonRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const classes = useStyles();
  // const [mobileOpen, setMobileOpen] = useState(false);
  const mobileOpen = useAppSelector(selectMobileOpen);
  const [supportDialogOpen, setSupportDialogOpen] = useState(false);

  useEffect(() => {
    if (userData) {
      dispatch(fetchAsyncWalletFunds({ userId: userData?.id }));
    }
  }, [userData]);

  const handleDrawerToggle = () => {
    dispatch(toggleSidebar());
    // setMobileOpen(!mobileOpen);
  };

  const handleClick = () => {
    setAnchorEl(buttonRef.current);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.setItem('fundPopState','notShown');
    dispatch(setCometUser(null));
    // CometChat.logout().then(
    //   () => {
    //     console.log("Logout completed successfully");
    //   },
    //   (error) => {
    //     //Logout failed with exception
    //     console.log("Logout failed with exception:", { error });
    //   }
    // );
  };

  const handleSupportClick = () => {
    handleClose();
    setSupportDialogOpen(true);
  };

  const handleLinkClick = (link: string) => {
    handleClose();
    if (mobileOpen) dispatch(toggleSidebar());
    // setMobileOpen(false);
    history.push(link);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    if (userData !== null) {
      dispatch(fetchAsyncUserInfo({ userId: userData?.id }));
    }
  }, [dispatch, fetchAsyncUserInfo, userData]);

  const drawer = (
    <Fragment>
      <div className={classes.toolbar}>
        <Grid container justify="center" className="h-full">
          <ButtonBase component={RouterLink} to="/">
            <img src={TPLogo} alt="TopProp" className={classes.logo} />
          </ButtonBase>
        </Grid>
      </div>
      <Grid
        className="flex-1"
        container
        direction="column"
        justify="space-between"
      >
        <Grid item />
        <Grid item container direction="column" className="px-2">
          {navbarItems.map((items) => {
            return (
              <NavbarItems
                key={items.path}
                label={items.label}
                path={items.path}
                icons={items.icons}
                handleLinkClick={handleLinkClick}
                activePaths={items.activePaths}
              />
            );
          })}
        </Grid>
        <Grid item>
          <Hidden mdDown implementation="css">
            <Grid
              container
              direction="column"
              alignContent="center"
              className="px-2 pb-4"
            >
              {config?.paidContests ? (
                <Fragment>
                  <Typography
                    align="center"
                    variant="subtitle2"
                    className="text-gray-600"
                  >
                    Available Balance
                  </Typography>
                  <Typography
                    align="center"
                    variant="h5"
                    color="secondary"
                    className="font-bold"
                  >
                    {renderCurrency(fundsData ? fundsData / 100 : 0)}
                  </Typography>
                  <Grid item className="w-full pt-1">
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      fullWidth
                      component={RouterLink}
                      to={routes.profile.home}
                    >
                      Deposit
                    </Button>
                  </Grid>
                </Fragment>
              ) : (
                ""
              )}
            </Grid>
          </Hidden>
          <ButtonBase
            disableRipple
            className="w-full"
            onClick={handleClick}
            ref={buttonRef}
          >
            <Grid
              container
              justify="center"
              alignContent="center"
              className="mb-4"
            >
              <div className="mt-1 mr-2">
                <AccountCircleOutlinedIcon />
              </div>

              <Typography variant="h6">
                {userInfoData ? v.prune(userInfoData.fullName, 10) : ""}
              </Typography>
              <div className="mt-1 ml-2">
                <KeyboardArrowDownOutlinedIcon />
              </div>
            </Grid>
          </ButtonBase>
        </Grid>
      </Grid>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Grid
          container
          direction="column"
          alignContent="center"
          className="p-4"
        >
          <Grid item container justify="center" className="pb-4">
            <Avatar color="primary">
              {userInfoData ? v.first(userInfoData.fullName) : ""}
            </Avatar>
          </Grid>
          <Typography align="center">
            {userInfoData ? userInfoData.fullName : ""}
          </Typography>
          {config?.paidContests ? (
            <Typography align="center">
              Available Funds: {renderCurrency(fundsData ? fundsData / 100 : 0)}
            </Typography>
          ) : (
            ""
          )}

          <Divider className="my-4" />
          <Grid item container spacing={2}>
            {config?.paidContests ? (
              <Grid item xs={12}>
                <Button
                  onClick={() => {
                    handleLinkClick(routes.profile.home);
                  }}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Profile
                </Button>
              </Grid>
            ) : (
              ""
            )}
            <Grid item xs={6}>
              <Button
                onClick={() => {
                  handleSupportClick();
                }}
                disabled={userInfoData === null}
                variant="outlined"
                color="primary"
                fullWidth
              >
                Support
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={() => {
                  handleLogout();
                }}
                variant="outlined"
                color="primary"
                fullWidth
              >
                Logout
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Popover>
    </Fragment>
  );

  const match = matchPath(location.pathname, routes.dashboard.league.manage);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  // isSmall && !match
  return (
    <div className={classes.root}>
      <CssBaseline />
      {isSmall && !match ? (
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className="bg-gray-50">
            <Grid container>
              <IconButton
                color="primary"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className="self-start"
              >
                <MenuIcon />
              </IconButton>

              <img src={TPLogo} alt="TopProp" className={classes.logo} />
            </Grid>
          </Toolbar>
        </AppBar>
      ) : null}

      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden lgUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden mdDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <SupportModal
        open={supportDialogOpen}
        handleClose={setSupportDialogOpen}
      />
    </div>
  );
}
