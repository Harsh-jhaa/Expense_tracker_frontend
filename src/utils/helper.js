import React from 'react';
import { UserContext } from '../context/UserContext.jsx';
import moment from 'moment';
const validEmail = (email) => {
  const regex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
  // returns true if email is valid, false otherwise
};

const getInitials = (name) => {
  if (!name) return '';
  const words = name.split(' ');
  let initials = '';
  if (words[1]) {
    for (let i = 0; i < Math.min(words.length, 2); i++) {
      initials += words[i][0];
    }
  } else {
    initials = words[0][0];
  }
  return initials.toUpperCase();
};

const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return '';

  const [integerPart, fractionalPart] = num.toString().split('.');
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

const prepareExpenseBarChartData = (data = []) => {
  const charData = data.map((item) => ({
    category: item?.category,
    amount: item?.amount,
  }));
  return charData;
};

const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const charData = sortedData.map((item) => ({
    month: moment(item?.date).format('Do MMM'),
    amount: item?.amount,
    source: item?.source,
  }));
  return charData;
};

const prepareExpenseLineChartData = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format('Do MMM'),
    amount: item?.amount,
    category: item?.category,
  }));

  return chartData;
};

export {
  validEmail,
  getInitials,
  addThousandsSeparator,
  prepareExpenseBarChartData,
  prepareIncomeBarChartData,
  prepareExpenseLineChartData,
};
