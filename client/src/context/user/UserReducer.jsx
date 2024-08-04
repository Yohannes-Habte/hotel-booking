// User action object
export const USER_ACTION = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',
  LOGOUT: 'LOGOUT',
};

const UserReducer = (state, action) => {
  switch (action.type) {
    case USER_ACTION.LOGIN_START:
      return { user: null, loading: true, error: null };
    case USER_ACTION.LOGIN_SUCCESS:
      return { user: action.payload, loading: false, error: null };
    case USER_ACTION.LOGIN_FAIL:
      return { error: action.payload, user: null, loading: false };
    case USER_ACTION.LOGOUT:
      return { error: null, user: null, loading: false };
    default:
      return state;
  }
};

export default UserReducer;
