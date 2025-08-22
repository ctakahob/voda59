'use client';
import React, { useState, useEffect } from 'react';
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
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Paper,
  Divider,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Search,
  FilterList,
  ShoppingCart,
  WaterDrop,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { waterProducts, categories } from '../../data/mockData';
import { addToCart, openCart } from '../../store/slices/cartSlice';
import { AnimatedWaterDrop, WaterEntranceAnimation } from '../../components/animations/WaterAnimations';

const ProductsPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [products, setProducts] = useState(waterProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState('all');

  // Filter and sort products
  useEffect(() => {
    let filteredProducts = [...waterProducts];

    // Filter by search term
    if (searchTerm) {
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    if (priceRange !== 'all') {
      switch (priceRange) {
        case 'low':
          filteredProducts = filteredProducts.filter(product => product.price <= 60);
          break;
        case 'medium':
          filteredProducts = filteredProducts.filter(product => product.price > 60 && product.price <= 120);
          break;
        case 'high':
          filteredProducts = filteredProducts.filter(product => product.price > 120);
          break;
      }
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
      default:
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    setProducts(filteredProducts);
  }, [searchTerm, selectedCategory, sortBy, priceRange]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(openCart());
  };

  const ProductCard = ({ product }) => (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
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
          height: 200,
          background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.primary.main, 0.3)})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <AnimatedWaterDrop size={60} color={theme.palette.primary.main} />
        {product.featured && (
          <Chip
            label="Хит продаж"
            color="secondary"
            size="small"
            sx={{ position: 'absolute', top: 8, right: 8 }}
          />
        )}
      </CardMedia>
      
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          {product.name}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
          {product.description.length > 100 
            ? `${product.description.substring(0, 100)}...` 
            : product.description}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={product.rating} readOnly size="small" precision={0.1} />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({product.reviews})
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Chip 
            label={product.category} 
            size="small" 
            variant="outlined" 
            sx={{ mr: 1 }}
          />
          <Chip 
            label={product.volume} 
            size="small" 
            color="primary" 
            variant="outlined"
          />
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
            {product.price} ₽
          </Typography>
          
          <Box>
            <Button
              component={Link}
              href={`/products/${product.id}`}
              variant="outlined"
              size="small"
              sx={{ mr: 1 }}
            >
              Подробнее
            </Button>
            <Button
              variant="contained"
              size="small"
              startIcon={<ShoppingCart />}
              onClick={() => handleAddToCart(product)}
              disabled={!product.inStock}
            >
              {product.inStock ? 'В корзину' : 'Нет в наличии'}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <WaterEntranceAnimation>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <WaterEntranceAnimation delay={200}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Наша продукция
            </Typography>
            
            <Typography 
              variant="body1" 
              color="text.secondary" 
              sx={{ maxWidth: 800, mx: 'auto' }}
            >
              Высококачественная питьевая вода из экологически чистых источников Новолядских гор. 
              Вся продукция сертифицирована и соответствует высшим стандартам качества.
            </Typography>
          </Box>
        </WaterEntranceAnimation>

      {/* Filters */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <FilterList sx={{ mr: 1 }} />
          Фильтры и поиск
        </Typography>
        
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Поиск продукции"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />,
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Категория</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="Категория"
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Цена</InputLabel>
              <Select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                label="Цена"
              >
                <MenuItem value="all">Все цены</MenuItem>
                <MenuItem value="low">До 60 ₽</MenuItem>
                <MenuItem value="medium">60-120 ₽</MenuItem>
                <MenuItem value="high">Свыше 120 ₽</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Сортировка</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                label="Сортировка"
              >
                <MenuItem value="name">По названию</MenuItem>
                <MenuItem value="price-low">Цена: по возрастанию</MenuItem>
                <MenuItem value="price-high">Цена: по убыванию</MenuItem>
                <MenuItem value="rating">По рейтингу</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Results */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">
          Найдено товаров: {products.length}
        </Typography>
      </Box>

      {/* Products Grid */}
      {products.length > 0 ? (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper sx={{ p: 6, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Товары не найдены
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Попробуйте изменить параметры поиска или фильтры
          </Typography>
        </Paper>
      )}

      {/* Call to Action */}
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Divider sx={{ mb: 4 }} />
        <Typography variant="h5" gutterBottom>
          Не нашли нужный товар?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Свяжитесь с нами, и мы поможем подобрать идеальную воду для ваших потребностей
        </Typography>
        <Button
          component={Link}
          href="/contacts"
          variant="contained"
          size="large"
          sx={{ mr: 2 }}
        >
          Связаться с нами
        </Button>
        <Button
          variant="outlined"
          size="large"
        >
          Получить консультацию
        </Button>
      </Box>
    </Container>
    </WaterEntranceAnimation>
  );
};

export default ProductsPage;