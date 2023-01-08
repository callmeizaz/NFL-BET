import clsx from "clsx";

import Grid from "@material-ui/core/Grid";

import { useMobileStyles } from "../../../utils/table";

import { IProps } from "./interface";

// import useStyles from "./styles";

const TableBodyMobile = (props: IProps) => {
  const classes = useMobileStyles();
  const { getTableBodyProps, rows, prepareRow } = props;

  return (
    <div className="table-row-group mt-5" {...getTableBodyProps()}>
      {
        // Loop over the table rows
        rows.map((row) => {
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
                row.cells.map((cell, index) => {
                  // Apply the cell props
                  return (
                    <div
                      className={clsx("table-cell align-top")}
                      {...cell.getCellProps()}
                      // @ts-ignore
                    >
                      <div className="h-auto">
                        <Grid
                          // elevation={0}
                          className={clsx(classes.contestCell, "text-lg")}
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

export default TableBodyMobile;
