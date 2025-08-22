import { configureStore } from '@reduxjs/toolkit';
import authReducer, {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
  updateUser,
  selectIsAuthenticated,
  selectUser,
  selectIsLoading,
  selectError,
} from '../../src/store/slices/authSlice';

// Mock user data
const mockUser = {
  id: 1,
  email: 'test@example.com',
  firstName: 'John',
  lastName: 'Doe',
  phone: '+7 (123) 456-78-90',
  address: 'Test Address',
  createdAt: '2024-01-01T00:00:00.000Z',
};

describe('authSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = store.getState().auth;
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });
  });

  describe('login actions', () => {
    it('should handle loginStart', () => {
      store.dispatch(loginStart());
      const state = store.getState().auth;
      
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle loginSuccess', () => {
      store.dispatch(loginSuccess(mockUser));
      const state = store.getState().auth;
      
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(mockUser);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should handle loginFailure', () => {
      const errorMessage = 'Invalid credentials';
      store.dispatch(loginFailure(errorMessage));
      const state = store.getState().auth;
      
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('register actions', () => {
    it('should handle registerStart', () => {
      store.dispatch(registerStart());
      const state = store.getState().auth;
      
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle registerSuccess', () => {
      store.dispatch(registerSuccess(mockUser));
      const state = store.getState().auth;
      
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(mockUser);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should handle registerFailure', () => {
      const errorMessage = 'Email already exists';
      store.dispatch(registerFailure(errorMessage));
      const state = store.getState().auth;
      
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('logout action', () => {
    it('should handle logout', () => {
      // First login
      store.dispatch(loginSuccess(mockUser));
      
      // Then logout
      store.dispatch(logout());
      const state = store.getState().auth;
      
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });
  });

  describe('updateUser action', () => {
    it('should update user information', () => {
      // First login
      store.dispatch(loginSuccess(mockUser));
      
      // Update user
      const updatedData = {
        firstName: 'Jane',
        lastName: 'Smith',
        phone: '+7 (987) 654-32-10',
      };
      store.dispatch(updateUser(updatedData));
      const state = store.getState().auth;
      
      expect(state.user).toEqual({
        ...mockUser,
        ...updatedData,
      });
    });

    it('should not update user when not authenticated', () => {
      const updatedData = { firstName: 'Jane' };
      store.dispatch(updateUser(updatedData));
      const state = store.getState().auth;
      
      expect(state.user).toBeNull();
    });
  });

  describe('selectors', () => {
    beforeEach(() => {
      store.dispatch(loginSuccess(mockUser));
    });

    it('should select authentication status', () => {
      const state = store.getState();
      const isAuthenticated = selectIsAuthenticated(state);
      expect(isAuthenticated).toBe(true);
    });

    it('should select user data', () => {
      const state = store.getState();
      const user = selectUser(state);
      expect(user).toEqual(mockUser);
    });

    it('should select loading status', () => {
      store.dispatch(loginStart());
      const state = store.getState();
      const isLoading = selectIsLoading(state);
      expect(isLoading).toBe(true);
    });

    it('should select error message', () => {
      const errorMessage = 'Test error';
      store.dispatch(loginFailure(errorMessage));
      const state = store.getState();
      const error = selectError(state);
      expect(error).toBe(errorMessage);
    });
  });
});