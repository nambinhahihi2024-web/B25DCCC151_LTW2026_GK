import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formatMoney } from '../data';

const ExpenseDetail = ({ expenses }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const expenseId = Number(id);
  const expense = expenses.find((item) => item.id === expenseId);

  if (!expense) {
    return (
      <div>
        <p>Không tìm thấy khoản chi</p>
        <button onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Chi tiết khoản chi</h2>
      <p>Tên khoản chi: {expense.title}</p>
      <p>Số tiền: {formatMoney(expense.amount)}</p>
      <p>Danh mục: {expense.category}</p>
      <p>Ngày: {expense.date}</p>
      <p>Trạng thái: {expense.paid ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
      
      <button onClick={() => navigate(-1)}>Quay lại</button>
    </div>
  );
};

export default ExpenseDetail;