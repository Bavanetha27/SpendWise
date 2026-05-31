import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import jsPDF from 'jspdf';
import { FaFilePdf } from 'react-icons/fa';
import { HiOutlineArrowDownTray } from 'react-icons/hi2';
import { BACKEND_URL } from '../config';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios.get(`${BACKEND_URL}/expenses`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setExpenses(res.data)) // already sorted newest-first from backend
      .catch(err => console.error('Error fetching expenses:', err));
  }, []);

  useEffect(() => {
    const container = document.getElementById('expense-list');
    if (!container) return;

    const handleScroll = () => {
      if (container.scrollTop + container.clientHeight >= container.scrollHeight - 10) {
        setVisibleCount(prev => Math.min(prev + 10, filteredExpenses.length));
      }
    };
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [expenses, selectedMonth]);

  const monthlyTotals = {};
  expenses.forEach(({ amount, date }) => {
    const month = new Date(date).toLocaleString('default', { month: 'short' });
    monthlyTotals[month] = (monthlyTotals[month] || 0) + amount;
  });

  const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const sortedMonths = monthOrder.filter(m => monthlyTotals[m] !== undefined);
  const monthLabels = sortedMonths;
  const monthAmounts = monthLabels.map(month => monthlyTotals[month]);

  const filteredExpenses = selectedMonth
    ? expenses.filter(exp => new Date(exp.date).toLocaleString('default', { month: 'short' }) === selectedMonth)
    : expenses;

  const expenseByCategory = {};
  filteredExpenses.forEach(({ category, amount }) => {
    expenseByCategory[category] = (expenseByCategory[category] || 0) + amount;
  });
  const categoryLabels = Object.keys(expenseByCategory);
  const categoryAmounts = Object.values(expenseByCategory);

  const brandColor = '#14b8a6'; // tailwind brand-500
  const blueColor = '#3b82f6'; // blue-500

  const lineChartData = {
    labels: monthLabels,
    datasets: [{
      label: 'Monthly Expenditures',
      data: monthAmounts,
      borderColor: blueColor,
      backgroundColor: blueColor + '33',
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointHoverRadius: 8,
      pointRadius: 4,
      pointBackgroundColor: '#ffffff',
      pointBorderColor: blueColor,
      pointBorderWidth: 2,
    }],
  };

  const barChartData = {
    labels: categoryLabels,
    datasets: [{
      label: selectedMonth ? `Expenditure by Category in ${selectedMonth}` : 'Expenditure by Category',
      data: categoryAmounts,
      backgroundColor: brandColor + 'cc',
      borderColor: brandColor,
      borderWidth: 1,
      borderRadius: 6,
    }],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1F2833',
        titleFont: { family: 'Outfit' },
        bodyFont: { family: 'Inter' },
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: context => ` ₹${context.parsed.y.toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { family: 'Inter' } }
      },
      y: {
        border: { dash: [4, 4] },
        grid: { color: '#e5e7eb' },
        ticks: { font: { family: 'Inter' }, stepSize: 100 }
      }
    }
  };

  const lineChartOptions = {
    ...commonOptions,
    onClick: (evt, elements) => {
      if (elements.length === 0) return setSelectedMonth(null);
      const chart = elements[0].element.$context.chart;
      const index = elements[0].index;
      const clickedMonth = chart.data.labels[index];
      setSelectedMonth(prev => (prev === clickedMonth ? null : clickedMonth));
    },
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const totalAmount = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Expense Details', 14, 22);
    doc.setFontSize(12);
    let yPos = 30;
    expenses.forEach((expense, idx) => {
      const line = `${idx + 1}. ${expense.category} - ₹${expense.amount} - ${formatDate(expense.date)}`;
      doc.text(line, 14, yPos);
      yPos += 10;
      if (yPos > 280) { doc.addPage(); yPos = 20; }
    });
    yPos += 10;
    doc.setFontSize(14);
    doc.setTextColor(0, 102, 204);
    doc.text(`Total Amount: ₹${expenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2)}`, 14, yPos);
    doc.save('SpendWise_Expenses.pdf');
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-gray-100 font-sans relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
         <div className="absolute top-[10%] right-[5%] w-72 h-72 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold font-display mb-2">
              Financial <span className="text-gradient">Overview</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Analyze your spending patterns</p>
          </div>
          <button onClick={downloadPDF} className="mt-6 md:mt-0 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full hover:bg-brand-600 dark:hover:bg-gray-200 font-medium transition-all shadow-lg flex items-center gap-2">
            <HiOutlineArrowDownTray size={20} />
            Export PDF
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="glass-card p-6 md:p-8 rounded-3xl relative overflow-hidden h-[450px]">
            <h2 className="text-xl font-bold font-display mb-2">
              Monthly Trends {selectedMonth && <span className="text-brand-500">(Selected: {selectedMonth})</span>}
            </h2>
            <p className="text-sm text-gray-500 mb-6">Click on a point to filter by month</p>
            <div className="h-[300px] relative z-10">
              <Line data={lineChartData} options={lineChartOptions} />
            </div>
          </div>

          <div className="glass-card p-6 md:p-8 rounded-3xl relative overflow-hidden h-[450px]">
            <h2 className="text-xl font-bold font-display mb-6">
              {selectedMonth ? `Spending by Category in ${selectedMonth}` : 'Total Spending by Category'}
            </h2>
            <div className="h-[320px] relative z-10">
              <Bar data={barChartData} options={commonOptions} />
            </div>
          </div>
        </div>

        <div className="glass-card p-8 rounded-3xl">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
            <h2 className="text-2xl font-bold font-display">Transaction History</h2>
            <div className="text-xl mt-2 sm:mt-0">
               <span className="text-gray-500 dark:text-gray-400 text-base mr-2">Total Amount:</span>
               <span className="font-bold text-gray-900 dark:text-white">₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div id="expense-list" className="max-h-[400px] overflow-y-auto pr-4 space-y-3">
             {filteredExpenses.length === 0 ? (
                <div className="text-center py-10 text-gray-500">No transactions found.</div>
             ) : (
                filteredExpenses.slice(0, visibleCount).map((expense, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4 bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold">
                        {expense.category.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">{expense.category}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(expense.date)}</p>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">₹{parseFloat(expense.amount).toFixed(2)}</span>
                  </div>
                ))
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
