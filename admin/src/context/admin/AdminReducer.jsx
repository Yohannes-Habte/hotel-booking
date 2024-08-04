export const ADMIN_ACTION = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILED: 'LOGIN_FAILED',
  ADMIN_LOG_OUT: 'ADMIN_LOG_OUT',
  DELET_ALL: 'DELET_ALL',
};

const AdminReducer = (state, action) => {
  switch (action.type) {
    case ADMIN_ACTION.LOGIN_START:
      return { user: null, loading: true, error: null };

    case ADMIN_ACTION.LOGIN_SUCCESS:
      return { user: action.payload, loading: false, error: null };

    case ADMIN_ACTION.LOGIN_FAILED:
      return { user: null, loading: false, error: action.payload };

    case ADMIN_ACTION.ADMIN_LOG_OUT:
      return { user: null, loading: false, error: null };
    case ADMIN_ACTION.DELET_ALL:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default AdminReducer;
