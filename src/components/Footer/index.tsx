import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import TPLogo from "../../icons/logo/TopProp_Full_Logo.png";
import routes from "../../constants/routes";

const Footer = ({ hideBorder }: { hideBorder?: boolean }) => {
  return (
    <Grid
      item
      container
      justify="space-between"
      alignContent="center"
      className={clsx(
        "h-22 sm:16 md:h-12 mt-auto p-1 mb-16 md:mb-0",
        hideBorder ? "" : "border-2"
      )}
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={4}
        lg={6}
        container
        className="justify-center md:justify-start"
      >
        <img src={TPLogo} alt="TopProp" className="h-10" />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={8}
        lg={6}
        container
        className="justify-center md:justify-end"
      >
        <Grid item className="px-2 mt-2">
          <a href="https://www.toppropsports.com/faq" target="_blank">
            <Typography variant="body1" align="right" className="text-gray-400">
              FAQ
            </Typography>
          </a>
        </Grid>
        <Grid item className="px-2 mt-2">
          <Link to={routes.public.privacyPolicy}>
            <Typography variant="body1" align="right" className="text-gray-400">
              Privacy Policy
            </Typography>
          </Link>
        </Grid>
        <Grid item className="px-2 mt-2">
          <Link to={routes.public.termsOfService}>
            <Typography variant="body1" align="right" className="text-gray-400">
              Terms of Service
            </Typography>
          </Link>
        </Grid>
        <Grid item className="px-2 mt-2">
          <Link to={routes.public.responsibleGaming}>
            <Typography variant="body1" align="right" className="text-gray-400">
              Responsible Gambling
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Footer;
