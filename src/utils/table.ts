import clsx from "clsx";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    contestWrapper: {
      "&:hover": {
        "& $contestCell": {
          borderTopWidth: "2px!important",
          borderColor: `${theme.palette.primary.main}!important`,
        },
        "& $vsCell": {
          borderTopWidth: "0!important",
          fontWeight: "bold",
        },
      },
    },
    contestCell: {
      borderTopColor: `#ededed!important`,
      borderLeftColor: `#ededed!important`,
      height: "100%",
    },
    vsCell: {
      color: theme.palette.secondary.main,
      textAlign: "center",
    },
    cardBottom: {},
    cardRight: {},
    cardLeft: {},
    header: {
      backgroundColor: "#fafafa",
      zIndex: 100,
    },
    headerTransparent: {
      zIndex: 100,
    },
  })
);

const useMobileStyles = makeStyles((theme: Theme) =>
  createStyles({
    contestWrapper: {},
    contestCell: {
      height: "100%",
    },
    cardBottom: {},
    cardRight: {},
    cardLeft: {},
  })
);

const cardConfig = (index: number, classes: any, position: string): string => {
  let roundClass = "";
  switch (position) {
    case "left":
      roundClass = clsx(
        "rounded-l-lg rounded-r-none",
        "px-2 py-2",
        "border-b-2 border-t-2 border-l-2 border-gray-300",
        "bg-white",
        classes.cardRight
      );
      break;
    case "middle":
      roundClass = clsx(
        "rounded-l-none rounded-r-none",
        "px-2 py-2",
        "border-b-2 border-t-2 border-gray-300",
        "bg-white",
        classes.cardBottom
      );
      break;
    case "right":
      roundClass = clsx(
        "rounded-l-none rounded-r-lg",
        "px-2 py-2",
        "border-b-2 border-t-2 border-r-2 border-gray-300",
        "bg-white",
        classes.cardRight
      );
      break;
    case "single":
      roundClass = clsx(
        "rounded-l-lg rounded-r-lg",
        "px-2 py-2",
        "border-b-2 border-t-2 border-r-2 border-l-2 border-gray-300",
        "bg-white",
        classes.cardRight
      );
      break;
    case "none":
      roundClass = clsx("bg-transparent", "px-4 py-2", classes.vsCell);
      break;
    case "middleLeague":
      roundClass = clsx(
        "rounded-l-none rounded-r-none",
        "px-2 py-2",
        "border-b-2  border-gray-300",
        "bg-white",
        classes.cardBottom
      );
      break;
  }
  // switch (index) {
  //   case 0:
  //     roundClass = clsx(
  //       "rounded-l-lg rounded-r-none",
  //       "px-2 py-2",
  //       "border-b-2 border-t-2 border-l-2 border-gray-300",
  //       classes.cardRight
  //     );
  //     break;
  //   case 1:
  //     roundClass = clsx(
  //       "rounded-l-none rounded-r-none",
  //       "px-2 py-2",
  //       "border-b-2 border-t-2 border-gray-300",
  //       classes.cardBottom
  //     );
  //     break;
  //   case 2:
  //     roundClass = clsx(
  //       "rounded-l-none rounded-r-none",
  //       "px-2 py-2",
  //       "border-b-2 border-t-2  border-gray-300",
  //       classes.cardBottom
  //     );
  //     break;
  //   case 3:
  //     roundClass = clsx(
  //       "rounded-l-none rounded-r-none",
  //       "px-2 py-2",
  //       "border-b-2 border-t-2 border-gray-300",
  //       classes.cardBottom
  //     );
  //     break;
  //   case 4:
  //     roundClass = clsx(
  //       "rounded-l-none rounded-r-none",
  //       "px-2 py-2",
  //       "border-b-2 border-t-2 border-gray-300",
  //       classes.cardBottom
  //     );
  //     break;
  //   case 5:
  //     roundClass = clsx(
  //       "rounded-l-none rounded-r-lg",
  //       "px-2 py-2",
  //       "border-b-2 border-t-2 border-r-2 border-gray-300",
  //       classes.cardRight
  //     );
  //     break;
  //   case 6:
  //     roundClass = clsx("bg-transparent", "px-4 py-2", classes.vsCell);
  //     break;
  //   case 7:
  //     roundClass = clsx(
  //       "rounded-l-lg rounded-r-none",
  //       "px-2 py-2",
  //       "border-b-2 border-t-2 border-l-2 border-gray-300",
  //       classes.cardLeft
  //     );
  //     break;
  //   case 8:
  //     roundClass = clsx(
  //       "rounded-l-none rounded-r-none",
  //       "px-2 py-2",
  //       "border-b-2 border-t-2 border-gray-300",
  //       classes.cardBottom
  //     );
  //     break;
  //   case 9:
  //     roundClass = clsx(
  //       "rounded-l-none rounded-r-lg",
  //       "px-2 py-2",
  //       "border-b-2 border-t-2 border-r-2 border-gray-300",
  //       classes.cardRight
  //     );
  //     break;
  // }
  return roundClass;
};

const textAlignment = (alignment: string) => {
  let alignmentClass = "text-left";
  switch (alignment) {
    case "center":
      alignmentClass = clsx("text-center");
      break;
    case "right":
      alignmentClass = clsx("text-right");
      break;
    case "justify":
      alignmentClass = clsx("text-justify");
      break;
    default:
      alignmentClass = clsx("text-left");
      break;
  }
  return alignmentClass;
};

export { cardConfig, textAlignment, useStyles, useMobileStyles };
