import { createTheme } from '@mui/material/styles';

// Общие настройки для обеих тем
const commonSettings = {
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.6,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.6,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '10px 24px',
          fontSize: '1rem',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
};

// Светлая тема с голубыми тонами
export const lightTheme = createTheme({
  ...commonSettings,
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Основной голубой
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#03dac6', // Бирюзовый акцент
      light: '#52ffef',
      dark: '#00a896',
      contrastText: '#000000',
    },
    background: {
      default: '#f5f9ff', // Очень светло-голубой фон
      paper: '#ffffff',
    },
    text: {
      primary: '#1a237e', // Темно-синий для основного текста
      secondary: '#5c6bc0', // Средне-синий для вторичного текста
    },
    divider: '#e3f2fd',
    success: {
      main: '#4caf50',
    },
    warning: {
      main: '#ff9800',
    },
    error: {
      main: '#f44336',
    },
    info: {
      main: '#2196f3',
    },
  },
});

// Темная тема в черно-белых тонах
export const darkTheme = createTheme({
  ...commonSettings,
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff', // Белый как основной цвет
      light: '#ffffff',
      dark: '#e0e0e0',
      contrastText: '#000000',
    },
    secondary: {
      main: '#90a4ae', // Серый акцент
      light: '#b0bec5',
      dark: '#607d8b',
      contrastText: '#000000',
    },
    background: {
      default: '#121212', // Темный фон
      paper: '#1e1e1e', // Темный фон для карточек
    },
    text: {
      primary: '#ffffff', // Белый текст
      secondary: '#b0b0b0', // Светло-серый вторичный текст
    },
    divider: '#333333',
    success: {
      main: '#4caf50',
    },
    warning: {
      main: '#ff9800',
    },
    error: {
      main: '#f44336',
    },
    info: {
      main: '#90caf9',
    },
  },
});

export default { lightTheme, darkTheme };