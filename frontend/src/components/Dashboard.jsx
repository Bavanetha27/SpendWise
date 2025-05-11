import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const Dashboard = () => {
  // Sample data for the dashboard
  const expenseCategories = ['Food', 'Entertainment', 'Utilities', 'Transportation', 'Health'];
  const expensesData = [400, 300, 150, 100, 200]; // Example expenditure in USD

  // Prepare data for the Bar chart (Monthly Expenditures by Category)
  const barChartData = {
    labels: expenseCategories,
    datasets: [
      {
        label: 'Expenditure in USD',
        data: expensesData,
        backgroundColor: '#4CAF50', // Green color for bars
        borderColor: '#388E3C',
        borderWidth: 1,
      },
    ],
  };

  // Bar chart options
  const barChartOptions = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 50,
        },
      },
    },
  };

  // Sample monthly expenditures data for Line chart (Example: Expenditure change per month)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const monthlyExpenditures = [400, 350, 420, 500, 380, 450]; // Example expenditures per month

  // Prepare data for the Line chart (Monthly Expenditure Change)
  const lineChartData = {
    labels: months,
    datasets: [
      {
        label: 'Monthly Expenditures',
        data: monthlyExpenditures,
        borderColor: '#FF5733', // Red color for the line
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  // Line chart options
  const lineChartOptions = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 50,
        },
      },
    },
  };

  // Static expenses data for the expenditure list
  const expenses = [
    { category: 'Food', amount: 400, date: '2023-10-01' },
    { category: 'Entertainment', amount: 300, date: '2023-10-02' },
    { category: 'Utilities', amount: 150, date: '2023-10-03' },
    { category: 'Transportation', amount: 100, date: '2023-10-04' },
    { category: 'Health', amount: 200, date: '2023-10-05' },
  ];

  return (
    <div className="p-10 max-w-7xl mx-auto bg-gray-50 dark:bg-gray-900 rounded-lg shadow-xl transition-colors duration-500">
      <h1 className="text-4xl font-bold text-center text-indigo-600 dark:text-indigo-300 mb-8">Expense Dashboard</h1>

      {/* Report Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Expenditure Report</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Here is a summary of your monthly expenditures. The graph below visualizes the amount spent in various categories and the changes in your spending month by month.
        </p>
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Line Graph (Monthly Expenditure Changes) */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Monthly Expenditure Changes</h2>
          <Line data={lineChartData} options={lineChartOptions} />
        </div>

        {/* Bar Graph (Expenditure by Category) */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Expenditure by Category</h2>
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </div>

      {/* Expenditure Details Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Added Expenditures</h2>
        <ul className="space-y-4">
          {expenses.map((expense, index) => (
            <li key={index} className="flex justify-between items-center">
              <div>
                <strong className="text-lg text-gray-800 dark:text-gray-100">{expense.category}</strong><br />
                <span className="text-sm text-gray-600 dark:text-gray-400">{expense.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xl text-gray-800 dark:text-gray-100">${expense.amount}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
