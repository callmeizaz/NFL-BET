import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";

const drawerWidth = 400;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ctaText: {
      fontSize: "20px",
      fontWeight: 400,
      lineHeight: "30px",
      textAlign: "center",
      fontFamily: "Alegreya Sans SC",
      color: "#000000",
    },
    pageHeight: {
      height: "80vh",
    },
    cardBackgroundMaster: {
      backgroundImage: `url(%PUBLIC_URL%/MastercardBG_12rem.png)`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    },
    cardTextColor: {
      color: "#fff",
    },
    buttonRadius: {
      borderRadius: 36,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    drawerPaper: {
      width: drawerWidth,
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
  })
);

export default useStyles;
