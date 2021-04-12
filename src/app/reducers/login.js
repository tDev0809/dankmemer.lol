const login = (state = { loggedIn: false }, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { loggedIn: true, ...action.user };

    case 'LOGOUT':
      return { loggedIn: false, ...action.user };

    default:
      return state;
  }
};

export default login;