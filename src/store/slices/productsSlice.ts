import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductsState } from '../../types';

const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  favorites: [],
  filter: 'all',
  searchQuery: '',
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      if (state.favorites.includes(productId)) {
        state.favorites = state.favorites.filter(id => id !== productId);
      } else {
        state.favorites.push(productId);
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.products = state.products.filter(product => product.id !== productId);
      state.favorites = state.favorites.filter(id => id !== productId);
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.unshift(action.payload);
    },
    setFilter: (state, action: PayloadAction<'all' | 'favorites'>) => {
      state.filter = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    applyFilters: (state) => {
      let filtered = state.products;
      
      // Фильтр по избранному
      if (state.filter === 'favorites') {
        filtered = filtered.filter(product => 
          state.favorites.includes(product.id)
        );
      }
      
      // Фильтр по поиску
      if (state.searchQuery) {
        filtered = filtered.filter(product =>
          product.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      }
      
      state.filteredProducts = filtered;
    },
  },
});

export const {
  setProducts,
  toggleFavorite,
  deleteProduct,
  addProduct,
  setFilter,
  setSearchQuery,
  applyFilters,
} = productsSlice.actions;

export default productsSlice.reducer;