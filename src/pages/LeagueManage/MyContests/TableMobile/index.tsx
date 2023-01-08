import { useMemo, useState, Fragment } from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import {
  TextField,
  Hidden,
  InputAdornment,
  Typography,
  Grid,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import { TableBodyMobile } from "../../../../components/Table";
import { useAppSelector } from "../../../../redux/store";
import { selectUserData } from "../../../../redux/selectors/authentication";
import { selectMyContestsData } from "../../../../redux/selectors/leagueContests";
import modifyContest from "../modifyContest";

import FantasyContestCard from "../../../../components/FantasyContestCard";

const TableMobile = ({
  handleContestShareClick,
}: {
  handleContestShareClick?: Function;
}) => {
  const userData = useAppSelector(selectUserData);
  const userId = userData?.id;
  const contestData = useAppSelector(selectMyContestsData);
  const data = useMemo(() => modifyContest(userId, contestData), [contestData]);

  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "searchNames",
        disableSortBy: true,
        meta: {
          position: "left",
        },
        Cell: (props: any) => {
          const contestData = props?.row?.original;
          return (
            <FantasyContestCard
              // @ts-ignore
              key={contestData.id}
              contestData={contestData}
              handleContestShareClick={handleContestShareClick}
            />
          );
        },
      },
    ],
    []
  );

  // @ts-ignore
  const tableInstance = useTable({ columns, data }, useGlobalFilter, useSortBy);

  const {
    getTableProps,
    getTableBodyProps,
    // headerGroups,
    rows,
    state,
    prepareRow,
    setGlobalFilter,
    // preGlobalFilteredRows,
  } = tableInstance;

  const [searchText, setSearchText] = useState("");

  return (
    <Hidden only={["md", "lg", "xl"]}>
      <Fragment>
        <Grid container className="my=5">
          <Grid item xs={12} md={6} lg={6} container alignContent="center">
            <Typography variant="h6" className="text-gray-400">
              My Open Contests
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={12} container justify="flex-end">
            <TextField
              id="outlined-basic"
              placeholder="Search My Contests"
              fullWidth
              value={searchText}
              onChange={(event) => {
                setSearchText(event.target.value);
                setGlobalFilter(event.target.value || undefined);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <div
          {...getTableProps()}
          className="w-full table"
          style={{ borderCollapse: "separate", borderSpacing: "0 1rem" }}
        >
          {/* Apply the table body props */}
          <TableBodyMobile
            getTableBodyProps={getTableBodyProps}
            rows={rows}
            prepareRow={prepareRow}
          />
        </div>
      </Fragment>
    </Hidden>
  );
};

export default TableMobile;
