import AUTH from "../constants/auth";

// ------------------ Token --------------------------
// setter
export const setAuthorizationToken = (token) => {
  localStorage.setItem(AUTH.TOKEN, token);
};

// getter
export const getAuthorizationToken = () => {
  localStorage.getItem(AUTH.TOKEN);
};

// remove
export const removeAuthorizationToken = () => {
  localStorage.removeItem(AUTH.TOKEN);
};

//----------------------------------------------------

//--------------------USER ID-------------------------

// setter
export const setUserId = (userId) => {
  localStorage.setItem(AUTH.USER_ID, userId);
};

// getter
export const getUserId = () => {
  localStorage.getItem(AUTH.USER_ID);
};

// remove
export const removeUserId = () => {
  localStorage.removeItem(AUTH.USER_ID);
};

//----------------------------------------------------

export const clearAuthKeys = () => {
  removeAuthorizationToken();
  removeUserId();
};
