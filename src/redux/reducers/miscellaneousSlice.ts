import { createSlice, PayloadAction, createReducer } from "@reduxjs/toolkit";
import StateManager from "react-select";

interface MiscellaneousState {
  message: string;
  isVisible: boolean;
  mobileOpen: boolean;
}

interface CreateNotificationPayload {
  message: string;
  isVisible: boolean;
}

// Define the initial state using that type
const initialState: MiscellaneousState = {
  message: "",
  isVisible: false,
  mobileOpen: false,
};

export const miscellaneousSlice = createSlice({
  name: "miscellaneous",
  initialState,
  reducers: {
    doCreateNotification: (
      state,
      action: PayloadAction<CreateNotificationPayload>
    ) => {
      return {
        ...state,
        isVisible: action.payload.isVisible,
        message: action.payload.message,
      };
    },
    toggleSidebar: (
      state, 
      // action: PayloadAction<DisplaySidebarPayload>
    ) => {
    
        return {
          ...state,
          mobileOpen: !state.mobileOpen,
        }
    }
  },
});

export const { doCreateNotification, toggleSidebar } = miscellaneousSlice.actions;

export default miscellaneousSlice;
