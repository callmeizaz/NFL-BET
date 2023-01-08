import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    svgMenuIcon: {
      transform: "scale(1.2)",
    },
    btn: {
      "&:active": {
        outline: "none !important",
      },
    },
    btn__wrapper: {
      paddingTop: "2rem",
      paddingBottom: "1rem",
      borderRadius: "8px",
      "&&:hover": {
        backgroundColor: "#EFEFEF",
      },
    },
  })
);

export default useStyles;
