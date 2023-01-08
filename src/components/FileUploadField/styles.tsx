import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    fileName: {
      fontFamily: "Roboto",
    },
  });
});

export default useStyles;
