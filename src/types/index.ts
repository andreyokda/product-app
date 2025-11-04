export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsState {
  products: Product[];
  filteredProducts: Product[];
  favorites: number[];
  filter: 'all' | 'favorites';
  searchQuery: string;
  loading: boolean;
  error: string | null;
}

export interface CreateProductForm {
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  thumbnail: string;
}