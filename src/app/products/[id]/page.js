'use client';
import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Rating,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Breadcrumbs,
  Link as MuiLink,
  useTheme,
  alpha,
} from '@mui/material';
import {
  ShoppingCart,
  CheckCircle,
  WaterDrop,
  LocalShipping,
  VerifiedUser,
  Star,
  ArrowBack,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { waterProducts } from '../../../data/mockData';
import { addToCart, openCart } from '../../../store/slices/cartSlice';

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const productId = parseInt(params.id);
  const product = waterProducts.find(p => p.id === productId);
  
  if (!product) {
    return {
      title: 'Товар не найден | Новолядская Вода',
      description: 'Запрашиваемый товар не найден в каталоге Новолядской Воды.',
    };
  }

  return {
    title: `${product.name} | Новолядская Вода`,
    description: `${product.description} Купить ${product.name} с доставкой по Москве. Цена: ${product.price} ₽. ${product.volume}. Рейтинг: ${product.rating}/5.`,
    keywords: `${product.name}, ${product.category}, питьевая вода, доставка воды, ${product.volume}, Новолядская вода`,
    openGraph: {
      title: `${product.name} | Новолядская Вода`,
      description: product.description,
      type: 'product',
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
}

// Generate static paths for all products
export async function generateStaticParams() {
  return waterProducts.map((product) => ({
    id: product.id.toString(),
  }));
}

const ProductDetailPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const params = useParams();
  const productId = parseInt(params.id);
  
  const product = waterProducts.find(p => p.id === productId);

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper sx={{ p: 6, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Товар не найден
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            К сожалению, запрашиваемый товар не существует или был удален
          </Typography>
          <Button
            component={Link}
            href="/products"
            variant="contained"
            startIcon={<ArrowBack />}
          >
            Вернуться к каталогу
          </Button>
        </Paper>
      </Container>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    dispatch(openCart());
  };

  const relatedProducts = waterProducts
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 4 }}>
        <MuiLink component={Link} href="/" color="inherit">
          Главная
        </MuiLink>
        <MuiLink component={Link} href="/products" color="inherit">
          Продукция
        </MuiLink>
        <Typography color="primary">{product.name}</Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid item xs={12} md={5}>
          <Card sx={{ mb: 2 }}>
            <CardMedia
              component="div"
              sx={{
                height: 400,
                background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.primary.main, 0.3)})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <WaterDrop sx={{ fontSize: 120, color: theme.palette.primary.main, opacity: 0.7 }} />
              {product.featured && (
                <Chip
                  label="Хит продаж"
                  color="secondary"
                  sx={{ position: 'absolute', top: 16, right: 16 }}
                />
              )}
            </CardMedia>
          </Card>
          
          {/* Additional Images */}
          {product.images && product.images.length > 1 && (
            <Grid container spacing={1}>
              {product.images.slice(1, 4).map((image, index) => (
                <Grid item xs={4} key={index}>
                  <Card>
                    <CardMedia
                      component="div"
                      sx={{
                        height: 80,
                        background: alpha(theme.palette.primary.main, 0.1),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <WaterDrop sx={{ fontSize: 24, color: theme.palette.primary.main, opacity: 0.5 }} />
                    </CardMedia>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>

        {/* Product Info */}
        <Grid item xs={12} md={7}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              {product.name}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={product.rating} readOnly precision={0.1} />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {product.rating} ({product.reviews} отзывов)
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Chip 
                label={product.category} 
                variant="outlined" 
                sx={{ mr: 1 }}
              />
              <Chip 
                label={product.volume} 
                color="primary" 
                variant="outlined"
              />
            </Box>

            <Typography variant="h3" color="primary" sx={{ fontWeight: 'bold', mb: 3 }}>
              {product.price} ₽
            </Typography>

            <Typography variant="body1" paragraph sx={{ mb: 3, lineHeight: 1.7 }}>
              {product.description}
            </Typography>

            {/* Add to Cart */}
            <Box sx={{ mb: 4 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
                disabled={!product.inStock}
                sx={{ mr: 2, py: 1.5, px: 4 }}
              >
                {product.inStock ? 'Добавить в корзину' : 'Нет в наличии'}
              </Button>
              
              <Button
                variant="outlined"
                size="large"
                sx={{ py: 1.5, px: 4 }}
              >
                Быстрый заказ
              </Button>
            </Box>

            {/* Delivery Info */}
            <Paper sx={{ p: 2, mb: 3, bgcolor: alpha(theme.palette.success.main, 0.1) }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocalShipping sx={{ color: 'success.main', mr: 1 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Быстрая доставка
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Доставим в течение 2-4 часов по Москве и области
              </Typography>
            </Paper>

            {/* Quality Guarantee */}
            <Paper sx={{ p: 2, bgcolor: alpha(theme.palette.info.main, 0.1) }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <VerifiedUser sx={{ color: 'info.main', mr: 1 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Гарантия качества
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Вся продукция сертифицирована и соответствует ГОСТ стандартам
              </Typography>
            </Paper>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 6 }} />

      {/* Product Details */}
      <Grid container spacing={4}>
        {/* Specifications */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            Характеристики
          </Typography>
          <Paper sx={{ p: 3 }}>
            <List>
              {Object.entries(product.specifications).map(([key, value]) => (
                <ListItem key={key} sx={{ py: 1, px: 0 }}>
                  <ListItemText
                    primary={key === 'mineralContent' ? 'Минерализация' :
                           key === 'ph' ? 'pH уровень' :
                           key === 'hardness' ? 'Жесткость' :
                           key === 'source' ? 'Источник' :
                           key === 'carbonation' ? 'Газирование' :
                           key === 'electrolytes' ? 'Электролиты' :
                           key === 'packaging' ? 'Упаковка' :
                           key === 'minerals' ? 'Минералы' : key}
                    secondary={value}
                    primaryTypographyProps={{ fontWeight: 'medium' }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Benefits */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            Преимущества
          </Typography>
          <Paper sx={{ p: 3 }}>
            <List>
              {product.benefits.map((benefit, index) => (
                <ListItem key={index} sx={{ py: 1, px: 0 }}>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText primary={benefit} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <>
          <Divider sx={{ my: 6 }} />
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            Похожие товары
          </Typography>
          <Grid container spacing={3}>
            {relatedProducts.map((relatedProduct) => (
              <Grid item xs={12} sm={6} md={4} key={relatedProduct.id}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[8],
                    },
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      height: 150,
                      background: alpha(theme.palette.primary.main, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <WaterDrop sx={{ fontSize: 40, color: theme.palette.primary.main, opacity: 0.7 }} />
                  </CardMedia>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {relatedProduct.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {relatedProduct.description.substring(0, 80)}...
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6" color="primary">
                        {relatedProduct.price} ₽
                      </Typography>
                      <Button
                        component={Link}
                        href={`/products/${relatedProduct.id}`}
                        variant="outlined"
                        size="small"
                      >
                        Подробнее
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* Back to Catalog */}
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Button
          component={Link}
          href="/products"
          variant="outlined"
          size="large"
          startIcon={<ArrowBack />}
        >
          Вернуться к каталогу
        </Button>
      </Box>
    </Container>
  );
};

export default ProductDetailPage;