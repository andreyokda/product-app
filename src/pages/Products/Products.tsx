import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { 
  setProducts, 
  toggleFavorite, 
  deleteProduct, 
  setFilter, 
  setSearchQuery, 
  applyFilters 
} from '../../store/slices/productsSlice';
import { productsAPI } from '../../services/api';
import ProductList from '../../components/ProductList/ProductList';
import Filters from '../../components/Filters/Filters';
import Pagination from '../../components/Pagination/Pagination';
import './Products.css';

const Products: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const { 
    products, 
    filteredProducts, 
    favorites, 
    filter, 
    searchQuery, 
    loading, 
    error 
  } = useAppSelector((state) => state.products);

  // Состояние для пагинации
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; // 9 товаров на странице

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsAPI.getProducts();
        dispatch(setProducts(data.products));
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, [dispatch]);

  useEffect(() => {
    dispatch(applyFilters());
    setCurrentPage(1); // Сбрасываем на первую страницу при изменении фильтров
  }, [filter, searchQuery, products, dispatch]);

  // Вычисляем товары для текущей страницы
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, productsPerPage]);

  // Вычисляем общее количество страниц
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleToggleFavorite = (productId: number) => {
    dispatch(toggleFavorite(productId));
  };

  const handleDeleteProduct = (productId: number) => {
    dispatch(deleteProduct(productId));
  };

  const handleProductClick = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  const handleFilterChange = (newFilter: 'all' | 'favorites') => {
    dispatch(setFilter(newFilter));
  };

  const handleSearchChange = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Плавная прокрутка вверх при смене страницы
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="products-page">
      <div className="page-header">
        <h1>Products</h1>
        <button 
          className="create-btn"
          onClick={() => navigate('/create-product')}
        >
          Create Product
        </button>
      </div>

      <Filters
        filter={filter}
        searchQuery={searchQuery}
        onFilterChange={handleFilterChange}
        onSearchChange={handleSearchChange}
      />

      <div className="products-info">
        <p>Showing {paginatedProducts.length} of {filteredProducts.length} products</p>
        {totalPages > 1 && (
          <p>Page {currentPage} of {totalPages}</p>
        )}
      </div>

      <ProductList
        products={paginatedProducts}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        onDeleteProduct={handleDeleteProduct}
        onProductClick={handleProductClick}
      />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Products;