import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { Product } from '../../types';
import './ProductList.css';

interface ProductListProps {
  products: Product[];
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onDeleteProduct: (id: number) => void;
  onProductClick: (id: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  favorites,
  onToggleFavorite,
  onDeleteProduct,
  onProductClick,
}) => {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <h3>No products found</h3>
        <p>Try changing your filters or search query</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isFavorite={favorites.includes(product.id)}
          onToggleFavorite={onToggleFavorite}
          onDelete={onDeleteProduct}
          onClick={onProductClick}
        />
      ))}
    </div>
  );
};

export default ProductList;