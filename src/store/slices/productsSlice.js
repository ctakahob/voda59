import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  filteredProducts: [],
  categories: [],
  isLoading: false,
  error: null,
  filters: {
    category: 'all',
    priceRange: [0, 1000],
    searchQuery: '',
    sortBy: 'name', // name, price, rating
    sortOrder: 'asc', // asc, desc
  },
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
      // Извлекаем уникальные категории
      const categories = [...new Set(action.payload.map(product => product.category))];
      state.categories = categories;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setFilter: (state, action) => {
      const { key, value } = action.payload;
      state.filters[key] = value;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = {
        category: 'all',
        priceRange: [0, 1000],
        searchQuery: '',
        sortBy: 'name',
        sortOrder: 'asc',
      };
    },
    applyFilters: (state) => {
      let filtered = [...state.products];

      // Фильтр по категории
      if (state.filters.category !== 'all') {
        filtered = filtered.filter(product => product.category === state.filters.category);
      }

      // Фильтр по цене
      filtered = filtered.filter(product => 
        product.price >= state.filters.priceRange[0] && 
        product.price <= state.filters.priceRange[1]
      );

      // Поиск по названию и описанию
      if (state.filters.searchQuery) {
        const query = state.filters.searchQuery.toLowerCase();
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
        );
      }

      // Сортировка
      filtered.sort((a, b) => {
        let aValue, bValue;
        
        switch (state.filters.sortBy) {
          case 'price':
            aValue = a.price;
            bValue = b.price;
            break;
          case 'rating':
            aValue = a.rating || 0;
            bValue = b.rating || 0;
            break;
          case 'name':
          default:
            aValue = a.name.toLowerCase();
            bValue = b.name.toLowerCase();
            break;
        }

        if (state.filters.sortOrder === 'desc') {
          return aValue < bValue ? 1 : -1;
        }
        return aValue > bValue ? 1 : -1;
      });

      state.filteredProducts = filtered;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setProducts,
  setLoading,
  setError,
  setFilter,
  setFilters,
  resetFilters,
  applyFilters,
  clearError,
} = productsSlice.actions;

// Селекторы
export const selectProducts = (state) => state.products.products;
export const selectFilteredProducts = (state) => state.products.filteredProducts;
export const selectCategories = (state) => state.products.categories;
export const selectProductsLoading = (state) => state.products.isLoading;
export const selectProductsError = (state) => state.products.error;
export const selectFilters = (state) => state.products.filters;
export const selectProductById = (id) => (state) => 
  state.products.products.find(product => product.id === id);

export default productsSlice.reducer;