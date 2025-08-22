import { Box } from '@mui/material';
import MuiProvider from "../styles/MuiProvider";
import ReduxProvider from '../providers/ReduxProvider';
import { ThemeProvider } from '../theme/ThemeProvider';
import InitializeApp from '../components/InitializeApp';

export const metadata = {
  title: {
    default: 'Новолядская Вода - Доставка чистой питьевой воды',
    template: '%s | Новолядская Вода'
  },
  description: 'Доставка качественной питьевой воды из экологически чистых источников Новолядских гор. Быстрая доставка по Москве и области.',
  keywords: 'вода, доставка воды, питьевая вода, бутилированная вода, новолядская вода, артезианская вода',
  authors: [{ name: 'Новолядская Вода' }],
  creator: 'Новолядская Вода',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://voda59.ru',
    siteName: 'Новолядская Вода',
    title: 'Новолядская Вода - Доставка чистой питьевой воды',
    description: 'Доставка качественной питьевой воды из экологически чистых источников Новолядских гор.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Новолядская Вода',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Новолядская Вода - Доставка чистой питьевой воды',
    description: 'Доставка качественной питьевой воды из экологически чистых источников Новолядских гор.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ReduxProvider>
          <ThemeProvider>
            <MuiProvider>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '100vh',
                }}
              >
                <InitializeApp>
                  {children}
                </InitializeApp>
              </Box>
            </MuiProvider>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
