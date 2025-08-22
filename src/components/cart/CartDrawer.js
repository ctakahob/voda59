'use client';
import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  Divider,
  Button,
  Badge,
  useTheme,
  alpha,
  Paper,
} from '@mui/material';
import {
  Close,
  ShoppingCart,
  Delete,
  Add,
  Remove,
  LocalShipping,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartItems,
  selectCartTotalItems,
  selectCartTotalPrice,
  selectCartIsOpen,
  selectShippingCost,
  selectFreeShippingThreshold,
  selectIsEligibleForFreeShipping,
  selectFinalTotal,
  closeCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from '../../store/slices/cartSlice';
import Link from 'next/link';

const CartDrawer = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  
  const items = useSelector(selectCartItems);
  const totalItems = useSelector(selectCartTotalItems);
  const totalPrice = useSelector(selectCartTotalPrice);
  const isOpen = useSelector(selectCartIsOpen);
  const shippingCost = useSelector(selectShippingCost);
  const freeShippingThreshold = useSelector(selectFreeShippingThreshold);
  const isEligibleForFreeShipping = useSelector(selectIsEligibleForFreeShipping);
  const finalTotal = useSelector(selectFinalTotal);

  const handleClose = () => {
    dispatch(closeCart());
  };

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

  const CartItem = ({ item }) => (
    <ListItem
      sx={{
        flexDirection: 'column',
        alignItems: 'stretch',
        py: 2,
        px: 0,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: 1,
            background: alpha(theme.palette.primary.main, 0.1),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mr: 2,
          }}
        >
          <ShoppingCart sx={{ color: theme.palette.primary.main, fontSize: 24 }} />
        </Box>
        
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {item.volume} • {item.category}
          </Typography>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
            {item.price} ₽
          </Typography>
        </Box>
        
        <IconButton
          size="small"
          onClick={() => handleRemoveItem(item.id)}
          sx={{ color: 'text.secondary' }}
        >
          <Delete fontSize="small" />
        </IconButton>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            size="small"
            onClick={() => handleDecreaseQuantity(item.id)}
            sx={{ border: 1, borderColor: 'divider', mr: 1 }}
          >
            <Remove fontSize="small" />
          </IconButton>
          <Typography variant="body1" sx={{ mx: 2, minWidth: 20, textAlign: 'center' }}>
            {item.quantity}
          </Typography>
          <IconButton
            size="small"
            onClick={() => handleIncreaseQuantity(item.id)}
            sx={{ border: 1, borderColor: 'divider', ml: 1 }}
          >
            <Add fontSize="small" />
          </IconButton>
        </Box>
        
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          {item.price * item.quantity} ₽
        </Typography>
      </Box>
    </ListItem>
  );

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={handleClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: 400 },
          maxWidth: '100vw',
        },
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Корзина
              {totalItems > 0 && (
                <Badge badgeContent={totalItems} color="primary" sx={{ ml: 1 }}>
                  <ShoppingCart />
                </Badge>
              )}
            </Typography>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
        </Box>

        {/* Content */}
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          {items.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <ShoppingCart 
                sx={{ 
                  fontSize: 80, 
                  color: 'text.disabled', 
                  mb: 2 
                }} 
              />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Корзина пуста
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Добавьте товары из каталога, чтобы совершить покупку
              </Typography>
              <Button
                component={Link}
                href="/products"
                variant="contained"
                onClick={handleClose}
              >
                Перейти к каталогу
              </Button>
            </Box>
          ) : (
            <Box sx={{ p: 2 }}>
              <List sx={{ p: 0 }}>
                {items.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <CartItem item={item} />
                    {index < items.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
              
              {/* Clear Cart */}
              <Box sx={{ mt: 2, textAlign: 'center' }}>
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
            </Box>
          )}
        </Box>

        {/* Summary and Checkout */}
        {items.length > 0 && (
          <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
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
                  ? `Вы получили бесплатную доставку при заказе от ${freeShippingThreshold} ₽`
                  : `Добавьте товаров на ${freeShippingThreshold - totalPrice} ₽ для бесплатной доставки`
                }
              </Typography>
            </Paper>

            {/* Order Summary */}
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Товары ({totalItems}):</Typography>
                <Typography variant="body2">{totalPrice} ₽</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Доставка:</Typography>
                <Typography variant="body2">
                  {isEligibleForFreeShipping ? 'Бесплатно' : `${shippingCost} ₽`}
                </Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Итого:
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }} color="primary">
                  {finalTotal} ₽
                </Typography>
              </Box>
            </Box>

            {/* Checkout Buttons */}
            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{ mb: 1 }}
              component={Link}
              href="/cart"
              onClick={handleClose}
            >
              Перейти к оформлению
            </Button>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              component={Link}
              href="/products"
              onClick={handleClose}
            >
              Продолжить покупки
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default CartDrawer;