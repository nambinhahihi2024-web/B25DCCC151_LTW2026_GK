import React from 'react';
import ExpenseRow from './ExpenseRow';

const ExpenseTable = ({ expenses, onToggleStatus, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Khoản chi</th>
          <th>Số tiền</th>
          <th className="col-category">Danh mục</th>
          <th className="col-date">Ngày</th>
          <th>Trạng thái</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <ExpenseRow
            key={expense.id}
            expense={expense}
            onToggleStatus={onToggleStatus}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseTable;