import { SiteManagerContext } from '../context/SiteManagerContext';
import { useContext } from 'react';

export const useSiteManagerContext = () => {
  const context = useContext(SiteManagerContext);

  if (!context) {
    throw Error(
      'useSiteManagerContext must be inside an SiteManagerContextProvider'
    );
  }

  return context;
};
