import React from 'react';
import { Search } from 'lucide-react';
import './Filters.css';

interface FiltersProps {
  filter: 'all' | 'favorites';
  searchQuery: string;
  onFilterChange: (filter: 'all' | 'favorites') => void;
  onSearchChange: (query: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  filter,
  searchQuery,
  onFilterChange,
  onSearchChange,
}) => {
  return (
    <div className="filters">
      <div className="filter-buttons">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => onFilterChange('all')}
        >
          All Products
        </button>
        <button
          className={`filter-btn ${filter === 'favorites' ? 'active' : ''}`}
          onClick={() => onFilterChange('favorites')}
        >
          Favorites
        </button>
      </div>
      
      <div className="search-container">
        <Search size={20} className="search-icon" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>
    </div>
  );
};

export default Filters;