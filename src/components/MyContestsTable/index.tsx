import { Fragment, useState } from "react";

import { AppDispatch, useAppDispatch } from "../../redux/store";

import TableDesktop from "./TableDesktop";
import TableMobile from "./TableMobile";
import ConfirmationDialog from "../../components/ConfirmationDialog";

import { ContestsPayload, Contest } from "./interfaces";

import { doAsyncCloseContest } from "../../redux/thunks/contests";

const MyContestsTable = ({
  contestData,
  handleContestShareClick,
  userId,
}: ContestsPayload) => {
  const dispatch: AppDispatch = useAppDispatch();
  const [isCloseConfrimationOpen, setCloseConfirmationOpen] = useState(false);
  const [currentContest, setCurrentContest] = useState<Contest | null>(null);

  const closeContestConfirmation = (contest: Contest) => {
    setCurrentContest(contest);
    setCloseConfirmationOpen(true);
  };

  const handleCloseContest = () => {
    console.log("Closed contest with id ", currentContest?.id);

    dispatch(doAsyncCloseContest(currentContest?.id || 0)).then((response) => {
      if (response.type == "contests/close/contest/fulfilled") {
        console.log("ppoof");
      }
    });
  };

  return (
    <Fragment>
      <TableDesktop
        contestData={contestData}
        handleContestShareClick={handleContestShareClick}
        userId={userId}
        closeContestConfirmation={closeContestConfirmation}
      />

      {/* Mobile view table */}
      <TableMobile
        contestData={contestData}
        handleContestShareClick={handleContestShareClick}
        userId={userId}
        closeContestConfirmation={closeContestConfirmation}
      />

      <ConfirmationDialog
        open={isCloseConfrimationOpen}
        handleClose={() => {
          setCloseConfirmationOpen(false);
        }}
        handleConfirm={handleCloseContest}
        titleText="Close this contest?"
        descriptionText={`Are you sure you want to close the contest between ${currentContest?.creatorPlayer?.fullName} and ${currentContest?.claimerPlayer?.fullName}. This action cannot be reversed. It will close this contest and refund your bet amount`}
        agreeText="Close Contest"
      />
    </Fragment>
  );
};

export default MyContestsTable;
