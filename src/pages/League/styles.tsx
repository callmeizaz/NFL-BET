import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ctaText: {
        fontSize: "20px",
        fontWeight: 400,
        lineHeight: "30px",
        textAlign: "center",
        fontFamily: "Alegreya Sans SC",
        color: "#000000"
    },
    pageHeight: {
        height: "80vh"
    },
    cardBackgroundMaster: {
        backgroundImage: `url(%PUBLIC_URL%/MastercardBG_12rem.png)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    },
    cardTextColor: {
        color: '#fff',
    },
    buttonRadius: {
      borderRadius: 36,
    },
  })
);

export default useStyles;
