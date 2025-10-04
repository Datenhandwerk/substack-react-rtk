import React from 'react';
import { Provider } from 'react-redux';
import { createSubstackStore } from '../store/store';

export interface SubstackProviderProps {
  children: React.ReactNode;
  apiUrl?: string;
}

const store = createSubstackStore();

export const SubstackProvider: React.FC<SubstackProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
