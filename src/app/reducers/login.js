const login = (state = { pending: true, loggedIn: false }, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { pending: false, loggedIn: true, ...action.user };

    case 'LOGOUT':
      return { pending: false, loggedIn: false, ...action.user };

    default:
      return { ...state, pending: false };
  }
};

export default login;