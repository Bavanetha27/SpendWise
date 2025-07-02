import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import jsPDF from 'jspdf';
import { FaFilePdf } from 'react-icons/fa';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.warn('Token not found.');
      return;
    }

    axios.get('https://spendwise-m6e5.onrender.com/expenses', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        const sortedExpenses = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setExpenses(sortedExpenses);
      })
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

  const lineChartData = {
    labels: monthLabels,
    datasets: [{
      label: 'Monthly Expenditures',
      data: monthAmounts,
      borderColor: '#FF5733',
      borderWidth: 2,
      fill: false,
      pointHoverRadius: 10,
      pointRadius: 6,
      pointHitRadius: 10,
    }],
  };

  const barChartData = {
    labels: categoryLabels,
    datasets: [{
      label: selectedMonth ? `Expenditure by Category in ${selectedMonth}` : 'Expenditure by Category',
      data: categoryAmounts,
      backgroundColor: '#4CAF50',
      borderColor: '#388E3C',
      borderWidth: 1,
    }],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 50 },
      },
    },
    onClick: (evt, elements) => {
      if (elements.length === 0) return setSelectedMonth(null);
      const chart = elements[0].element.$context.chart;
      const index = elements[0].index;
      const clickedMonth = chart.data.labels[index];
      setSelectedMonth(prev => (prev === clickedMonth ? null : clickedMonth));
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          label: context => `$${context.parsed.y.toFixed(2)}`,
        },
      },
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const totalAmount = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Expense Details', 14, 22);
    doc.setFontSize(12);
    let yPos = 30;

    expenses.forEach((expense, idx) => {
      const line = `${idx + 1}. ${expense.category} - $${expense.amount} - ${formatDate(expense.date)}`;
      doc.text(line, 14, yPos);
      yPos += 10;
      if (yPos > 280) {
        doc.addPage();
        yPos = 20;
      }
    });

    yPos += 10;
    doc.setFontSize(14);
    doc.setTextColor(0, 102, 204);
    doc.text(`Total Amount: $${expenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2)}`, 14, yPos);

    doc.save('expenses.pdf');
  };

  return (
    <div className="p-10 max-w-7xl mx-auto bg-gray-50 dark:bg-gray-900 rounded-lg shadow-xl">
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">Expense Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="p-6 rounded-lg shadow-lg border border-gray-400 cursor-pointer">
          <h2 className="text-2xl font-semibold mb-4">
            Monthly Expenditure Changes {selectedMonth && `(Selected: ${selectedMonth})`}
          </h2>
          <Line data={lineChartData} options={chartOptions} />
          <p className="mt-2 text-sm text-gray-600">
            Click on a month to filter category expenses. Click outside to reset.
          </p>
        </div>

        <div className="p-6 rounded-lg shadow-lg border border-gray-400">
          <h2 className="text-2xl font-semibold mb-4">
            {selectedMonth ? `Expenditure by Category in ${selectedMonth}` : 'Expenditure by Category'}
          </h2>
          <Bar data={barChartData} options={chartOptions} />
        </div>
      </div>

      <div className="p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Added Expenditures</h2>
          <button onClick={downloadPDF} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center space-x-2">
            <FaFilePdf />
            <span>Download PDF</span>
          </button>
        </div>

        <div id="expense-list" className="max-h-80 overflow-y-auto pr-2">
          <ul className="space-y-4">
            {filteredExpenses.slice(0, visibleCount).map((expense, idx) => (
              <li key={idx} className="flex justify-between items-center">
                <div>
                  <strong>{expense.category}</strong><br />
                  <span className="text-sm">{formatDate(expense.date)}</span>
                </div>
                <span className="text-lg font-semibold">${expense.amount}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 text-right font-bold text-lg text-indigo-700">
          Total: ${totalAmount.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
