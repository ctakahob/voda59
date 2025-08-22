'use client';
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Box } from '@mui/material';
import { Close } from '@mui/icons-material';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthModal = ({ open, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);

  const handleClose = () => {
    setMode('login'); // Сброс к логину при закрытии
    onClose();
  };

  const switchToLogin = () => setMode('login');
  const switchToRegister = () => setMode('register');

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'hidden',
        }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, position: 'relative' }}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ pb: 2 }}>
          {mode === 'login' ? (
            <LoginForm 
              onSwitchToRegister={switchToRegister}
              onClose={handleClose}
            />
          ) : (
            <RegisterForm 
              onSwitchToLogin={switchToLogin}
              onClose={handleClose}
            />
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;