import { Avatar, Typography } from "@material-ui/core";
import clsx from "clsx";
import { LeaguePlayer } from "./interface";

const TeamPlayerDetails = ({ url, name, isOver, dense }: LeaguePlayer) => (
  <span className="flex items-center">
    {url ? <Avatar alt={name} src={url} className="h-6 w-6" /> : ""}

    <Typography
      component="span"
      variant="caption"
      className={clsx(
        "ml-2 font-semibold",
        isOver ? "text-gray-400" : "",
        dense ? "text-xs" : ""
      )}
    >
      {name}
    </Typography>
  </span>
);

export default TeamPlayerDetails;
