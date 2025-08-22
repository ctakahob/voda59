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
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Paper,
  Stepper,
  Step,
  StepLabel,
  useTheme,
  alpha,
  Breadcrumbs,
  Link as MuiLink,
} from '@mui/material';
import {
  ShoppingCart,
  Delete,
  Add,
  Remove,
  LocalShipping,
  Payment,
  CheckCircle,
  WaterDrop,
  ArrowBack,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartItems,
  selectCartTotalItems,
  selectCartTotalPrice,
  selectShippingCost,
  selectFreeShippingThreshold,
  selectIsEligibleForFreeShipping,
  selectFinalTotal,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from '../../store/slices/cartSlice';
import Link from 'next/link';

const CartPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  
  const items = useSelector(selectCartItems);
  const totalItems = useSelector(selectCartTotalItems);
  const totalPrice = useSelector(selectCartTotalPrice);
  const shippingCost = useSelector(selectShippingCost);
  const freeShippingThreshold = useSelector(selectFreeShippingThreshold);
  const isEligibleForFreeShipping = useSelector(selectIsEligibleForFreeShipping);
  const finalTotal = useSelector(selectFinalTotal);

  const [activeStep, setActiveStep] = useState(0);
  const [deliveryMethod, setDeliveryMethod] = useState('courier');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    comment: '',
  });

  const steps = ['Корзина', 'Доставка', 'Оплата'];

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleInputChange = (field) => (event) => {
    setCustomerInfo({
      ...customerInfo,
      [field]: event.target.value,
    });
  };

  const handleNextStep = () => {
    setActiveStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevStep = () => {
    setActiveStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmitOrder = () => {
    // TODO: Implement order submission
    console.log('Order submitted:', {
      items,
      customerInfo,
      deliveryMethod,
      paymentMethod,
      totalPrice,
      finalTotal,
    });
    alert('Заказ успешно оформлен! Мы свяжемся с вами в ближайшее время.');
    dispatch(clearCart());
  };

  if (items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Breadcrumbs sx={{ mb: 4 }}>
          <MuiLink component={Link} href="/" color="inherit">
            Главная
          </MuiLink>
          <Typography color="primary">Корзина</Typography>
        </Breadcrumbs>

        <Paper sx={{ p: 6, textAlign: 'center' }}>
          <ShoppingCart sx={{ fontSize: 100, color: 'text.disabled', mb: 3 }} />
          <Typography variant="h4" gutterBottom>
            Корзина пуста
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Добавьте товары из каталога, чтобы совершить покупку
          </Typography>
          <Button
            component={Link}
            href="/products"
            variant="contained"
            size="large"
            startIcon={<ArrowBack />}
          >
            Перейти к каталогу
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 4 }}>
        <MuiLink component={Link} href="/" color="inherit">
          Главная
        </MuiLink>
        <Typography color="primary">Корзина</Typography>
      </Breadcrumbs>

      {/* Header */}
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Оформление заказа
      </Typography>

      {/* Progress Stepper */}
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Grid container spacing={4}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          {/* Step 0: Cart Items */}
          {activeStep === 0 && (
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Товары в корзине ({totalItems})
                  </Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={handleClearCart}
                    startIcon={<Delete />}
                  >
                    Очистить корзину
                  </Button>
                </Box>

                <List>
                  {items.map((item, index) => (
                    <React.Fragment key={item.id}>
                      <ListItem sx={{ px: 0, py: 2 }}>
                        <ListItemAvatar>
                          <Avatar
                            sx={{
                              bgcolor: alpha(theme.palette.primary.main, 0.1),
                              width: 60,
                              height: 60,
                            }}
                          >
                            <WaterDrop sx={{ color: theme.palette.primary.main }} />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                              {item.name}
                            </Typography>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                {item.volume} • {item.category}
                              </Typography>
                              <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', mt: 1 }}>
                                {item.price} ₽ за шт.
                              </Typography>
                            </Box>
                          }
                          sx={{ mr: 2 }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleDecreaseQuantity(item.id)}
                            sx={{ border: 1, borderColor: 'divider' }}
                          >
                            <Remove fontSize="small" />
                          </IconButton>
                          <Typography variant="h6" sx={{ mx: 2, minWidth: 30, textAlign: 'center' }}>
                            {item.quantity}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleIncreaseQuantity(item.id)}
                            sx={{ border: 1, borderColor: 'divider' }}
                          >
                            <Add fontSize="small" />
                          </IconButton>
                        </Box>
                        <Box sx={{ textAlign: 'right', mr: 2 }}>
                          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {item.price * item.quantity} ₽
                          </Typography>
                        </Box>
                        <IconButton
                          onClick={() => handleRemoveItem(item.id)}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </ListItem>
                      {index < items.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                  <Button
                    component={Link}
                    href="/products"
                    variant="outlined"
                    startIcon={<ArrowBack />}
                  >
                    Продолжить покупки
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleNextStep}
                    size="large"
                  >
                    Оформить заказ
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Step 1: Delivery Information */}
          {activeStep === 1 && (
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Информация о доставке
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Имя *"
                      value={customerInfo.name}
                      onChange={handleInputChange('name')}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Телефон *"
                      value={customerInfo.phone}
                      onChange={handleInputChange('phone')}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={customerInfo.email}
                      onChange={handleInputChange('email')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Адрес доставки *"
                      multiline
                      rows={2}
                      value={customerInfo.address}
                      onChange={handleInputChange('address')}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Комментарий к заказу"
                      multiline
                      rows={3}
                      value={customerInfo.comment}
                      onChange={handleInputChange('comment')}
                      placeholder="Дополнительные пожелания, время доставки, этаж, домофон..."
                    />
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3 }}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Способ доставки</FormLabel>
                    <RadioGroup
                      value={deliveryMethod}
                      onChange={(e) => setDeliveryMethod(e.target.value)}
                    >
                      <FormControlLabel
                        value="courier"
                        control={<Radio />}
                        label={
                          <Box>
                            <Typography variant="body1">Курьерская доставка</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Доставка в течение 2-4 часов по Москве
                            </Typography>
                          </Box>
                        }
                      />
                      <FormControlLabel
                        value="pickup"
                        control={<Radio />}
                        label={
                          <Box>
                            <Typography variant="body1">Самовывоз</Typography>
                            <Typography variant="body2" color="text.secondary">
                              Бесплатно. Забрать по адресу: ул. Новолядская, д. 15
                            </Typography>
                          </Box>
                        }
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                  <Button
                    variant="outlined"
                    onClick={handlePrevStep}
                  >
                    Назад
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleNextStep}
                    disabled={!customerInfo.name || !customerInfo.phone || !customerInfo.address}
                  >
                    Далее
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Payment */}
          {activeStep === 2 && (
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Способ оплаты
                </Typography>

                <FormControl component="fieldset" sx={{ mt: 2 }}>
                  <RadioGroup
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <FormControlLabel
                      value="card"
                      control={<Radio />}
                      label={
                        <Box>
                          <Typography variant="body1">Банковской картой</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Visa, MasterCard, МИР
                          </Typography>
                        </Box>
                      }
                    />
                    <FormControlLabel
                      value="cash"
                      control={<Radio />}
                      label={
                        <Box>
                          <Typography variant="body1">Наличными курьеру</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Оплата при получении
                          </Typography>
                        </Box>
                      }
                    />
                    <FormControlLabel
                      value="transfer"
                      control={<Radio />}
                      label={
                        <Box>
                          <Typography variant="body1">Банковский перевод</Typography>
                          <Typography variant="body2" color="text.secondary">
                            Для юридических лиц
                          </Typography>
                        </Box>
                      }
                    />
                  </RadioGroup>
                </FormControl>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                  <Button
                    variant="outlined"
                    onClick={handlePrevStep}
                  >
                    Назад
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleSubmitOrder}
                    size="large"
                    startIcon={<CheckCircle />}
                  >
                    Подтвердить заказ
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>

        {/* Order Summary Sidebar */}
        <Grid item xs={12} md={4}>
          <Card sx={{ position: 'sticky', top: 20 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Сводка заказа
              </Typography>

              {/* Shipping Info */}
              <Paper 
                sx={{ 
                  p: 2, 
                  mb: 2, 
                  bgcolor: isEligibleForFreeShipping 
                    ? alpha(theme.palette.success.main, 0.1) 
                    : alpha(theme.palette.info.main, 0.1)
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocalShipping 
                    sx={{ 
                      color: isEligibleForFreeShipping ? 'success.main' : 'info.main',
                      mr: 1 
                    }} 
                  />
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    {isEligibleForFreeShipping ? 'Бесплатная доставка!' : 'Доставка'}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {isEligibleForFreeShipping
                    ? `Экономия ${shippingCost} ₽`
                    : `До бесплатной доставки: ${freeShippingThreshold - totalPrice} ₽`
                  }
                </Typography>
              </Paper>

              {/* Price Breakdown */}
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Товары ({totalItems}):</Typography>
                  <Typography variant="body2">{totalPrice} ₽</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Доставка:</Typography>
                  <Typography variant="body2">
                    {deliveryMethod === 'pickup' ? 'Бесплатно' : 
                     isEligibleForFreeShipping ? 'Бесплатно' : `${shippingCost} ₽`}
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Итого:
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }} color="primary">
                    {deliveryMethod === 'pickup' ? totalPrice : finalTotal} ₽
                  </Typography>
                </Box>
              </Box>

              {/* Contact Info */}
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>
                Нужна помощь?
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Телефон: +7 (495) 123-45-67
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: info@voda59.ru
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;