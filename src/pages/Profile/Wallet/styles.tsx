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
    cardBackgroundVisa: {
      backgroundImage: `url(%PUBLIC_URL%/VisaBG_16rem.png)`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
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
    banner: {
      backgroundColor: theme.palette.primary.main,
    }
  })
);

export default useStyles;
