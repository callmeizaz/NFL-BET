import type { RootState } from '../store'

export const selectIsVisible = (state: RootState) => state.miscellaneous.isVisible;
export const selectNotificationMessage = (state: RootState) => state.miscellaneous.message;
export const selectIsLoadingVisible = (state: RootState) => state.miscellaneous.isLoadingVisible;
export const selectRedirectTo = (state: RootState) => state.miscellaneous.redirectTo;
export const selectMobileOpen = (state: RootState) => state.miscellaneous.mobileOpen;