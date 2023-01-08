import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flexContainer: {
      display: "flex",
      flexWrap: "wrap",
      maxWidth: "300px",
      [theme.breakpoints.down("xs")]: {
        margin: "0 auto",
      },
    },
    cardBackgroundActive: {
      backgroundColor: theme.palette.primary.light,
    },
    cardBackgroundInactive: {
      backgroundColor: grey[300],
    },
    cardBackgroundVisa: {
      backgroundImage: `url(${"/VisaBG_16rem.png"})`,
      flexGrow: 1,
      flexShrink: 1,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    },
    cardBackgroundMaster: {
      backgroundImage: `url(${"/MastercardBG_12rem.png"})`,
      flexGrow: 1,
      flexShrink: 1,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    },
    bankBackground: {
      backgroundImage: `url(${"/bank-bg.png"})`,
      flexGrow: 1,
      flexShrink: 1,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    },
    logoColor: {
      fill: "#fff",
    },
    cardRadius: {
      borderRadius: 36,
    },
    radioSelection: {
      "&$checked": {
        color: "#fff",
      },
    },
    cardTextColor: {
      color: "#fff",
      cursor: "pointer",
    },
  })
);

export default useStyles;
