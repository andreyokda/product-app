import { Product } from '../types';

const API_BASE = 'https://dummyjson.com/products';

export const productsAPI = {
  getProducts: async (): Promise<{ products: Product[] }> => {
    const response = await fetch(`${API_BASE}?limit=100`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  },

  getProduct: async (id: number): Promise<Product> => {
    const response = await fetch(`${API_BASE}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return response.json();
  },
};