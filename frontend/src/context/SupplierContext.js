import { createContext, useReducer } from 'react';

export const SupplierContext = createContext();

export const supplierReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SUPPLIER':
      return {
        supplier: action.payload,
      };
    case 'CREATE_SUPPLIER':
      return {
        supplier: [action.payload, ...state.supplier],
      };
    case 'DELETE_SUPPLIER':
      return {
        supplier: state.supplier.filter((w) => w._id !== action.payload._id),
      };
    case 'UPDATE_SUPPLIER':
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

export const SupplierContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(supplierReducer, {
    supplier: [],
  });

  return (
    <SupplierContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SupplierContext.Provider>
  );
};
