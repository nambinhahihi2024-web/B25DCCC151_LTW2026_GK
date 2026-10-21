import React from 'react';
import { Link } from 'react-router-dom';
import { formatMoney } from '../data';

const ExpenseRow = ({ expense, onToggleStatus, onDelete }) => {
  const { id, title, amount, category, date, paid } = expense;

  return (
    <tr>
      <td>
        <Link to={`/expenses/${id}`}>{title}</Link>
      </td>
      <td>{formatMoney(amount)}</td>
      <td className="col-category">{category}</td>
      <td className="col-date">{date}</td>
      <td>
        {paid ? (
          'Đã thanh toán'
        ) : (
          <span className="unpaid-text">Chưa thanh toán</span>
        )}
      </td>
      <td>
        <button onClick={() => onToggleStatus(id)}>
          {paid ? 'Đánh dấu chưa trả' : 'Đánh dấu đã trả'}
        </button>
        <button onClick={() => onDelete(id)} style={{ marginLeft: '5px' }}>
          Xóa
        </button>
      </td>
    </tr>
  );
};

export default ExpenseRow;