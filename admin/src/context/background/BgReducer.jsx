// Action Object
export const BACKGROUND_ACTION = {
  LIGHT: 'LIGHT',
  GRAY: 'GRAY',
  DARK: 'DARK',
  TOGGLE: 'TOGGLE',
};

const BgReducer = (state, action) => {
  switch (action.type) {
    case BACKGROUND_ACTION.LIGHT:
      return { darkMode: false, grayMode: false };

    case BACKGROUND_ACTION.GRAY:
      return { grayMode: true };

    case BACKGROUND_ACTION.DARK:
      return { darkMode: true };

    case BACKGROUND_ACTION.TOGGLE:
      return { darkMode: !state.darkMode };

    default:
      return state;
  }
};

export default BgReducer;
