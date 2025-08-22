'use client';
import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  Schedule,
  Facebook,
  Instagram,
  Telegram,
} from '@mui/icons-material';
import NextLink from 'next/link';

const Footer = () => {
  const theme = useTheme();

  const footerLinks = [
    {
      title: 'Компания',
      links: [
        { text: 'О нас', href: '/about' },
        { text: 'Наши преимущества', href: '/advantages' },
        { text: 'Сертификаты', href: '/certificates' },
        { text: 'Новости', href: '/news' },
      ]
    },
    {
      title: 'Продукция',
      links: [
        { text: 'Питьевая вода', href: '/products?category=питьевая' },
        { text: 'Детская вода', href: '/products?category=детская' },
        { text: 'Спортивная вода', href: '/products?category=спортивная' },
        { text: 'Бутыли 19л', href: '/products?category=бутыль' },
      ]
    },
    {
      title: 'Сервис',
      links: [
        { text: 'Доставка', href: '/delivery' },
        { text: 'Оплата', href: '/payment' },
        { text: 'Возврат и обмен', href: '/returns' },
        { text: 'Часто задаваемые вопросы', href: '/faq' },
      ]
    },
  ];

  const contactInfo = [
    {
      icon: <Phone />,
      text: '+7 (495) 123-45-67',
      href: 'tel:+74951234567'
    },
    {
      icon: <Email />,
      text: 'info@voda59.ru',
      href: 'mailto:info@voda59.ru'
    },
    {
      icon: <LocationOn />,
      text: 'г. Москва, ул. Новолядская, д. 15',
      href: '#'
    },
    {
      icon: <Schedule />,
      text: 'Пн-Вс: 8:00 - 22:00',
      href: '#'
    },
  ];

  const socialLinks = [
    { icon: <Facebook />, href: '#', title: 'Facebook' },
    { icon: <Instagram />, href: '#', title: 'Instagram' },
    { icon: <Telegram />, href: '#', title: 'Telegram' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
        mt: 'auto',
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Информация о компании */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Новолядская Вода
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Ведущий производитель качественной питьевой воды в регионе. 
              Мы добываем воду из экологически чистых артезианских источников 
              Новолядских гор с 2010 года.
            </Typography>
            
            {/* Социальные сети */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Мы в социальных сетях:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {socialLinks.map((social, index) => (
                  <IconButton
                    key={index}
                    component="a"
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                    size="small"
                    title={social.title}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Ссылки */}
          {footerLinks.map((section, index) => (
            <Grid item xs={12} sm={6} md={2.67} key={index}>
              <Typography variant="h6" gutterBottom sx={{ fontSize: '1.1rem', fontWeight: 600 }}>
                {section.title}
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                {section.links.map((link, linkIndex) => (
                  <Box component="li" key={linkIndex} sx={{ mb: 1 }}>
                    <Link
                      component={NextLink}
                      href={link.href}
                      color="text.secondary"
                      sx={{
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        '&:hover': {
                          color: 'primary.main',
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      {link.text}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Контактная информация */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: '1.1rem', fontWeight: 600 }}>
              Контактная информация
            </Typography>
            <Grid container spacing={2}>
              {contactInfo.map((contact, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ color: 'primary.main' }}>
                      {contact.icon}
                    </Box>
                    <Link
                      href={contact.href}
                      color="text.secondary"
                      sx={{
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        '&:hover': {
                          color: 'primary.main'
                        }
                      }}
                    >
                      {contact.text}
                    </Link>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: '1.1rem', fontWeight: 600 }}>
              Быстрый заказ
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Звоните нам, и мы доставим воду в течение 2 часов!
            </Typography>
            <Link
              href="tel:+74951234567"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                color: 'primary.main',
                textDecoration: 'none',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              <Phone />
              +7 (495) 123-45-67
            </Link>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Копирайт */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © 2024 Новолядская Вода. Все права защищены.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Link
              component={NextLink}
              href="/privacy"
              color="text.secondary"
              sx={{
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': {
                  color: 'primary.main',
                  textDecoration: 'underline'
                }
              }}
            >
              Политика конфиденциальности
            </Link>
            <Link
              component={NextLink}
              href="/terms"
              color="text.secondary"
              sx={{
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': {
                  color: 'primary.main',
                  textDecoration: 'underline'
                }
              }}
            >
              Условия использования
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;