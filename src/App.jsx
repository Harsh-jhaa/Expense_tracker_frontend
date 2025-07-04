import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Dashboard/Home.jsx';
import Login from './pages/Auth/Login.jsx';
import SignUp from './pages/Auth/SignUp.jsx';
import Income from './pages/Dashboard/Income.jsx';
import Expense from './pages/Dashboard/Expense.jsx';
import AuthLayout from './components/layouts/AuthLayout.jsx';
import './index.css';
import User from '../../backEnd/models/User.js';
import { UserProvider } from './context/UserContext.jsx';
import {Toaster} from 'react-hot-toast';
const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path='/' element={<Root />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/dashboard' element={<Home />} />
          <Route path='/income' element={<Income />} />
          <Route path='/expense' element={<Expense />} />
        </Routes>

      <Toaster 
        toastOptions={{
          className: '',
          style:{
            fontSize: '13px'
          },
        }}
      />

      </UserProvider>
    </BrowserRouter>
  );
};

export default App;

const Root = () => {
  // check if token exists in local storage
  const isAuthenticated = !!localStorage.getItem('token'); // !! will return true if token exists, false otherwise
  return isAuthenticated ? (
    // redirects to Home page if authenticated
    <Navigate to='/dashboard' />
  ) : (
    // else redirects to login page
    <Navigate to='/login' />
  );
};
