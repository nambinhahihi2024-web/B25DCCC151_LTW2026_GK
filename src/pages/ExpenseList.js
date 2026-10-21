import React, { useState, useEffect } from 'react';
import FilterBar from '../components/FilterBar';
import ExpenseTable from '../components/ExpenseTable';

const ExpenseList = ({ expenses, onToggleStatus, onDelete }) => {
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Tất cả');
  const [width, setWidth] = useState(window.innerWidth);

  // Theo dõi width cửa sổ để đáp ứng yêu cầu 2.5
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = width < 768;

  // Lọc dữ liệu tìm kiếm & danh mục
  const filteredExpenses = expenses.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesCategory =
      categoryFilter === 'Tất cả' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div>Chế độ: {isMobile ? 'Điện thoại' : 'Máy tính'}</div>
      <br />
      <FilterBar
        searchText={searchText}
        onSearchChange={setSearchText}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
      />
      
      <div>Tìm thấy {filteredExpenses.length} khoản chi</div>

      {filteredExpenses.length === 0 ? (
        <p>Không có dữ liệu</p>
      ) : (
        <div className={`table-wrap ${isMobile ? 'mobile' : ''}`}>
          <ExpenseTable
            expenses={filteredExpenses}
            onToggleStatus={onToggleStatus}
            onDelete={onDelete}
          />
        </div>
      )}
    </div>
  );
};

export default ExpenseList;