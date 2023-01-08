import { Fragment } from "react";
import TableDesktop from "./TableDesktop";
import TableMobile from "./TableMobile";

import { ContestsPayload } from "./interfaces";

const OpenContestsTable = ({
  contestData,
  handleContestClaimClick,
}: ContestsPayload) => {
  return (
    <Fragment>
      <TableDesktop 
        contestData={contestData}
        handleContestClaimClick={handleContestClaimClick}
      />

      {/* Mobile view table */}
      <TableMobile 
        contestData={contestData}
        handleContestClaimClick={handleContestClaimClick}
      />
      
    </Fragment>
  );
};

export default OpenContestsTable;
