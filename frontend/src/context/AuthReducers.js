export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFecthing: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.playload,
        isFecthing: false,
        error: false,
      };
    case "LOGIN_FAIL":
      return {
        user: null,
        isFecthing: false,
        error: action.playload,
      };

    case "LOGOUT":
      return {
        user: null,
        isFecthing: false,
        error: false,
      };
    case "FOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };
    case "UNFOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter(
            (following) => following !== action.payload
          ),
        },
      };
    default:
      return state;
  }
};
