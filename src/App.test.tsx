import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { AppContext } from './context/AppContext';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './pages/Login';
import CategoryList from './pages/CategoryList';
import ProductList from './pages/ProductList';

test('renders app', () => {
  render(<App />);
  const toolbarElement = screen.getByText(/sample app/i);
  expect(toolbarElement).toBeInTheDocument();
});

test('renders login screen with inputs', () => {
  const result = render(<App />);
  const emailInputElement = result.container.querySelector('#input-email');
  const passwordInputElement = result.container.querySelector('#input-password');
  expect(emailInputElement).toBeInTheDocument();
  expect(passwordInputElement).toBeInTheDocument();
});

test('authenticated user bypasses login', () => {

  const isAuthenticated = true;
  const setIsAuthenticated = jest.fn();
  const cart: number[] = [];
  const setCart = jest.fn();
  const value = { isAuthenticated, setIsAuthenticated, cart, setCart };

  const result = render(
  <AppContext.Provider value={value}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<CategoryList />} />
          <Route path="/:category" element={<ProductList />} />
        </Routes>
      </Router>
  </AppContext.Provider>);

  const productTitle = screen.getByText(/product categories/i);
  expect(productTitle).toBeInTheDocument();
  
});

