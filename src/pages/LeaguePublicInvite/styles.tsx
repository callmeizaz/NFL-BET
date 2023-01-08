import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardBackgroundMaster: {
      backgroundImage: `url(%PUBLIC_URL%/MastercardBG_12rem.png)`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    },
  })
);

export default useStyles;
