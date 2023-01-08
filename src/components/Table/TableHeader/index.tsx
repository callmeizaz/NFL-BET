import clsx from "clsx";

import Typography from "@material-ui/core/Typography";

import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

import { textAlignment, useStyles } from "../../../utils/table";

import { IProps } from "./interface";

const TableHeader = (props: IProps) => {
  const classes = useStyles();
  const { headerGroups } = props;
  return (
    <div
      className={clsx("table-header-group sticky top-0 py-4", classes.header)}
    >
      {
        // Loop over the header rows
        headerGroups.map((headerGroup) => {
          // Apply the header row props
          const columns = headerGroup.headers.reduce(
            (accumulator, currentValue) =>
              accumulator +
              (currentValue?.meta?.colSpan ? currentValue?.meta?.colSpan : 1),
            0
          );

          const columnWidth = 100 / columns;

          return (
            <div {...headerGroup.getHeaderGroupProps()} className="table-row">
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column, index) => {
                  return (
                    // Apply the header cell props
                    <div
                      className={clsx(
                        "table-cell px-2",
                        column.canSort ? "cursor-pointer" : ""
                      )}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      // @ts-ignore
                      style={{
                        width: `${
                          column?.meta?.colSpan
                            ? column?.meta?.colSpan * columnWidth
                            : columnWidth
                        }%`,
                      }}
                      // colSpan={column?.colSpan}
                    >
                      <Typography
                        align="left"
                        className={clsx(
                          "text-gray-400",
                          textAlignment(column?.meta?.align || "left")
                        )}
                        variant="subtitle1"
                      >
                        {
                          // Render the header
                          column.render("Header")
                        }
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <ArrowDownwardIcon className="ml-2 mb-1 text-base" />
                          ) : (
                            <ArrowUpwardIcon className="ml-2 mb-1 text-base" />
                          )
                        ) : (
                          ""
                        )}
                      </Typography>
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

export default TableHeader;
