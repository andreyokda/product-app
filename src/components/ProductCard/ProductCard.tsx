import React from 'react';
import { Heart, Trash2 } from 'lucide-react';
import { Product } from '../../types';
import { truncateText, formatPrice } from '../../utils/helpers';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onDelete: (id: number) => void;
  onClick: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite,
  onToggleFavorite,
  onDelete,
  onClick,
}) => {
  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.card-actions')) {
      onClick(product.id);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(product.id);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(product.id);
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="card-image">
        <img src={product.thumbnail} alt={product.title} />
      </div>
      
      <div className="card-content">
        <h3 className="card-title">{product.title}</h3>
        <p className="card-description">
          {truncateText(product.description, 100)}
        </p>
        <div className="card-details">
          <span className="card-price">{formatPrice(product.price)}</span>
          <span className="card-rating">⭐ {product.rating}</span>
        </div>
        <div className="card-brand">Brand: {product.brand}</div>
      </div>

      <div className="card-actions">
        <button
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
        >
          <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
        <button
          className="delete-btn"
          onClick={handleDeleteClick}
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;