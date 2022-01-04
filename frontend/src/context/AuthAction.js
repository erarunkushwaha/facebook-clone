export const loginStart = (userCreadential) => ({
  type: "LOGIN_START",
});
export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  playload: user,
});

export const logout = () => ({
  type: "LOGOUT",
  playload: null,
});
export const loginFail = (error) => ({
  type: "LOGIN_FAIL",
  playload: error,
});

export const Follow = (userId) => ({
  type: "FOLLOW",
  playload: userId,
});
export const Unfollow = (userId) => ({
  type: "UNFOLLOW",
  payload: userId,
});
