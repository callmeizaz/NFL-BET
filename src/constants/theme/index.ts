import {
  createMuiTheme,
  ThemeOptions,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";

const defaultTheme = createMuiTheme();
// const breakpoints = createBreakpoints({});

const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

const breakpoints = createBreakpoints({
  keys: ["xs", "sm", "md", "lg", "xl"],
  values: { ...BREAKPOINTS },
});

const theme: ThemeOptions = {
  palette: {
    type: "light",
    primary: {
      light: "#e9decc",
      main: "#B69056",
      contrastText: "#fff",
    },
    secondary: {
      main: "#164D34",
    },
  },
  typography: {
    fontFamily: ["Alegreya Sans SC", "Ariel"].join(","),
  },
  overrides: {
    MuiSelect: {
      root: {
        fontFamily: ["Alegreya Sans SC", "Ariel"].join(","),
        paddingLeft: "1rem",
        "&$disabled": {
          borderColor: "white",
          background: "#f2f2f2",
        },
        fontSize: "1.5rem",
      },
    },
    MuiInputBase: {
      root: {
        fontFamily: ["Roboto", "Alegreya Sans SC", "Ariel"].join(","),
        "&$disabled": {
          borderColor: "white",
          background: "#f2f2f2",
        },
        fontSize: "0.9rem",
      },
    },
    MuiTabs: {
      flexContainer: {
        [breakpoints.up("lg")]: {
          borderBottom: "1px solid #9e9e9e",
        },
      },
    },
    MuiTab: {
      root: {
        "&$selected": {
          fontWeight: 700,
        },
        maxWidth: "400px",
        overflow: "visible",
      },
      wrapper: {
        textTransform: "capitalize",
        [breakpoints.up("lg")]: {
          fontSize: defaultTheme.typography.h6.fontSize,
        },
        [breakpoints.down("md")]: {
          fontSize: defaultTheme.typography.body1.fontSize,
        },
      },
    },
    MuiInputLabel: {
      shrink: {
        transform: "translate(0,1.5px) scale(0.9)",
      },
    },
    MuiDialogTitle: {
      root: {
        [breakpoints.up("lg")]: {
          paddingRight: defaultTheme.spacing(4),
          paddingLeft: defaultTheme.spacing(4),
          paddingBottom: defaultTheme.spacing(0),
          paddingTop: defaultTheme.spacing(2),
        },
        [breakpoints.down("sm")]: {
          paddingRight: defaultTheme.spacing(2),
          paddingLeft: defaultTheme.spacing(2),
          paddingBottom: defaultTheme.spacing(1),
          paddingTop: defaultTheme.spacing(1),
        },
      },
    },
    MuiDialogContent: {
      root: {
        [breakpoints.up("lg")]: {
          paddingRight: defaultTheme.spacing(4),
          paddingLeft: defaultTheme.spacing(4),
          paddingBottom: defaultTheme.spacing(1),
          paddingTop: defaultTheme.spacing(2),
        },
        [breakpoints.down("sm")]: {
          paddingRight: defaultTheme.spacing(2),
          paddingLeft: defaultTheme.spacing(2),
          paddingBottom: defaultTheme.spacing(1),
          paddingTop: defaultTheme.spacing(1),
        },
      },
    },
    MuiDialogActions: {
      root: {
        [breakpoints.up("lg")]: {
          paddingRight: defaultTheme.spacing(4),
          paddingLeft: defaultTheme.spacing(4),
          paddingBottom: defaultTheme.spacing(3),
          paddingTop: defaultTheme.spacing(2),
        },
        [breakpoints.down("sm")]: {
          paddingRight: defaultTheme.spacing(2),
          paddingLeft: defaultTheme.spacing(2),
          paddingBottom: defaultTheme.spacing(3),
          paddingTop: defaultTheme.spacing(1),
        },
      },
    },
    MuiButtonBase: {
      root: {
        outline: "none!important",
      },
    },
    MuiButton: {
      contained: {
        color: "#ffffff!important",
        fontWeight: 700,
      },
    },
    MuiTooltip: {
      tooltip: {
        fontSize: "0.85rem",
      },
    },
    MuiRadio: {
      root: {
        color: "white",
      },
      colorSecondary: {
        "&$checked": {
          color: "white",
        },
      },
    },
  },
};

let muiTheme = createMuiTheme({ ...theme, breakpoints });

muiTheme = responsiveFontSizes(muiTheme);

export default muiTheme;
