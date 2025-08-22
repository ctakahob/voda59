'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme as useMuiTheme,
  Avatar,
  Divider,
  Tooltip,
} from '@mui/material';
import {
  ShoppingCart,
  Person,
  Menu as MenuIcon,
  Close,
  Home,
  Store,
  DarkMode,
  LightMode,
  Logout,
  AccountCircle,
  Phone,
} from '@mui/icons-material';
import Link from 'next/link';
import { useTheme } from '../../theme/ThemeProvider';
import { selectIsAuthenticated, selectUser, logout } from '../../store/slices/authSlice';
import { selectCartTotalItems, toggleCart } from '../../store/slices/cartSlice';
import AuthModal from '../auth/AuthModal';

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const muiTheme = useMuiTheme();
  const { isDarkMode, toggleTheme } = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const cartItemsCount = useSelector(selectCartTotalItems);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleUserMenuClose();
    router.push('/');
  };

  const handleCartClick = () => {
    dispatch(toggleCart());
  };

  const openAuthModal = (mode = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const menuItems = [
    { text: 'Главная', href: '/', icon: <Home /> },
    { text: 'Продукты', href: '/products', icon: <Store /> },
    { text: 'Контакты', href: '/contacts', icon: <Phone /> },
  ];

  const MobileMenu = () => (
    <Drawer
      anchor="left"
      open={mobileMenuOpen}
      onClose={() => setMobileMenuOpen(false)}
      PaperProps={{
        sx: { width: 280 }
      }}
    >
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="div">
          Новолядская Вода
        </Typography>
        <IconButton onClick={() => setMobileMenuOpen(false)}>
          <Close />
        </IconButton>
      </Box>
      <Divider />
      
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} component={Link} href={item.href} onClick={() => setMobileMenuOpen(false)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>

      <Divider />
      
      <List>
        <ListItem>
          <ListItemIcon>
            {isDarkMode ? <LightMode /> : <DarkMode />}
          </ListItemIcon>
          <ListItemText primary="Переключить тему" />
          <IconButton onClick={toggleTheme} size="small">
            {isDarkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
        </ListItem>
      </List>

      {!isAuthenticated && (
        <>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Button
              fullWidth
              variant="contained"
              sx={{ mb: 1 }}
              onClick={() => {
                setMobileMenuOpen(false);
                openAuthModal('login');
              }}
            >
              Войти
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                setMobileMenuOpen(false);
                openAuthModal('register');
              }}
            >
              Регистрация
            </Button>
          </Box>
        </>
      )}
    </Drawer>
  );

  return (
    <>
      <AppBar position="sticky" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Мобильное меню и логотип */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isMobile && (
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => setMobileMenuOpen(true)}
                sx={{ mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}
            
            <Typography
              variant="h6"
              component={Link}
              href="/"
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 'bold',
                fontSize: { xs: '1rem', sm: '1.25rem' }
              }}
            >
              Новолядская Вода
            </Typography>
          </Box>

          {/* Десктопная навигация */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  component={Link}
                  href={item.href}
                  startIcon={item.icon}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

          {/* Правая часть хедера */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Переключатель темы */}
            {!isMobile && (
              <Tooltip title={isDarkMode ? 'Светлая тема' : 'Темная тема'}>
                <IconButton onClick={toggleTheme} color="inherit">
                  {isDarkMode ? <LightMode /> : <DarkMode />}
                </IconButton>
              </Tooltip>
            )}

            {/* Корзина */}
            <IconButton color="inherit" onClick={handleCartClick}>
              <Badge badgeContent={cartItemsCount} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>

            {/* Пользователь */}
            {isAuthenticated ? (
              <>
                <IconButton color="inherit" onClick={handleUserMenuOpen}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                    {user?.firstName?.[0] || user?.email?.[0] || 'U'}
                  </Avatar>
                </IconButton>
                
                <Menu
                  anchorEl={userMenuAnchor}
                  open={Boolean(userMenuAnchor)}
                  onClose={handleUserMenuClose}
                  onClick={handleUserMenuClose}
                >
                  <MenuItem component={Link} href="/profile">
                    <ListItemIcon><AccountCircle fontSize="small" /></ListItemIcon>
                    Профиль
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
                    Выйти
                  </MenuItem>
                </Menu>
              </>
            ) : (
              !isMobile && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    color="inherit"
                    startIcon={<Person />}
                    onClick={() => openAuthModal('login')}
                  >
                    Войти
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => openAuthModal('register')}
                    sx={{ 
                      borderColor: 'currentColor',
                      '&:hover': { 
                        borderColor: 'currentColor',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                      }
                    }}
                  >
                    Регистрация
                  </Button>
                </Box>
              )
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Мобильное меню */}
      <MobileMenu />

      {/* Модальное окно аутентификации */}
      <AuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
      />
    </>
  );
};

export default Header;