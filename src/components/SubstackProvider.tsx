import React, {useMemo} from 'react';
import {Provider} from 'react-redux';
import {createSubstackStore} from '../store/store';
import { setConfig } from '../store/configSlice';

export interface SubstackProviderProps {
  children: React.ReactNode;
  apiUrl?: string;
  apiKey?: string;
  publicationUrl?: string;
}

export const SubstackProvider: React.FC<SubstackProviderProps> = (
  {
    children,
    apiUrl = 'https://api.substackapi.dev',
    apiKey = '',
    publicationUrl = ''
  }) => {

  const store = useMemo(() => {
    const newStore = createSubstackStore();
    // Config SOFORT nach Store-Erstellung setzen
    newStore.dispatch(setConfig({ apiUrl, apiKey, publicationUrl }));
    return newStore;
  }, [apiUrl, apiKey, publicationUrl]);


  return <Provider store={store}>{children}</Provider>;
};
