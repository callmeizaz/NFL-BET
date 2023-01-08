import { Fragment } from "react";
import TableDesktop from "./TableDesktop";
import TableMobile from "./TableMobile";

import { ContestsPayload } from "./interfaces";

const PastContestsTable = ({
  contestData,
  handleContestShareClick,
  userId,
}: ContestsPayload) => {
  return (
    <Fragment>
      <TableDesktop
        contestData={contestData}
        handleContestShareClick={handleContestShareClick}
        userId={userId}
      />

      {/* Mobile view table */}
      <TableMobile
        contestData={contestData}
        handleContestShareClick={handleContestShareClick}
        userId={userId}
      />
    </Fragment>
  );
};

export default PastContestsTable;
