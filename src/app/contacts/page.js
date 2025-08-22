import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Button } from '@mui/material';
import { Phone, Email } from '@mui/icons-material';

const ContactsPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom textAlign="center">
        Контакты
      </Typography>
      
      <Typography 
        variant="body1" 
        color="text.secondary" 
        textAlign="center" 
        sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}
      >
        Свяжитесь с нами любым удобным способом. Мы всегда готовы ответить на ваши вопросы 
        и помочь с выбором продукции.
      </Typography>

      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', textAlign: 'center' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ mb: 2 }}>
                <Phone color="primary" />
              </Box>
              <Typography variant="h6" gutterBottom>
                Телефон
              </Typography>
              <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>
                +7 (342) 212-34-56
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Звонки принимаются с 8:00 до 20:00
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', textAlign: 'center' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ mb: 2 }}>
                <Email color="primary" />
              </Box>
              <Typography variant="h6" gutterBottom>
                Email
              </Typography>
              <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>
                info@voda59.ru
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ответим в течение часа
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', textAlign: 'center' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Адрес
              </Typography>
              <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>
                г. Пермь, пос. Новые Ляды
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Производство и офис
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', textAlign: 'center' }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Режим работы
              </Typography>
              <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>
                Ежедневно: 8:00 - 20:00
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Прием заказов на следующий день
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Box sx={{ textAlign: 'center', mt: 6, p: 4, bgcolor: 'background.paper', borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Готовы сделать заказ?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Позвоните нам прямо сейчас или оформите заказ онлайн
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button 
            variant="contained" 
            size="large"
            href="tel:+73422123456"
          >
            Позвонить
          </Button>
          <Button 
            variant="outlined" 
            size="large"
            href="/products"
          >
            Выбрать товары
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ContactsPage;