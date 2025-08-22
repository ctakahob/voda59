'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import CartDrawer from '../components/cart/CartDrawer';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Box } from '@mui/material';

const InitializeApp = ({ children }) => {
  return (
    <>
      <Header />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {children}
      </Box>
      <Footer />
      <CartDrawer />
    </>
  );
};

export default InitializeApp;