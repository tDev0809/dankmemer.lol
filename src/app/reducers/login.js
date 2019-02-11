const config = require('../../../config.json')
const login = (state = { loggedIn: false, isAdmin: false }, action) => {
  switch (action.type) {
    case 'LOGIN':
      const admin = config.admins.includes(action.user.id)
      return { loggedIn: true, isAdmin: admin, ...action.user };

    case 'LOGOUT':
      return { loggedIn: false, isAdmin: false, ...action.user };

    default:
      return state;
  }
};

export default login;