export const GOOGLE_GEOCODING_KEY =
  process.env.REACT_APP_GEOCODING_KEY ||
  "AIzaSyDdTVtug8gXhX4l5oVdc7ULMW7jvTSadas";
export const APP_BASE_URL = process.env.REACT_APP_BASE_API_URL || "/api/v1/";
export const PLAYER_POSITIONS = ["QB", "RB", "WR", "TE", "K"];
export const LOBBY_SPREAD_LIMIT = 6.5;
export const BET_AMOUNTS = [0, 10, 20, 30, 50, 100, 250, 500];
export const BET_AMOUNTS_BATTLEGROUND = [0, 5, 10, 20, 30, 50, 100, 250, 500];
export const YAHOO_CLIENT_ID =
  process.env.REACT_APP_YAHOO_CLIENT_ID ||
  "dj0yJmk9VmRRM2dkRFMwSUQ1JmQ9WVdrOVRsSnJXR1Y2V1U4bWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTdl";
export const YAHOO_OAUTH_REDIRECT_URL =
  process.env.REACT_APP_YAHOO_OAUTH_REDIRECT_URL ||
  "https://staging.toppropfantasy.com/oauth/yahoo";
export const APP_ENV = process.env.REACT_APP_ENV || "production";
export const ENABLE_BATTLEGROUND =
  process.env.REACT_APP_ENABLE_BATTLEGROUND === "true" || false;
export const SENTRY_DNS =
  process.env.REACT_APP_SENTRY_DSN ||
  "https://6f6a7d1c1c5d4f74b6cf51de07c804af@o963211.ingest.sentry.io/5914393";

// export const COMET_APPID = process.env.REACT_APP_COMET_APPID || "1935620e40b23c29";
// export const COMET_APP_REGION = process.env.REACT_APP_COMET_REGION || "us";

// export const COMET_BASE_URL =`https://${COMET_APPID}.api-${COMET_APP_REGION}.cometchat.io/`;

// export const COMET_AUTH_KEY = 
//   process.env.REACT_APP_COMET_AUTH_KEY || "f41465cbea82c80f26fb8c9fd3912a3fc4471ab7";
// export const COMET_APP_API_KEY = 
//   process.env.REACT_APP_COMET_APP_API_KEY || "6caa1efd9d34115fad50a3e18f7155438af1b44c";