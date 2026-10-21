import React from 'react';
import { CATEGORIES } from '../data';

const FilterBar = ({ searchText, onSearchChange, categoryFilter, onCategoryChange }) => {
  return (
    <div style={{ marginBottom: '15px' }}>
      <label htmlFor="search-input">Tìm kiếm</label>
      <input
        id="search-input"
        type="text"
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Nhập tên khoản chi..."
        style={{ marginLeft: '5px', marginRight: '20px' }}
      />

      <label htmlFor="category-select">Danh mục</label>
      <select
        id="category-select"
        value={categoryFilter}
        onChange={(e) => onCategoryChange(e.target.value)}
        style={{ marginLeft: '5px' }}
      >
        <option value="Tất cả">Tất cả</option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;