import clsx from "clsx";

import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";

import { cardConfig, textAlignment, useStyles } from "../../../utils/table";

import { IProps } from "./interface";

// import useStyles from "./styles";

const RosterTableBody = (props: IProps) => {
  const classes = useStyles();
  const { getTableBodyProps, rows, prepareRow } = props;

  return (
    <div className="table-row-group" {...getTableBodyProps()}>
      {
        // Loop over the table rows
        rows.map((row, index) => {
          // Prepare the row for display
          prepareRow(row);
          return (
            // Apply the row props
            <div
              className={clsx("table-row", classes.contestWrapper)}
              {...row.getRowProps()}
            >
              {
                // Loop over the rows cells
                row.cells.map((cell) => {
                  // Apply the cell props
                  return (
                    <div
                      className={clsx("table-cell align-middle  border-b border-gray-200")}
                      {...cell.getCellProps()}
                      // @ts-ignore
                    >
                      <div>
                        <Grid
                          // elevation={0}
                          container
                          justify={cell.column?.meta?.justify || "flex-start"}
                          alignContent="center"
                          className={clsx(cell.column?.meta?.width || "w-auto","px-2 py-1")}
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

export default RosterTableBody;
