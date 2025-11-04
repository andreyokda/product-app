import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleFavorite } from '../../store/slices/productsSlice';
import { productsAPI } from '../../services/api';
import { Product } from '../../types';
import { formatPrice } from '../../utils/helpers';
import './ProductDetail.css';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { favorites } = useAppSelector((state) => state.products);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const isFavorite = product ? favorites.includes(product.id) : false;

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const productData = await productsAPI.getProduct(parseInt(id));
        setProduct(productData);
      } catch (err) {
        setError('Failed to load product');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleToggleFavorite = () => {
    if (product) {
      dispatch(toggleFavorite(product.id));
    }
  };

  const handleBack = () => {
    navigate('/products');
  };

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (error || !product) {
    return (
      <div className="error-page">
        <div className="error-message">
          <h2>Product not found</h2>
          <p>{error || 'The product you are looking for does not exist.'}</p>
          <button className="back-btn" onClick={handleBack}>
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <button className="back-btn" onClick={handleBack}>
        <ArrowLeft size={16} style={{ marginRight: '8px' }} />
        Back to Products
      </button>

      <div className="product-detail">
        <div className="product-images">
          <div className="main-image">
            <img 
              src={product.images[selectedImage] || product.thumbnail} 
              alt={product.title} 
            />
          </div>
          {product.images.length > 1 && (
            <div className="image-thumbnails">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${product.title} ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-info">
          <div className="product-header">
            <h1>{product.title}</h1>
            <button
              className={`favorite-btn large ${isFavorite ? 'active' : ''}`}
              onClick={handleToggleFavorite}
            >
              <Heart size={24} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          </div>

          <p className="product-description">{product.description}</p>

          <div className="product-price">
            {formatPrice(product.price)}
            {product.discountPercentage > 0 && (
              <span className="discount">
                {product.discountPercentage}% off
              </span>
            )}
          </div>

          <div className="product-meta">
            <div className="meta-item">
              <strong>Brand:</strong>
              <span>{product.brand}</span>
            </div>
            <div className="meta-item">
              <strong>Category:</strong>
              <span>{product.category}</span>
            </div>
            <div className="meta-item">
              <strong>Rating:</strong>
              <span>⭐ {product.rating}/5</span>
            </div>
            <div className="meta-item">
              <strong>Stock:</strong>
              <span>{product.stock} items available</span>
            </div>
          </div>

          <div className="product-actions">
            <button className="add-to-cart-btn">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;