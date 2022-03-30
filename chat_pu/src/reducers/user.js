export const initialState = {
  isLoggedIn: false,
  me: null,
  onlineUsers: null,
  signUpData: {},
  loginData: {},
};

export const loginAction = (data) => {
  return {
    type: "LOG_IN",
    data,
  };
};

export const logoutAction = () => {
  return {
    type: "USER_LOGOUT",
  };
};

export const onlineUsersAction = (data) => {
  return {
    type: "ONLINE_LIST",
    data,
  };
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        // 감싸주던 user가 없어졌기 때문에 한 단계 빼줘야한다.
        ...state,
        isLoggedIn: true,
        me: action.data,
      };
    // case "LOG_OUT":
    //   return {
    //     // 감싸주던 user가 없어졌기 때문에 한 단계 빼줘야한다.
    //     ...state,
    //     isLoggedIn: false,
    //     me: null,
    //   };
      case "ONLINE_LIST":
        return {
          // 감싸주던 user가 없어졌기 때문에 한 단계 빼줘야한다.
          ...state,
          onlineUsers: action.data,
        };
    default:
      return state;
  }
};

export default reducer;
