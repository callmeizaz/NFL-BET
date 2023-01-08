import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // flexContainer: {
    //   display: "flex",
    //   flexWrap: "wrap",
    //   maxWidth: "300px",
    //   [theme.breakpoints.down('xs')]: {
    //     margin: "0 auto",
    //   },
    // },
    cardBackground: {
      backgroundColor: theme.palette.primary.light,
    },
    centerAlign: {
      [theme.breakpoints.down('xs')]: {
        margin: "0 auto",
      },
    },
    cardBackgroundVisa: {
      backgroundImage: `url(${"/VisaBG_16rem.png"})`,
      flexGrow: 1,
      flexShrink: 1,
      alignItems: "center",
      height: "100%",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    },
    cardBackgroundMaster: {
      backgroundImage: `url(${"/MastercardBG_12rem.png"})`,
      flexGrow: 1,
      flexShrink: 1,
      alignItems: "center",
      height: "100%",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    },
    cardTextColor: {
      color: '#fff',
    },
    logoColor: {
      fill: '#fff',
    },
    cardRadius: {
      borderRadius: 36,
    }
  })
);

export default useStyles;
