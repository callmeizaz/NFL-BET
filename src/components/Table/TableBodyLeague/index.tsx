import clsx from "clsx";

import Grid from "@material-ui/core/Grid";

import { cardConfig, useStyles } from "../../../utils/table";

import { IProps } from "./interface";

// import useStyles from "./styles";

const TableBodyLeague = (props: IProps) => {
  const classes = useStyles();
  const { getTableBodyProps, rows, prepareRow, hideHover } = props;

  return (
    <div className="table-row-group h-16" {...getTableBodyProps()}>
      {
        // Loop over the table rows
        rows.map((row) => {
          // Prepare the row for display
          prepareRow(row);
          return (
            // Apply the row props
            <div
              className={clsx(
                "table-row ",
                hideHover ? "" : classes.contestWrapper
              )}
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
                      <div className="h-8">
                        <Grid
                          // elevation={0}
                          className={clsx(
                            classes.contestCell,
                            cardConfig(
                              index,
                              classes,
                              cell.column?.meta?.position || "middle"
                            ),
                            "text-lg bg-white border-b"
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

export default TableBodyLeague;
