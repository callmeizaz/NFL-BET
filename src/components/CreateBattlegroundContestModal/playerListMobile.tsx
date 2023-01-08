import React from "react";
import { Avatar, Divider, Grid, Typography, Button } from "@material-ui/core";

import TEAMS from "../../constants/teams";
import { generateGradientString, roundValue } from "../../helpers/suggestions";

interface PlayerListMobileInterface {
  playerPoint: number;
  opponentPoint: number;
  remoteId: string;
  name: string;
  playerName: string;
  position: string;
  team: string;
  opponent: string;
  homeOrAway: string;
  image: string;
  playerImage: string;
  topPlayerDataTeam: string;
  makeOpponent: boolean;
  button?: {
    text: string;
    callback: Function;
  };
  selectedListPlayer: string;
  onRowClick?: Function;
}

const PlayerListMobile = ({
  playerPoint,
  opponentPoint,
  remoteId,
  name,
  playerName,
  position,
  team,
  opponent,
  homeOrAway,
  image,
  playerImage,
  topPlayerDataTeam,
  makeOpponent,
  button,
  selectedListPlayer,
  onRowClick,
}: PlayerListMobileInterface) => {
  const playerSpread = roundValue(opponentPoint - playerPoint, 0.5);
  const opponentSpread = roundValue(playerPoint - opponentPoint, 0.5);

  return (
    <Grid
      container
      style={{
        backgroundColor: `${remoteId === selectedListPlayer ? "#e9decc" : ""}`,
      }}
      onClick={() => {
        if (onRowClick) {
          onRowClick();
        }
      }}
    >
      <Grid
        item
        container
        justify="space-between"
        direction={makeOpponent ? "row-reverse" : "row"}
        className="cursor-pointer hover:bg-yellow-100"
      >
        <Grid item xs={3} container justify="center" alignContent="center">
          <Grid item xs={6} container justify="center">
            <Avatar alt={name} src={playerImage} className="h-8 w-8"></Avatar>
          </Grid>
          <Grid item xs={6} container justify="center" alignContent="center">
            <Typography variant="h6" className="text-green-900 font-bold">
              {playerSpread && playerSpread > 0 ? `+${playerSpread}` : ""}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={1} container justify="center" alignContent="center">
          <Typography variant="h6" className="text-green-900 font-black">
            vs
          </Typography>
        </Grid>

        <Grid item xs={8}>
          <Grid
            item
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            className="py-0.5"
          >
            <Grid
              item
              xs
              container
              className="min-w-0 flex-nowrap"
              alignItems="center"
            >
              <Avatar alt={name} src={image} className="h-8 w-8 mr-2"></Avatar>
              <Grid item xs={12} container>
                <Grid item xs={10} container>
                  <Grid item>
                    <Typography
                      className="font-bold overflow-ellipsis overflow-hidden"
                      variant="body1"
                    >
                      {name}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    container
                    justify="flex-start"
                    alignContent="center"
                  >
                    <Grid item xs container direction="column" justify="center">
                      <Typography className="text-xs pr-2">{`${position || ""} | ${team || ""} ${
                        homeOrAway === "AWAY" ? "@" : "vs"
                      } ${opponent || ""}`}</Typography>
                    </Grid>

                    {button ? (
                      <Grid item xs={12} md={8}>
                        <Button
                          size="small"
                          color="primary"
                          variant="outlined"
                          className="py-0 bg-white text-xs"
                          onClick={() => button.callback()}
                        >
                          {button.text}
                        </Button>
                      </Grid>
                    ) : (
                      ""
                    )}
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={2}
                  container
                  justify="center"
                  alignContent="center"
                >
                  <Typography variant="h6" className="text-green-900 font-bold">
                    {opponentSpread && opponentSpread > 0
                      ? `+${opponentSpread}`
                      : ""}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Divider
            className="h-0.5"
            style={{
              backgroundImage: generateGradientString(
                makeOpponent,
                topPlayerDataTeam,
                team
              ),
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PlayerListMobile;
