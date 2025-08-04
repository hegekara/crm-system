import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Home from './pages/Home';
import CustomerList from './pages/Customer/CustomerList';
import CreateCustomer from './pages/Customer/CustomerCreate';
import Login from './pages/Auth/Login';
import ProtectedRoute from './components/ProtectedRoute';
import UserList from './pages/User/UserList';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      <Route path="/home" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />


      <Route path="/customers" element={
        <ProtectedRoute>
          <CustomerList />
        </ProtectedRoute>
      } />
      <Route path="/create-customer" element={
        <ProtectedRoute>
          <CreateCustomer />
        </ProtectedRoute>
      } />


    <Route path="/users" element={
        <ProtectedRoute>
          <UserList />
        </ProtectedRoute>
      } />
    </Routes>


  </BrowserRouter>
);
