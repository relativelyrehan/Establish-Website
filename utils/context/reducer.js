export const appReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLogin: action.value };
    case "USER":
      return { ...state, user: action.value };
  }
};
