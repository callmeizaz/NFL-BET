import clsx from "clsx";

import ButtonBase from "@material-ui/core/ButtonBase";
import Grid from "@material-ui/core/Grid";

import { cardConfig, textAlignment, useStyles } from "../../../utils/table";

import { IProps } from "./interface";

// import useStyles from "./styles";

const TableBody = (props: IProps) => {
  const classes = useStyles();
  const { getTableBodyProps, rows, prepareRow, handleContestShareClick } =
    props;

  return (
    <div className="table-row-group" {...getTableBodyProps()}>
      {
        // Loop over the table rows
        rows.map((row) => {
          const contestData = row?.original;
          // Prepare the row for display
          prepareRow(row);
          return (
            // Apply the row props
            <div
              className={clsx(
                "table-row cursor-pointer",
                classes.contestWrapper
              )}
              onClick={() => {
                handleContestShareClick(contestData);
              }}
              {...row.getRowProps()}
            >
              {
                // Loop over the rows cells
                row.cells.map((cell, index) => {
                  // Apply the cell props
                  return (
                    <div
                      className={clsx("table-cell align-top")}
                      {...cell.getCellProps()}
                      // @ts-ignore
                    >
                      <div className="h-16">
                        <Grid
                          // elevation={0}
                          className={clsx(
                            classes.contestCell,
                            cardConfig(
                              index,
                              classes,
                              cell.column?.meta?.position || "middle"
                            ),
                            "text-lg bg-white"
                          )}
                          container
                          justify={cell.column?.meta?.justify || "flex-start"}
                          alignContent="center"
                        >
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </Grid>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          );
        })
      }
    </div>
  );
};

export default TableBody;
