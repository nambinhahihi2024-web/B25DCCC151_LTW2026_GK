import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout';
import Home from './pages/Home';
import ExpenseList from './pages/ExpenseList';
import AddExpense from './pages/AddExpense';
import ExpenseDetail from './pages/ExpenseDetail';
import './App.css';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const localData = localStorage.getItem('gk_expenses');
    if (localData) {
      setExpenses(JSON.parse(localData));
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    axios
      .get('/data/expenses.json', { signal: controller.signal })
      .then((res) => {
        setExpenses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          return;
        }
        setError('Không tải được dữ liệu');
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  
  useEffect(() => {
    if (!loading && !error) {
      localStorage.setItem('gk_expenses', JSON.stringify(expenses));
    }
  }, [expenses, loading, error]);

  
  const handleAddExpense = (newExpense) => {
    const maxId = expenses.reduce(
      (max, item) => (item.id > max ? item.id : max),
      0
    );
    const addedItem = {
      ...newExpense,
      id: maxId + 1
    };
    setExpenses([...expenses, addedItem]);
  };

 
  const handleToggleStatus = (id) => {
    setExpenses(
      expenses.map((item) =>
        item.id === id ? { ...item, paid: !item.paid } : item
      )
    );
  };

  
  const handleDelete = (id) => {
    setExpenses(expenses.filter((item) => item.id !== id));
  };

  if (loading) {
    return (
      <div>
        <Layout />
        <p>Đang tải...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Layout />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home expenses={expenses} />} />
        <Route
          path="expenses"
          element={
            <ExpenseList
              expenses={expenses}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDelete}
            />
          }
        />
        <Route
          path="expenses/new"
          element={<AddExpense onAddExpense={handleAddExpense} />}
        />
        <Route
          path="expenses/:id"
          element={<ExpenseDetail expenses={expenses} />}
        />
      </Route>
    </Routes>
  );
};

export default App;