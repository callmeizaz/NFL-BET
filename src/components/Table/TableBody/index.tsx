import clsx from "clsx";

import Grid from "@material-ui/core/Grid";

import { cardConfig, useStyles } from "../../../utils/table";

import { IProps } from "./interface";

// import useStyles from "./styles";

const TableBody = (props: IProps) => {
  const classes = useStyles();
  const { getTableBodyProps, rows, prepareRow, onClickHandler } = props;

  return (
    <div
      className={clsx(
        "table-row-group",
        onClickHandler ? "cursor-pointer" : ""
      )}
      {...getTableBodyProps()}
    >
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
              onClick={
                onClickHandler
                  ? () => {
                      onClickHandler(row.original);
                    }
                  : () => {}
              }
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
                      <div className="h-36">
                        <Grid
                          // elevation={0}
                          className={clsx(
                            classes.contestCell,
                            cardConfig(
                              index,
                              classes,
                              cell.column?.meta?.position || "middle"
                            ),
                            cell.column?.meta?.width || "w-auto",
                            "text-lg"
                          )}
                          container
                          justify={cell.column?.meta?.justify || "flex-start"}
                          alignContent="flex-start"
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
