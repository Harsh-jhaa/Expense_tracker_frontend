import React from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Input from '../../components/Inputs/Input.jsx';
import '../../index.css';
import { validEmail } from '../../utils/helper.js';
import ProfilePicSelector from '../../components/Inputs/ProfilePicSelector.jsx';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance.js';
import { API_PATHS } from '../../utils/apiPaths.js';
import { UserContext } from '../../context/UserContext.jsx';
import uploadImage from '../../utils/uploadImage.js';
// import upload from '../../../../backEnd/middlewares/uploadMiddleware.js';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const { updateUser } = React.useContext(UserContext);

  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImageUrl = '';
    if (!email) {
      setError('Please enter the email address');
      return;
    }
    if (!validEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!fullName) {
      setError('Please enter your name');
      return;
    }
    if (!password) {
      setError('Please enter the password');
      return;
    }
    setError('');

    try {
      // If a profile picture is selected, upload it to the server
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || '';
      }
      // console.log({ fullName, email, password, profileImageUrl });

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullname: fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem('token', token);
        updateUser(user);
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong, please try again later');
      }
      // console.error(error);
    }
  };
  return (
    <AuthLayout>
      <div className='h-auto lg:w-[100%] md:h-full mt-10 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>
          {' '}
          Create an Account{' '}
        </h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Join us today by entering your details below
        </p>
        <form onSubmit={handleSignUp}>
          <ProfilePicSelector image={profilePic} setImage={setProfilePic} />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              type='text'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              label='Enter Full Name'
              placeholder='Enter your name'
            />
            <Input
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label='Email Address'
              placeholder='mail@example.com'
            />

            <div className='col-span-2'>
              <Input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label='Set your Password'
                placeholder='Min 8 characters'
              />
            </div>
          </div>
          {error && <p className='text-red-500 text-xs pb-2.5'> {error}</p>}

          <button type='submit' className='btn-primary'>
            Sign Up
          </button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Already have an account?{' '}
            <Link className='font-medium text-[#875cf5] underline' to='/login'>
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
