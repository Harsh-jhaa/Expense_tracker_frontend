import React from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Input from '../../components/Inputs/Input.jsx';
import '../../index.css';
import { validEmail } from '../../utils/helper.js';
import axiosInstance from '../../utils/axiosInstance.js';
import { API_PATHS } from '../../utils/apiPaths.js';
import { UserContext } from '../../context/UserContext.jsx';
// import { set } from 'mongoose';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { updateUser } = React.useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter the email address');
      return;
    }
    if (!validEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!password) {
      setError('Please enter the password');
      return;
    }

    setError('');

    // Make API call to login
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      // taking out token and user from response
      // and storing token in local storage
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem('token', token);
        updateUser(user);
        navigate('/dashboard');
      }
      // console.log('Login successful:', user);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong, please try again later');
      }
      // console.log('Login error:', error);
    }
  };

  return (
    <AuthLayout>
      <div className='loginComp  lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h1 className='text-xl font-semibold text-black'>Welcome Back </h1>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Please enter your details to log in
        </p>

        {/*  form for input   */}
        <form action='' onSubmit={handleLogin}>
          <Input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='mail@example.com'
            label='Email Address'
          />
          <Input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Min 8 Characters'
            label='Password'
          />

          {error && <p className='text-red-500 text-xs pb-2.5'> {error}</p>}

          <button type='submit' className='btn-primary'>
            Login
          </button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Don't have an account?{' '}
            <Link className='font-medium text-[#875cf5] underline' to='/signUp'>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
