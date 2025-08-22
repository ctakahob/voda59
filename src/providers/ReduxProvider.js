'use client';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store';
import { Box, CircularProgress } from '@mui/material';

const ReduxProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate 
        loading={
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '100vh' 
            }}
          >
            <CircularProgress />
          </Box>
        } 
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;