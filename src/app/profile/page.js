'use client';
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Avatar,
  Tabs,
  Tab,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Switch,
  FormControlLabel,
  Breadcrumbs,
  Link as MuiLink,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Person,
  Edit,
  History,
  Settings,
  ShoppingBag,
  LocalShipping,
  CheckCircle,
  Schedule,
  Save,
  Cancel,
  Notifications,
  DarkMode,
  Email,
  Phone,
  LocationOn,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated, selectUser, updateUser } from '../../store/slices/authSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  
  const [tabValue, setTabValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });
  const [changePasswordDialog, setChangePasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    darkMode: false,
    autoReorder: false,
  });

  // Mock order data
  const mockOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-20',
      status: 'delivered',
      total: 850,
      items: [
        { name: 'Новолядская Родниковая 1.5л', quantity: 6, price: 75 },
        { name: 'Новолядская Детская 0.33л', quantity: 5, price: 40 },
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-01-15',
      status: 'processing',
      total: 1200,
      items: [
        { name: 'Новолядская Бутыль 19л', quantity: 2, price: 420 },
        { name: 'Новолядская Спортивная 0.75л', quantity: 4, price: 85 },
      ]
    },
    {
      id: 'ORD-003',
      date: '2024-01-10',
      status: 'cancelled',
      total: 300,
      items: [
        { name: 'Новолядская Родниковая 0.5л', quantity: 4, price: 45 },
        { name: 'Новолядская Газированная 0.5л', quantity: 2, price: 55 },
      ]
    },
  ];

  // Redirect if not authenticated
  if (!isAuthenticated) {
    router.push('/');
    return null;
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEditToggle = () => {
    if (editMode) {
      // Cancel edit
      setEditData({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || '',
      });
    }
    setEditMode(!editMode);
  };

  const handleSaveProfile = () => {
    dispatch(updateUser(editData));
    setEditMode(false);
  };

  const handleInputChange = (field) => (event) => {
    setEditData({
      ...editData,
      [field]: event.target.value,
    });
  };

  const handlePasswordChange = (field) => (event) => {
    setPasswordData({
      ...passwordData,
      [field]: event.target.value,
    });
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }
    // TODO: Implement password change logic
    console.log('Password change request:', passwordData);
    setChangePasswordDialog(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    alert('Пароль успешно изменен');
  };

  const handleSettingChange = (setting) => (event) => {
    setSettings({
      ...settings,
      [setting]: event.target.checked,
    });
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field],
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'success';
      case 'processing': return 'info';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered': return 'Доставлен';
      case 'processing': return 'В обработке';
      case 'cancelled': return 'Отменен';
      default: return status;
    }
  };

  const ProfileInfo = () => (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Личная информация
          </Typography>
          <Button
            variant={editMode ? "outlined" : "contained"}
            startIcon={editMode ? <Cancel /> : <Edit />}
            onClick={handleEditToggle}
            color={editMode ? "error" : "primary"}
          >
            {editMode ? 'Отмена' : 'Редактировать'}
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar
            sx={{ 
              width: 80, 
              height: 80, 
              bgcolor: theme.palette.primary.main,
              fontSize: '2rem',
              mr: 3 
            }}
          >
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Клиент с {new Date(user?.createdAt || Date.now()).toLocaleDateString('ru-RU')}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Имя"
              value={editMode ? editData.firstName : user?.firstName || ''}
              onChange={handleInputChange('firstName')}
              disabled={!editMode}
              InputProps={{
                startAdornment: <Person sx={{ color: 'text.secondary', mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Фамилия"
              value={editMode ? editData.lastName : user?.lastName || ''}
              onChange={handleInputChange('lastName')}
              disabled={!editMode}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              value={editMode ? editData.email : user?.email || ''}
              onChange={handleInputChange('email')}
              disabled={!editMode}
              InputProps={{
                startAdornment: <Email sx={{ color: 'text.secondary', mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Телефон"
              value={editMode ? editData.phone : user?.phone || ''}
              onChange={handleInputChange('phone')}
              disabled={!editMode}
              InputProps={{
                startAdornment: <Phone sx={{ color: 'text.secondary', mr: 1 }} />,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Адрес доставки"
              multiline
              rows={2}
              value={editMode ? editData.address : user?.address || ''}
              onChange={handleInputChange('address')}
              disabled={!editMode}
              InputProps={{
                startAdornment: <LocationOn sx={{ color: 'text.secondary', mr: 1 }} />,
              }}
            />
          </Grid>
        </Grid>

        {editMode && (
          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={handleSaveProfile}
            >
              Сохранить
            </Button>
            <Button
              variant="outlined"
              onClick={() => setChangePasswordDialog(true)}
            >
              Изменить пароль
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  const OrderHistory = () => (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          История заказов
        </Typography>
        
        {mockOrders.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <ShoppingBag sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              У вас пока нет заказов
            </Typography>
            <Button
              component={Link}
              href="/products"
              variant="contained"
              sx={{ mt: 2 }}
            >
              Перейти к покупкам
            </Button>
          </Box>
        ) : (
          <List>
            {mockOrders.map((order, index) => (
              <React.Fragment key={order.id}>
                <ListItem sx={{ px: 0, py: 2 }}>
                  <ListItemIcon>
                    <ShoppingBag color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          Заказ #{order.id}
                        </Typography>
                        <Chip
                          label={getStatusText(order.status)}
                          color={getStatusColor(order.status)}
                          size="small"
                        />
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Дата: {new Date(order.date).toLocaleDateString('ru-RU')}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Товаров: {order.items.length} • Сумма: {order.total} ₽
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {order.items.map(item => `${item.name} (${item.quantity} шт.)`).join(', ')}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                {index < mockOrders.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );

  const UserSettings = () => (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Настройки
        </Typography>
        
        <List>
          <ListItem sx={{ px: 0 }}>
            <ListItemIcon>
              <Email />
            </ListItemIcon>
            <ListItemText
              primary="Email уведомления"
              secondary="Получать уведомления о заказах на email"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.emailNotifications}
                  onChange={handleSettingChange('emailNotifications')}
                />
              }
              label=""
            />
          </ListItem>
          
          <ListItem sx={{ px: 0 }}>
            <ListItemIcon>
              <Phone />
            </ListItemIcon>
            <ListItemText
              primary="SMS уведомления"
              secondary="Получать SMS о статусе доставки"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.smsNotifications}
                  onChange={handleSettingChange('smsNotifications')}
                />
              }
              label=""
            />
          </ListItem>
          
          <ListItem sx={{ px: 0 }}>
            <ListItemIcon>
              <DarkMode />
            </ListItemIcon>
            <ListItemText
              primary="Темная тема"
              secondary="Использовать темную тему интерфейса"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.darkMode}
                  onChange={handleSettingChange('darkMode')}
                />
              }
              label=""
            />
          </ListItem>
          
          <ListItem sx={{ px: 0 }}>
            <ListItemIcon>
              <Schedule />
            </ListItemIcon>
            <ListItemText
              primary="Автозаказ"
              secondary="Автоматически заказывать избранные товары"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.autoReorder}
                  onChange={handleSettingChange('autoReorder')}
                />
              }
              label=""
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 4 }}>
        <MuiLink component={Link} href="/" color="inherit">
          Главная
        </MuiLink>
        <Typography color="primary">Профиль</Typography>
      </Breadcrumbs>

      {/* Header */}
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Мой профиль
      </Typography>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab icon={<Person />} label="Профиль" />
          <Tab icon={<History />} label="Заказы" />
          <Tab icon={<Settings />} label="Настройки" />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      <Box sx={{ mt: 3 }}>
        {tabValue === 0 && <ProfileInfo />}
        {tabValue === 1 && <OrderHistory />}
        {tabValue === 2 && <UserSettings />}
      </Box>

      {/* Change Password Dialog */}
      <Dialog 
        open={changePasswordDialog} 
        onClose={() => setChangePasswordDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Изменить пароль</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Текущий пароль"
              type={showPasswords.current ? 'text' : 'password'}
              value={passwordData.currentPassword}
              onChange={handlePasswordChange('currentPassword')}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => togglePasswordVisibility('current')}>
                    {showPasswords.current ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Новый пароль"
              type={showPasswords.new ? 'text' : 'password'}
              value={passwordData.newPassword}
              onChange={handlePasswordChange('newPassword')}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => togglePasswordVisibility('new')}>
                    {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Подтвердите новый пароль"
              type={showPasswords.confirm ? 'text' : 'password'}
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange('confirmPassword')}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => togglePasswordVisibility('confirm')}>
                    {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setChangePasswordDialog(false)}>
            Отмена
          </Button>
          <Button
            onClick={handleChangePassword}
            variant="contained"
            disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
          >
            Изменить пароль
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProfilePage;