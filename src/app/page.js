'use client';
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Chip,
  useTheme,
  alpha,
  Paper,
} from '@mui/material';
import {
  LocalShipping,
  Verified,
  SupportAgent,
  Water,
  Opacity,
  Star,
  ThumbUp,
} from '@mui/icons-material';
import Link from 'next/link';
import { companyInfo, testimonials } from '../data/mockData';
import { 
  AnimatedWaterDrop, 
  FloatingBubbles, 
  WaterWave, 
  WaterEntranceAnimation 
} from '../components/animations/WaterAnimations';

const HomePage = () => {
  const theme = useTheme();
  // const products = useSelector(selectFilteredProducts);
  // const featuredProducts = products.filter(product => product.featured).slice(0, 3);
  const featuredProducts = []; // Временно пустой массив

  const HeroSection = () => (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${
          theme.palette.mode === 'dark'
            ? `${alpha(theme.palette.grey[900], 0.9)}, ${alpha(theme.palette.grey[800], 0.8)}`
            : `${alpha(theme.palette.primary.light, 0.1)}, ${alpha(theme.palette.primary.main, 0.05)}`
        })`,
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Floating bubbles background - reduced count for better performance */}
      <FloatingBubbles count={6} containerHeight={600} />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <WaterEntranceAnimation>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <WaterEntranceAnimation delay={200}>
                <Typography
                  variant="h2"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    lineHeight: 1.2,
                    mb: 3,
                  }}
                >
                  Ново-Лядовская
                </Typography>
                <Typography
                  variant="h3"
                  component="h2"
                  gutterBottom
                  sx={{
                    fontWeight: 'normal',
                    fontSize: { xs: '1.8rem', md: '2.5rem' },
                    lineHeight: 1.2,
                    mb: 3,
                  }}
                >
                  артезианская вода
                </Typography>
              </WaterEntranceAnimation>
              
              <WaterEntranceAnimation delay={400}>
                <Typography
                  variant="h5"
                  color="text.secondary"
                  paragraph
                  sx={{ mb: 4, fontSize: { xs: '1.25rem', md: '1.5rem' } }}
                >
                  Первозданный природный вкус
                </Typography>
              </WaterEntranceAnimation>
              
              <WaterEntranceAnimation delay={600}>
                <Typography variant="body1" paragraph sx={{ mb: 3, fontSize: '1.1rem' }}>
                  {companyInfo.description}
                </Typography>
                <Typography variant="body1" paragraph sx={{ mb: 4, fontSize: '1rem', fontStyle: 'italic' }}>
                  {companyInfo.awards}
                </Typography>
              </WaterEntranceAnimation>
              
              <WaterEntranceAnimation delay={800}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    size="large"
                    component={Link}
                    href="/products"
                    sx={{ px: 4, py: 1.5 }}
                  >
                    Выбрать воду
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    component={Link}
                    href="#about"
                    sx={{ px: 4, py: 1.5 }}
                  >
                    Узнать больше
                  </Button>
                </Box>
              </WaterEntranceAnimation>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <WaterEntranceAnimation delay={1000}>
                <Box
                  sx={{
                    textAlign: 'center',
                    position: 'relative',
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 250, md: 400 },
                      height: { xs: 250, md: 400 },
                      mx: 'auto',
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: theme.shadows[10],
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <Water sx={{ fontSize: { xs: 100, md: 150 }, color: 'white', zIndex: 2 }} />
                    
                    {/* Water wave animation */}
                    <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 1 }}>
                      <WaterWave height={100} color="rgba(255, 255, 255, 0.3)" />
                    </Box>
                    
                    {/* Animated water drops around the circle */}
                    <Box sx={{ position: 'absolute', top: '10%', left: '10%' }}>
                      <AnimatedWaterDrop size={30} delay={500} color="rgba(255, 255, 255, 0.8)" />
                    </Box>
                    <Box sx={{ position: 'absolute', top: '20%', right: '15%' }}>
                      <AnimatedWaterDrop size={25} delay={1200} color="rgba(255, 255, 255, 0.7)" />
                    </Box>
                    <Box sx={{ position: 'absolute', bottom: '25%', left: '5%' }}>
                      <AnimatedWaterDrop size={35} delay={800} color="rgba(255, 255, 255, 0.9)" />
                    </Box>
                  </Box>
                </Box>
              </WaterEntranceAnimation>
            </Grid>
          </Grid>
        </WaterEntranceAnimation>
      </Container>
    </Box>
  );

  const FeaturesSection = () => (
    <Box id="about" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          Наши преимущества
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}
        >
          Почему тысячи клиентов выбирают именно нашу воду
        </Typography>
        
        <Grid container spacing={4}>
          {companyInfo.features.map((feature, index) => {
            const icons = [<Opacity />, <Verified />, <LocalShipping />, <SupportAgent />];
            return (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: theme.shadows[8],
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box
                      sx={{
                        mb: 3,
                        color: theme.palette.primary.main,
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      {React.cloneElement(icons[index], { sx: { fontSize: 60 } })}
                    </Box>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );

  const LocationSection = () => (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <WaterEntranceAnimation>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h2" gutterBottom>
                Месторождение в Новых Лядах
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', mb: 3 }}>
                {companyInfo.location}
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1rem', mb: 3 }}>
                Мать природа столетиями создавала это уникальное месторождение живой воды, что дало неповторимый и удивительный вкус воды.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Chip
                  label="Глубина: 74 метра"
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  label="Три пояса защиты"
                  color="secondary"
                  variant="outlined"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  textAlign: 'center',
                }}
              >
                <Box
                  sx={{
                    width: { xs: 300, md: 400 },
                    height: { xs: 200, md: 250 },
                    mx: 'auto',
                    background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: theme.shadows[4],
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <Typography variant="h6" sx={{ textAlign: 'center', p: 2 }}>
                    Уникальный набор микро и макро элементов:
                    <br />
                    серебро, йод, селен, кальций, магний
                  </Typography>
                  
                  {/* Add some floating elements for decoration */}
                  <Box sx={{ position: 'absolute', top: '10%', left: '10%' }}>
                    <AnimatedWaterDrop size={20} delay={1000} color={theme.palette.primary.main} />
                  </Box>
                  <Box sx={{ position: 'absolute', bottom: '15%', right: '15%' }}>
                    <AnimatedWaterDrop size={25} delay={1500} color={theme.palette.secondary.main} />
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </WaterEntranceAnimation>
      </Container>
    </Box>
  );

  const ProductsSection = () => (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          Популярные товары
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          Самые востребованные виды нашей воды
        </Typography>
        
        <Grid container spacing={4}>
          {featuredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[6],
                  },
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    height: 200,
                    background: `linear-gradient(45deg, ${alpha(theme.palette.primary.light, 0.3)}, ${alpha(theme.palette.secondary.light, 0.3)})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Water sx={{ fontSize: 80, color: theme.palette.primary.main }} />
                </CardMedia>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={product.category}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, flexGrow: 1 }}
                  >
                    {product.description.length > 100
                      ? `${product.description.substring(0, 100)}...`
                      : product.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rating value={product.rating} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({product.reviews})
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" color="primary">
                      {product.price} ₽
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      component={Link}
                      href={`/products/${product.id}`}
                    >
                      Подробнее
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            variant="outlined"
            size="large"
            component={Link}
            href="/products"
            sx={{ px: 4 }}
          >
            Посмотреть все товары
          </Button>
        </Box>
      </Container>
    </Box>
  );

  const TestimonialsSection = () => (
    <Box sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          Отзывы клиентов
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          Что говорят наши довольные клиенты
        </Typography>
        
        <Grid container spacing={4}>
          {testimonials.map((testimonial) => (
            <Grid item xs={12} md={4} key={testimonial.id}>
              <Paper
                elevation={2}
                sx={{
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: theme.shadows[6],
                  },
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <Rating value={testimonial.rating} readOnly />
                </Box>
                <Typography
                  variant="body1"
                  sx={{ flexGrow: 1, mb: 3, fontStyle: 'italic' }}
                >
                  "{testimonial.comment}"
                </Typography>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {testimonial.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(testimonial.date).toLocaleDateString('ru-RU')}
                    {testimonial.verified && (
                      <Chip
                        label="Проверено"
                        size="small"
                        color="success"
                        variant="outlined"
                        sx={{ ml: 1 }}
                      />
                    )}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );

  const StatsSection = () => (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <WaterEntranceAnimation>
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ mb: 6 }}>
            Ключевые факты
          </Typography>
          <Grid container spacing={4} textAlign="center">
            <Grid item xs={6} md={3}>
              <Typography variant="h3" component="div" gutterBottom fontWeight="bold">
                74м
              </Typography>
              <Typography variant="body1">Глубина скважины</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="h3" component="div" gutterBottom fontWeight="bold">
                29
              </Typography>
              <Typography variant="body1">Международных медалей</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="h3" component="div" gutterBottom fontWeight="bold">
                3
              </Typography>
              <Typography variant="body1">Пояса защиты</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="h3" component="div" gutterBottom fontWeight="bold">
                30м
              </Typography>
              <Typography variant="body1">Глиняный водозащитный слой</Typography>
            </Grid>
          </Grid>
        </WaterEntranceAnimation>
      </Container>
    </Box>
  );

  const CTASection = () => (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Box textAlign="center">
          <Typography variant="h3" component="h2" gutterBottom>
            Готовы заказать?
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 2, fontSize: '1.1rem' }}
          >
            Закажите качественную воду прямо сейчас
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 4, fontSize: '1rem' }}
          >
            Доставка по Пермскому краю с 8:00 до 20:00
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              href="/products"
              sx={{ px: 4, py: 1.5 }}
            >
              Заказать воду
            </Button>
            <Button
              variant="outlined"
              size="large"
              href="tel:+73422123456"
              sx={{ px: 4, py: 1.5 }}
            >
              Позвонить нам
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <LocationSection />
      <StatsSection />
      <ProductsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
};

export default HomePage;
