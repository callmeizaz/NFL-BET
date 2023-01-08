import React from "react";
import clsx from "clsx";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";

import { TabPanelProps } from "./interfaces";

const TabPanel = (props: TabPanelProps) => {
  const theme = useTheme();
  const { children, value, index, ...other } = props;
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      className="w-full"
      {...other}
    >
      {value === index && (
        <Box className={clsx("w-full", "pt-3", isSmall ? "pb-20" : "pb-8")}>
          {children}
        </Box>
      )}
    </div>
  );
};
export default TabPanel;

const a11yConfig = (index: number) => {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
};

export { a11yConfig };
