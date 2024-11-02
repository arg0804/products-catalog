import React from 'react';
import '../styles/filterSidebar.css';

const FilterSidebar = ({ filters, onFilterChange }) => {
  return (
    <div className="filter-sidebar">
      <h3>Filters</h3>
      <div>
        <h4>Categories</h4>
        <label>
          <input
            name="Electronics"
            type="checkbox"
            checked={filters.category.Electronics}
            onChange={(e) => onFilterChange({ category: 'Electronics', checked: e.target.checked })}
          />
          Electronics
        </label>
        <label>
          <input
            name="Footwear"
            type="checkbox"
            checked={filters.category.Footwear}
            onChange={(e) => onFilterChange({ category: 'Footwear', checked: e.target.checked })}
          />
          Footwear
        </label>
        <label>
          <input
            name="Clothing"
            type="checkbox"
            checked={filters.category.Clothing}
            onChange={(e) => onFilterChange({ category: 'Clothing', checked: e.target.checked })}
          />
          Clothing
        </label>
      </div>
      <div>
        <h5>Price Range</h5>
        <label htmlFor="price-slider">
          <input
            id="price-slider"
            max="500"
            min="0"
            step="1"
            type="range"
            value={filters.price}
            onChange={(e) => onFilterChange({ price: e.target.value })}
            aria-label="Price Slider"
          />
          <span>${filters.price}</span>
        </label>
      </div>
      <div>
        <h5>Rating</h5>
        <label htmlFor="rating-slider">
          <input
            id="rating-slider"
            max="5"
            min="0"
            step="0.1"
            type="range"
            value={filters.rating}
            onChange={(e) => onFilterChange({ rating: e.target.value })}
            aria-label="Rating Slider"
          />
          <span>{filters.rating} stars</span>
        </label>
      </div>
    </div>
  );
};

export default FilterSidebar;