import React from 'react';
import { formatMoney } from '../data';

const Home = ({ expenses }) => {
  // Bắt buộc dùng reduce() theo yêu cầu 2.2
  const totalExpenses = expenses.length;

  const totalAmountPaid = expenses.reduce((sum, item) => {
    return item.paid ? sum + item.amount : sum;
  }, 0);

  const totalAmountUnpaid = expenses.reduce((sum, item) => {
    return !item.paid ? sum + item.amount : sum;
  }, 0);

  return (
    <div>
      <h1>Chi tiêu cá nhân</h1>
      <p>Tổng số khoản chi: {totalExpenses}</p>
      <p>Tổng số tiền đã chi: {formatMoney(totalAmountPaid)}</p>
      <p>Tổng số tiền chưa thanh toán: {formatMoney(totalAmountUnpaid)}</p>
    </div>
  );
};

export default Home;