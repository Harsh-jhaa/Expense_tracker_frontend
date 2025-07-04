// This file contains the base URL and API paths for the application.
// It is used to define the endpoints for various functionalities like authentication, income, expense, and dashboard.
// The paths can be used in API requests to interact with the backend server.

const BASE_URL = import.meta.env.VITE_BACKEND_URL ;
const API_PATHS = {
  AUTH: {
    LOGIN: '/api/v1/auth/login',
    REGISTER: '/api/v1/auth/register',
    GET_USER_INFO: '/api/v1/auth/getUser',
  },
  DASHBOARD: {
    GET_DATA: '/api/v1/dashboard',
  },
  INCOME: {
    ADD_INCOME: '/api/v1/income/add',
    GET_ALL_INCOME: '/api/v1/income/get',
    DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
    DOWNLOAD_INCOME: '/api/v1/income/downloadexcel',
  },
  EXPENSE: {
    ADD_EXPENSE: '/api/v1/expense/add',
    GET_ALL_EXPENSE: '/api/v1/expense/get',
    DELETE_EXPENSE: (expenseId) => `/api/v1/expense/${expenseId}`,
    DOWNLOAD_EXPENSE: '/api/v1/expense/downloadexcel',
  },
  IMAGE: {
    UPLOAD_IMAGE: '/api/v1/auth/upload-image',
  },
};

export { BASE_URL, API_PATHS };
