// @ts-nocheck

import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";

import TPLogo from "../../icons/logo/TopProp_Full_Logo.png";

const ResponsibleGaming = () => {
  let history = useHistory();

  return (
    <Fragment>
      <Helmet>
        <title>TopProp | Responsible Gaming</title>
      </Helmet>
      <Grid className="h-screen px-8 md:px-16 pt-8" container>
        <Grid item xs={12} container justify="center">
          <img src={TPLogo} alt="TopProp" className="h-16 md:h-24" />
        </Grid>
        <div className="pb-24">
          <font color="#000000">
            <font face="Times New Roman, serif">
              <b>RESPONSIBLE GAMING</b>
            </font>
          </font>
          <p />
          <p style={{ marginBottom: "0.28cm", lineHeight: "100%" }}>
            <font color="#000000">
              <font face="Times New Roman, serif">
                TopProp is committed to Responsible Gaming – we believe that
                fantasy sports are all about having fun and playing responsibly
                is critical to that goal. Our number one priority is making sure
                that you are playing safely and responsibly, and we offer tools
                to help you achieve those goals.
              </font>
            </font>
          </p>
          <p style={{ marginBottom: "0.28cm", lineHeight: "100%" }}>
            <font color="#000000">
              <font face="Times New Roman, serif">
                <b>Self-Exclusion</b>
              </font>
            </font>
          </p>
          <p style={{ marginBottom: "0.28cm", lineHeight: "100%" }}>
            <font color="#000000">
              <font face="Times New Roman, serif">
                If you would like to self-exclude from TopProp, please contact
                customer support by emailing{" "}
              </font>
            </font>
            <a href="mailto:support@toppropfantasy.com">
              <font color="#0563c1">
                <font face="Times New Roman, serif">
                  <u>support@toppropfantasy.com</u>
                </font>
              </font>
            </a>
            <font color="#000000">
              <font face="Times New Roman, serif">.</font>
            </font>
          </p>
          <p style={{ marginBottom: "0.28cm", lineHeight: "100%" }}>
            <font color="#000000">
              <font face="Times New Roman, serif">
                <b>Third Party Exclusion Requests</b>
              </font>
            </font>
          </p>
          <p style={{ marginBottom: "0.28cm", lineHeight: "100%" }}>
            <font color="#000000">
              <font face="Times New Roman, serif">
                If a qualified third party has concerns about a TopProp user’s
                compulsive play, such qualified third party can submit a request
                to TopProp for exclusion of that user at
                support@toppropfantasy.com. “Qualified third parties” shall
                mean, for the purposes of the previous sentence, third parties
                who provide proof that (i) they are jointly obligated on the
                bank account, credit or debit card associated with the TopProp
                user’s account, (ii) the TopProp user is legally dependent on
                the requestor under state or federal law, (iii) they are wholly
                or partially obligated for the debts of the TopProp user
                pursuant to a court order; or (iv) the TopProp user is subject
                to a court order requiring him or her to pay unmet child support
                obligations.
              </font>
            </font>
          </p>
          <p style={{ marginBottom: "0.28cm", lineHeight: "100%" }}>
            <font color="#000000">
              <font face="Times New Roman, serif">
                <b>Compulsive Play</b>
              </font>
            </font>
          </p>
          <p style={{ marginBottom: "0.28cm", lineHeight: "100%" }}>
            <font color="#000000">
              <font face="Times New Roman, serif">
                Compulsive play does not discriminate – any person can be
                susceptible to compulsive play regardless of age, race, gender
                or financial status. Compulsive play is treatable if detected.
                Warning signs for compulsive play may include:
              </font>
            </font>
          </p>
          <ul>
            <li>
              <p style={{ marginBottom: "0cm", lineHeight: "100%" }}>
                <font color="#000000">
                  <font face="Times New Roman, serif">
                    Exaggerating wins and downplaying losses.&nbsp;
                  </font>
                </font>
              </p>
            </li>
            <li>
              <p style={{ marginBottom: "0cm", lineHeight: "100%" }}>
                <font color="#000000">
                  <font face="Times New Roman, serif">
                    Being secretive about where they go and the money they
                    spend.
                  </font>
                </font>
              </p>
            </li>
            <li>
              <p style={{ marginBottom: "0cm", lineHeight: "100%" }}>
                <font color="#000000">
                  <font face="Times New Roman, serif">
                    Seeming restless, irritable, and easily agitated.
                  </font>
                </font>
              </p>
            </li>
            <li>
              <p style={{ marginBottom: "0cm", lineHeight: "100%" }}>
                <font color="#000000">
                  <font face="Times New Roman, serif">
                    Feelings of depression or anxiety.
                  </font>
                </font>
              </p>
            </li>
            <li>
              <p style={{ marginBottom: "0cm", lineHeight: "100%" }}>
                <font color="#000000">
                  <font face="Times New Roman, serif">
                    Withdrawing from friends and family and spending more time
                    alone.
                  </font>
                </font>
              </p>
            </li>
            <li>
              <p style={{ marginBottom: "0cm", lineHeight: "100%" }}>
                <font color="#000000">
                  <font face="Times New Roman, serif">
                    Sleeping and eating less.
                  </font>
                </font>
              </p>
            </li>
            <li>
              <p style={{ marginBottom: "0cm", lineHeight: "100%" }}>
                <font color="#000000">
                  <font face="Times New Roman, serif">
                    Becoming less reliable, often arriving late to commitments.
                  </font>
                </font>
              </p>
            </li>
            <li>
              <p style={{ marginBottom: "0cm", lineHeight: "100%" }}>
                <font color="#000000">
                  <font face="Times New Roman, serif">
                    Taking a lot of time to complete small tasks or errands.
                  </font>
                </font>
              </p>
            </li>
            <li>
              <p style={{ marginBottom: "0cm", lineHeight: "100%" }}>
                <font color="#000000">
                  <font face="Times New Roman, serif">
                    Becoming less efficient, productive, or trusted at work.
                  </font>
                </font>
              </p>
            </li>
            <li>
              <p style={{ marginBottom: "0cm", lineHeight: "100%" }}>
                <font color="#000000">
                  <font face="Times New Roman, serif">
                    Sometimes expressing guilt or remorse after participation.
                  </font>
                </font>
              </p>
            </li>
            <li>
              <p style={{ marginBottom: "0.28cm", lineHeight: "100%" }}>
                <font color="#000000">
                  <font face="Times New Roman, serif">
                    Repeated inability to stop or control participation.
                  </font>
                </font>
              </p>
            </li>
          </ul>
          <p style={{ marginBottom: "0.28cm", lineHeight: "100%" }}>
            <font color="#000000">
              <font face="Times New Roman, serif">
                <b>Resources</b>
              </font>
            </font>
          </p>
          <p style={{ marginBottom: "0.28cm", lineHeight: "100%" }}>
            <font color="#000000">
              <font face="Times New Roman, serif">
                If you or someone you know has a gambling problem and needs
                assistance, please call 1-800-522-4700 or visit{" "}
              </font>
            </font>
            <a href="http://www.ncpgambling.org/">
              <font color="#0563c1">
                <font face="Times New Roman, serif">
                  <u>www.ncpgambling.org</u>
                </font>
              </font>
            </a>
            <font color="#000000">
              <font face="Times New Roman, serif">
                . For additional resources:&nbsp;
              </font>
            </font>
          </p>
          <p style={{ marginBottom: "0.28cm", lineHeight: "100%" }}>
            <font color="#000000">
              <font face="Times New Roman, serif">800-GAMBLER</font>
            </font>
          </p>
          <p style={{ marginBottom: "0.28cm", lineHeight: "100%" }}>
            <font color="#000000">
              <font face="Times New Roman, serif">GAMBLERS ANONYMOUS</font>
            </font>
          </p>
          <p style={{ marginBottom: "0.28cm", lineHeight: "100%" }}>
            <font color="#000000">
              <font face="Times New Roman, serif">GAM-ANON</font>
            </font>
          </p>
        </div>
        <AppBar
          position="fixed"
          color="transparent"
          className="top-auto bottom-4 p-1 shadow-none"
        >
          <Grid container justify="center">
            <Grid item xs={11} sm={10} md={6} lg={2}>
              <Button
                className="font-bold"
                variant="contained"
                fullWidth
                color="primary"
                onClick={() => {
                  history.goBack();
                }}
              >
                Back
              </Button>
            </Grid>
          </Grid>
        </AppBar>
      </Grid>
    </Fragment>
  );
};

export default ResponsibleGaming;
