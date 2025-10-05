import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ApiConfigState {
  apiUrl: string;
  apiKey: string;
  publicationUrl: string;
}

const initialState: ApiConfigState = {
  apiUrl: 'https://api.substackapi.dev',
  apiKey: '',
  publicationUrl: ''
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setConfig: (state, action: PayloadAction<Partial<ApiConfigState>>) => {
      if (action.payload.apiUrl !== undefined) state.apiUrl = action.payload.apiUrl;
      if (action.payload.apiKey !== undefined) state.apiKey = action.payload.apiKey;
      if (action.payload.publicationUrl !== undefined) state.publicationUrl = action.payload.publicationUrl;
    }
  }
});

export const { setConfig } = configSlice.actions;
export default configSlice.reducer;
