import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data';

const AddExpense = ({ onAddExpense }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Ăn uống');
  const [date, setDate] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Kiểm tra ô trống
    if (!title.trim() || !amount || !category || !date) {
      setErrorMsg('Vui lòng nhập đầy đủ thông tin phía dưới form');
      return;
    }

    const numAmount = Number(amount);

    // Kiểm tra tính hợp lệ số tiền (Yêu cầu 8)
    if (isNaN(numAmount) || numAmount < 1000 || numAmount > 100000000 || !Number.isInteger(numAmount)) {
      setErrorMsg('Số tiền phải từ 1.000 đến 100.000.000');
      return;
    }

    const newExpense = {
      title: title.trim(),
      amount: numAmount,
      category,
      date,
      paid: false
    };

    onAddExpense(newExpense);
    navigate('/expenses', { replace: true });
  };

  return (
    <div>
      <h2>Thêm khoản chi mới</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="title-input">Tên khoản chi</label>
          <br />
          <input
            id="title-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="amount-input">Số tiền</label>
          <br />
          <input
            id="amount-input"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="category-select-form">Danh mục</label>
          <br />
          <select
            id="category-select-form"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="date-input">Ngày chi</label>
          <br />
          <input
            id="date-input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

        <button type="submit">Thêm</button>
      </form>
    </div>
  );
};

export default AddExpense;