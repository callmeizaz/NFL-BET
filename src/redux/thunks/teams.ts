import { createAsyncThunk } from "@reduxjs/toolkit";
import * as lobbyAPIs from "../../services/api/contests";


  export const fetchAsyncTeams = createAsyncThunk(
    "teams/fetch",
    async () => {
      const response = await lobbyAPIs.FetchTeams();
      return response.data;
    }
  );
