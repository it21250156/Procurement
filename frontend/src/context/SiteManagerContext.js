import { createContext, useReducer } from 'react';

export const SiteManagerContext = createContext();

export const siteManagerReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SITEMANAGER':
      return {
        siteManagers: action.payload,
      };
    case 'CREATE_SITEMANAGER':
      return {
        siteManagers: [action.payload, ...state.siteManagers],
      };
    case 'DELETE_SITEMANAGER':
      return {
        siteManagers: state.siteManagers.filter(
          (w) => w._id !== action.payload._id
        ),
      };
    case 'UPDATE_FEEDBACK':
      return {
        feedbacks: [
          ...state.feedbacks.filter((w) => w._id !== action.payload._id),
          action.payload,
        ],
      };

    default:
      return state;
  }
};

export const SiteManagerContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(siteManagerReducer, {
    siteManagers: null,
  });

  return (
    <SiteManagerContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SiteManagerContext.Provider>
  );
};
