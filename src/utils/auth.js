import { v4 as uuidv4 } from 'uuid';

// Ключи для localStorage
const USERS_KEY = 'voda59_users';
const CURRENT_USER_KEY = 'voda59_current_user';

// Утилиты для работы с localStorage
export const authUtils = {
  // Получить всех пользователей
  getAllUsers: () => {
    try {
      const users = localStorage.getItem(USERS_KEY);
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error('Error loading users:', error);
      return [];
    }
  },

  // Сохранить пользователей
  saveUsers: (users) => {
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch (error) {
      console.error('Error saving users:', error);
    }
  },

  // Найти пользователя по email
  findUserByEmail: (email) => {
    const users = authUtils.getAllUsers();
    return users.find(user => user.email.toLowerCase() === email.toLowerCase());
  },

  // Создать нового пользователя
  createUser: (userData) => {
    const users = authUtils.getAllUsers();
    
    // Проверить, что пользователь не существует
    if (authUtils.findUserByEmail(userData.email)) {
      throw new Error('Пользователь с таким email уже существует');
    }

    const newUser = {
      id: uuidv4(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone || '',
      password: userData.password, // В реальном приложении пароль должен быть хэширован
      createdAt: new Date().toISOString(),
      orders: [],
      addresses: [],
      preferences: {
        notifications: true,
        newsletter: false,
      }
    };

    users.push(newUser);
    authUtils.saveUsers(users);
    
    return { ...newUser, password: undefined }; // Возвращаем без пароля
  },

  // Аутентифицировать пользователя
  authenticateUser: (email, password) => {
    const user = authUtils.findUserByEmail(email);
    
    if (!user) {
      throw new Error('Пользователь не найден');
    }

    if (user.password !== password) {
      throw new Error('Неверный пароль');
    }

    const userWithoutPassword = { ...user, password: undefined };
    authUtils.setCurrentUser(userWithoutPassword);
    
    return userWithoutPassword;
  },

  // Установить текущего пользователя
  setCurrentUser: (user) => {
    try {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving current user:', error);
    }
  },

  // Получить текущего пользователя
  getCurrentUser: () => {
    try {
      const user = localStorage.getItem(CURRENT_USER_KEY);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error loading current user:', error);
      return null;
    }
  },

  // Удалить текущего пользователя (выход)
  clearCurrentUser: () => {
    try {
      localStorage.removeItem(CURRENT_USER_KEY);
    } catch (error) {
      console.error('Error clearing current user:', error);
    }
  },

  // Обновить профиль пользователя
  updateUserProfile: (userId, updates) => {
    const users = authUtils.getAllUsers();
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
      throw new Error('Пользователь не найден');
    }

    users[userIndex] = { ...users[userIndex], ...updates };
    authUtils.saveUsers(users);

    const updatedUser = { ...users[userIndex], password: undefined };
    authUtils.setCurrentUser(updatedUser);
    
    return updatedUser;
  },

  // Изменить пароль
  changePassword: (userId, currentPassword, newPassword) => {
    const users = authUtils.getAllUsers();
    const user = users.find(user => user.id === userId);
    
    if (!user) {
      throw new Error('Пользователь не найден');
    }

    if (user.password !== currentPassword) {
      throw new Error('Неверный текущий пароль');
    }

    user.password = newPassword;
    authUtils.saveUsers(users);
    
    return true;
  },

  // Валидация email
  validateEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Валидация пароля
  validatePassword: (password) => {
    return password && password.length >= 6;
  },

  // Создать тестового пользователя (для разработки)
  createTestUser: () => {
    const testUser = {
      email: 'test@voda59.ru',
      firstName: 'Тест',
      lastName: 'Пользователь',
      phone: '+7 999 123-45-67',
      password: '123456'
    };

    try {
      return authUtils.createUser(testUser);
    } catch (error) {
      // Если пользователь уже существует, просто вернуть его
      return authUtils.findUserByEmail(testUser.email);
    }
  }
};

// Асинхронные функции для имитации API
export const authAPI = {
  login: async (email, password) => {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      return authUtils.authenticateUser(email, password);
    } catch (error) {
      throw error;
    }
  },

  register: async (userData) => {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      return authUtils.createUser(userData);
    } catch (error) {
      throw error;
    }
  },

  updateProfile: async (userId, updates) => {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      return authUtils.updateUserProfile(userId, updates);
    } catch (error) {
      throw error;
    }
  },

  changePassword: async (userId, currentPassword, newPassword) => {
    // Имитация задержки сети
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      return authUtils.changePassword(userId, currentPassword, newPassword);
    } catch (error) {
      throw error;
    }
  }
};

// Simple storage functions for testing
export const saveUserToStorage = (userData) => {
  try {
    localStorage.setItem('voda59_user', JSON.stringify(userData));
  } catch (error) {
    console.error('Error saving user to storage:', error);
  }
};

export const getUserFromStorage = () => {
  try {
    const user = localStorage.getItem('voda59_user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error getting user from storage:', error);
    return null;
  }
};

export const removeUserFromStorage = () => {
  try {
    localStorage.removeItem('voda59_user');
  } catch (error) {
    console.error('Error removing user from storage:', error);
  }
};

// Mock functions for testing
export const mockLogin = async (credentials) => {
  // Имитация задержки сети
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const { email, password } = credentials;
  
  // Валидация входных данных
  if (!email || !password) {
    return {
      success: false,
      error: 'Email и пароль обязательны'
    };
  }
  
  // Проверка корректных учетных данных (тестовые данные)
  if (email === 'test@example.com' && password === 'password123') {
    return {
      success: true,
      user: {
        id: 1,
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User'
      }
    };
  }
  
  return {
    success: false,
    error: 'Неверный email или пароль'
  };
};

export const mockRegister = async (userData) => {
  // Имитация задержки сети
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const { email, password, firstName, lastName, phone } = userData;
  
  // Проверка обязательных полей
  if (!email || !password || !firstName || !lastName) {
    return {
      success: false,
      error: 'Все поля обязательны для заполнения'
    };
  }
  
  // Проверка формата email
  if (!authUtils.validateEmail(email)) {
    return {
      success: false,
      error: 'Неверный формат email'
    };
  }
  
  // Проверка существующего пользователя (для тестов)
  if (email === 'test@example.com') {
    return {
      success: false,
      error: 'Пользователь с таким email уже существует'
    };
  }
  
  return {
    success: true,
    user: {
      id: Date.now(),
      email,
      firstName,
      lastName,
      phone: phone || undefined,
      createdAt: new Date().toISOString()
    }
  };
};