import React, { useState } from 'react';
import useUserAuth from '../../hooks/useUserAuth';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useEffect } from 'react';
import Modal from '../../components/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import { toast } from 'react-hot-toast';
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/DeleteAlert';

const Expense = () => {
  useUserAuth();
  const [expenseData, setExpenseData] = React.useState([]);
  const [OpenAddExpenseModal, setOpenAddExpenseModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = React.useState({
    show: false,
    data: null,
  });

  // get expense details
  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );
      if (response.data) {
        setExpenseData([...response.data]);
      }
    } catch (error) {
      console.log('Something went wrong while fetching dashboard data', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Add Expense
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    // validation check
    if (!category.trim()) {
      toast.error('Category is required');
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error('Amount should be a valid number greater than 0.');
      return;
    }
    if (!date) {
      toast.error('Date is required');
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });
      toast.success('Expense added successfully');
      fetchExpenseDetails();
      setOpenAddExpenseModal(false);
    } catch (error) {
      console.error(
        'Error adding expense:',
        error.response?.data?.message || error.message
      );
    }
  };

  // Handle Delete Expense
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));

      setOpenDeleteAlert({
        show: false,
        data: null,
      });
      toast.success('Expense details deleted successfully.');
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        'Error deleting expense:',
        error.response?.data?.message || error.messages
      );
    }
  };

  // Handle Download Expense Details
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType: 'blob', // Important for downloading files
        }
      );

      // create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      // create a link element
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'expense_details.xlsx');
      // append to the body
      document.body.appendChild(link);
      // trigger the download
      link.click();
      // clean up and remove the link
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      // Free up memory
      toast.success('Expense details downloaded successfully.');
    } catch (error) {
      console.error('Error downloading expense details:', error);
      toast.error('Failed to download expense details. Please try again.');
    }
  };

  useEffect(() => {
    fetchExpenseDetails();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu='Expense'>
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1  gap-6'>
          <div className=''>
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModal(true)}
            />
          </div>
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({
                show: true,
                data: id,
              });
            }}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>
        <Modal
          isOpen={OpenAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title='Add Expense'
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title='Delete Expense'
        >
          <DeleteAlert
            content='Are you sure you want to delete this expense detail ?'
            onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
