import React from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

const Input = ({ label, type, value, onChange, placeholder }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <label className='text-[13px] text-slate-800 dark:text-gray-300 '>
        {' '}
        {label}
      </label>
      <div className='input-box'>
        <input
          type={
            type === 'password' ? (showPassword ? 'text' : 'password') : type
          }
          value={value}
          //   onChange fires an event and send it to the parent component onChange event
          onChange={(e) => onChange(e)}
          placeholder={placeholder}
          className='w-full bg-transparent outline-none'
        />

        {type === 'password' && (
          <>
            {showPassword ? (
              <FaRegEye
                className='text-gray-500 cursor-pointer'
                onClick={toggleShowPassword}
                size={22}
              />
            ) : (
              <FaRegEyeSlash
                className='text-gray-500 cursor-pointer'
                onClick={toggleShowPassword}
                size={22}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
