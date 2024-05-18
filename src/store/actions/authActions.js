// authActions.js
export const loginSuccess = (token) => ({
  type: 'LOGIN_SUCCESS',
  payload: { token },
});

export const logout = () => ({
  type: 'LOGOUT',
});

export const updateAuthToken = (token) => ({
  type: 'UPDATE_AUTH_TOKEN',
  payload: { token },
});
