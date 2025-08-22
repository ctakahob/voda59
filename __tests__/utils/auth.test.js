import { 
  saveUserToStorage, 
  getUserFromStorage, 
  removeUserFromStorage,
  mockLogin,
  mockRegister,
} from '../../src/utils/auth';

describe('auth utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('saveUserToStorage', () => {
    it('should save user data to localStorage', () => {
      const userData = {
        id: 1,
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
      };

      saveUserToStorage(userData);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'voda59_user',
        JSON.stringify(userData)
      );
    });

    it('should handle null user data', () => {
      saveUserToStorage(null);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'voda59_user',
        JSON.stringify(null)
      );
    });
  });

  describe('getUserFromStorage', () => {
    it('should retrieve user data from localStorage', () => {
      const userData = {
        id: 1,
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
      };

      localStorage.getItem.mockReturnValue(JSON.stringify(userData));

      const result = getUserFromStorage();

      expect(localStorage.getItem).toHaveBeenCalledWith('voda59_user');
      expect(result).toEqual(userData);
    });

    it('should return null when no user data exists', () => {
      localStorage.getItem.mockReturnValue(null);

      const result = getUserFromStorage();

      expect(result).toBeNull();
    });

    it('should handle invalid JSON in localStorage', () => {
      localStorage.getItem.mockReturnValue('invalid-json');

      const result = getUserFromStorage();

      expect(result).toBeNull();
    });
  });

  describe('removeUserFromStorage', () => {
    it('should remove user data from localStorage', () => {
      removeUserFromStorage();

      expect(localStorage.removeItem).toHaveBeenCalledWith('voda59_user');
    });
  });

  describe('mockLogin', () => {
    it('should successfully login with valid credentials', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = await mockLogin(credentials);

      expect(result.success).toBe(true);
      expect(result.user).toBeDefined();
      expect(result.user.email).toBe(credentials.email);
      expect(result.user.id).toBeDefined();
      expect(result.user.firstName).toBeDefined();
      expect(result.user.lastName).toBeDefined();
    });

    it('should fail login with invalid credentials', async () => {
      const credentials = {
        email: 'invalid@example.com',
        password: 'wrongpassword',
      };

      const result = await mockLogin(credentials);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Неверный email или пароль');
      expect(result.user).toBeUndefined();
    });

    it('should fail login with missing email', async () => {
      const credentials = {
        password: 'password123',
      };

      const result = await mockLogin(credentials);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Email и пароль обязательны');
    });

    it('should fail login with missing password', async () => {
      const credentials = {
        email: 'test@example.com',
      };

      const result = await mockLogin(credentials);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Email и пароль обязательны');
    });
  });

  describe('mockRegister', () => {
    it('should successfully register with valid data', async () => {
      const userData = {
        email: 'newuser@example.com',
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Doe',
        phone: '+7 (123) 456-78-90',
      };

      const result = await mockRegister(userData);

      expect(result.success).toBe(true);
      expect(result.user).toBeDefined();
      expect(result.user.email).toBe(userData.email);
      expect(result.user.firstName).toBe(userData.firstName);
      expect(result.user.lastName).toBe(userData.lastName);
      expect(result.user.phone).toBe(userData.phone);
      expect(result.user.id).toBeDefined();
      expect(result.user.createdAt).toBeDefined();
    });

    it('should fail registration with existing email', async () => {
      const userData = {
        email: 'test@example.com', // This email is used in mockLogin test
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Doe',
      };

      const result = await mockRegister(userData);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Пользователь с таким email уже существует');
    });

    it('should fail registration with missing required fields', async () => {
      const userData = {
        email: 'test@example.com',
        // missing password
        firstName: 'Jane',
        lastName: 'Doe',
      };

      const result = await mockRegister(userData);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Все поля обязательны для заполнения');
    });

    it('should fail registration with invalid email format', async () => {
      const userData = {
        email: 'invalid-email',
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Doe',
      };

      const result = await mockRegister(userData);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Неверный формат email');
    });
  });

  describe('async behavior', () => {
    it('should simulate network delay in mockLogin', async () => {
      const startTime = Date.now();
      
      await mockLogin({
        email: 'test@example.com',
        password: 'password123',
      });
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      // Should take at least 450ms but less than 600ms (simulated network delay with tolerance)
      expect(duration).toBeGreaterThanOrEqual(450);
      expect(duration).toBeLessThan(600);
    });

    it('should simulate network delay in mockRegister', async () => {
      const startTime = Date.now();
      
      await mockRegister({
        email: 'newuser2@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
      });
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      // Should take at least 750ms but less than 900ms (simulated network delay with tolerance)
      expect(duration).toBeGreaterThanOrEqual(750);
      expect(duration).toBeLessThan(900);
    });
  });
});