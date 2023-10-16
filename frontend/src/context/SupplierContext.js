import { createContext, useReducer } from 'react';

export const SupplierContext = createContext();

export const supplierReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SUPPLIER':
      return {
        ...state,
        supplier: action.payload,
      };
    case 'CREATE_SUPPLIER':
      return {
        ...state,
        supplier: [action.payload, ...state.supplier],
      };
    case 'DELETE_SUPPLIER':
      return {
        ...state,
        supplier: state.supplier.filter((w) => w._id !== action.payload._id),
      };
    case 'UPDATE_SUPPLIER':
      return {
        ...state,
        supplier: [
          ...state.supplier.filter((w) => w._id !== action.payload._id),
          action.payload,
        ],
      };
    case 'LOGIN':
      return { ...state, ...action.payload };
    case 'LOGOUT':
      return { ...state, supplier: null };
    default:
      return state;
  }
};


export const SupplierContextProvider = ({ children }) => {
  // Check if the supplier entry exists in local storage else set it to null
  const storedSupplier = localStorage.getItem("supplier");
  const initialState = storedSupplier
    ? { ...JSON.parse(storedSupplier) }
    : { supplier: null };

  const [state, dispatch] = useReducer(supplierReducer, initialState);

  console.log('SupplierContext state: ', state);

  return (
    <SupplierContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SupplierContext.Provider>
  );
};

