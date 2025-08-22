import { configureStore } from '@reduxjs/toolkit';
import cartReducer, {
  addToCart,
  removeFromCart,
  updateQuantity,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  selectCartItems,
  selectCartTotalItems,
  selectCartTotalPrice,
} from '../../src/store/slices/cartSlice';

// Mock product data
const mockProduct = {
  id: 1,
  name: 'Test Water 0.5L',
  price: 45,
  category: 'питьевая',
  volume: '0.5л',
  inStock: true,
};

const mockProduct2 = {
  id: 2,
  name: 'Test Water 1.5L',
  price: 75,
  category: 'питьевая',
  volume: '1.5л',
  inStock: true,
};

describe('cartSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        cart: cartReducer,
      },
    });
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = store.getState().cart;
      expect(state.items).toEqual([]);
      expect(state.isOpen).toBe(false);
      expect(state.totalItems).toBe(0);
      expect(state.totalPrice).toBe(0);
      expect(state.shippingCost).toBe(200);
      expect(state.freeShippingThreshold).toBe(3000);
    });
  });

  describe('addToCart', () => {
    it('should add a new item to cart', () => {
      store.dispatch(addToCart(mockProduct));
      const state = store.getState().cart;
      
      expect(state.items).toHaveLength(1);
      expect(state.items[0]).toEqual({ ...mockProduct, quantity: 1 });
      expect(state.totalItems).toBe(1);
      expect(state.totalPrice).toBe(45);
    });

    it('should increase quantity when adding existing item', () => {
      store.dispatch(addToCart(mockProduct));
      store.dispatch(addToCart(mockProduct));
      const state = store.getState().cart;
      
      expect(state.items).toHaveLength(1);
      expect(state.items[0].quantity).toBe(2);
      expect(state.totalItems).toBe(2);
      expect(state.totalPrice).toBe(90);
    });

    it('should add multiple different items', () => {
      store.dispatch(addToCart(mockProduct));
      store.dispatch(addToCart(mockProduct2));
      const state = store.getState().cart;
      
      expect(state.items).toHaveLength(2);
      expect(state.totalItems).toBe(2);
      expect(state.totalPrice).toBe(120);
    });
  });

  describe('removeFromCart', () => {
    it('should remove item from cart', () => {
      store.dispatch(addToCart(mockProduct));
      store.dispatch(addToCart(mockProduct2));
      store.dispatch(removeFromCart(1));
      
      const state = store.getState().cart;
      expect(state.items).toHaveLength(1);
      expect(state.items[0].id).toBe(2);
      expect(state.totalItems).toBe(1);
      expect(state.totalPrice).toBe(75);
    });
  });

  describe('updateQuantity', () => {
    it('should update item quantity', () => {
      store.dispatch(addToCart(mockProduct));
      store.dispatch(updateQuantity({ id: 1, quantity: 3 }));
      
      const state = store.getState().cart;
      expect(state.items[0].quantity).toBe(3);
      expect(state.totalItems).toBe(3);
      expect(state.totalPrice).toBe(135);
    });

    it('should remove item when quantity is 0 or less', () => {
      store.dispatch(addToCart(mockProduct));
      store.dispatch(updateQuantity({ id: 1, quantity: 0 }));
      
      const state = store.getState().cart;
      expect(state.items).toHaveLength(0);
      expect(state.totalItems).toBe(0);
      expect(state.totalPrice).toBe(0);
    });
  });

  describe('increaseQuantity', () => {
    it('should increase item quantity by 1', () => {
      store.dispatch(addToCart(mockProduct));
      store.dispatch(increaseQuantity(1));
      
      const state = store.getState().cart;
      expect(state.items[0].quantity).toBe(2);
      expect(state.totalItems).toBe(2);
      expect(state.totalPrice).toBe(90);
    });
  });

  describe('decreaseQuantity', () => {
    it('should decrease item quantity by 1', () => {
      store.dispatch(addToCart(mockProduct));
      store.dispatch(addToCart(mockProduct)); // quantity = 2
      store.dispatch(decreaseQuantity(1));
      
      const state = store.getState().cart;
      expect(state.items[0].quantity).toBe(1);
      expect(state.totalItems).toBe(1);
      expect(state.totalPrice).toBe(45);
    });

    it('should remove item when quantity becomes 1 and decreased', () => {
      store.dispatch(addToCart(mockProduct));
      store.dispatch(decreaseQuantity(1));
      
      const state = store.getState().cart;
      expect(state.items).toHaveLength(0);
      expect(state.totalItems).toBe(0);
      expect(state.totalPrice).toBe(0);
    });
  });

  describe('clearCart', () => {
    it('should clear all items from cart', () => {
      store.dispatch(addToCart(mockProduct));
      store.dispatch(addToCart(mockProduct2));
      store.dispatch(clearCart());
      
      const state = store.getState().cart;
      expect(state.items).toHaveLength(0);
      expect(state.totalItems).toBe(0);
      expect(state.totalPrice).toBe(0);
    });
  });

  describe('selectors', () => {
    beforeEach(() => {
      store.dispatch(addToCart(mockProduct));
      store.dispatch(addToCart(mockProduct2));
    });

    it('should select cart items', () => {
      const state = store.getState();
      const items = selectCartItems(state);
      expect(items).toHaveLength(2);
    });

    it('should select total items count', () => {
      const state = store.getState();
      const totalItems = selectCartTotalItems(state);
      expect(totalItems).toBe(2);
    });

    it('should select total price', () => {
      const state = store.getState();
      const totalPrice = selectCartTotalPrice(state);
      expect(totalPrice).toBe(120);
    });
  });
});