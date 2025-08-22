'use client';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Link,
  CircularProgress,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  clearError,
  selectAuthError,
  selectAuthLoading 
} from '../../store/slices/authSlice';
import { authAPI } from '../../utils/auth';

const LoginForm = ({ onSwitchToRegister, onClose }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const error = useSelector(selectAuthError);
  const isLoading = useSelector(selectAuthLoading);
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data) => {
    dispatch(clearError());
    dispatch(loginStart());

    try {
      const user = await authAPI.login(data.email, data.password);
      dispatch(loginSuccess(user));
      onClose && onClose();
      router.push('/profile');
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  const handleTestLogin = () => {
    const testData = {
      email: 'test@voda59.ru',
      password: '123456'
    };
    onSubmit(testData);
  };

  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Вход
        </Typography>
        
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
          Войдите в свой аккаунт Новолядская Вода
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email обязателен для заполнения',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Введите корректный email'
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Email"
                type="email"
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
                disabled={isLoading}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: 'Пароль обязателен для заполнения',
              minLength: {
                value: 6,
                message: 'Пароль должен содержать минимум 6 символов'
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Пароль"
                type={showPassword ? 'text' : 'password'}
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                disabled={isLoading}
              />
            )}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isLoading}
            sx={{ mb: 2 }}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Войти'}
          </Button>

          <Button
            fullWidth
            variant="outlined"
            onClick={handleTestLogin}
            disabled={isLoading}
            sx={{ mb: 2 }}
          >
            Войти как тестовый пользователь
          </Button>

          <Box textAlign="center">
            <Typography variant="body2">
              Нет аккаунта?{' '}
              <Link
                component="button"
                variant="body2"
                onClick={(e) => {
                  e.preventDefault();
                  onSwitchToRegister && onSwitchToRegister();
                }}
                sx={{ cursor: 'pointer' }}
              >
                Зарегистрироваться
              </Link>
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LoginForm;