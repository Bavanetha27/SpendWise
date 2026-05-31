import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Tesseract from 'tesseract.js';
import axios from 'axios';
import { HiOutlineMicrophone, HiOutlineStop, HiOutlineCamera, HiOutlinePlus, HiOutlineTrash } from 'react-icons/hi2';
import { BACKEND_URL } from '../config';

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

const ExpenseCalculator = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [ocrText, setOcrText] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);

  const { transcript, resetTranscript } = useSpeechRecognition();

  const processTextToExpenses = async (text) => {
    if (!text || text.trim() === '') return;
    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/category`,
        { text },
        { headers: authHeaders() }
      );
      const newExpenses = response.data.map(exp => ({
        ...exp,
        date: exp.date || new Date().toISOString().split('T')[0],
      }));
      setExpenses(prev => [...prev, ...newExpenses]);
    } catch (error) {
      const msg = error.response?.data?.error || 'Error processing expenses. Please try again.';
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleStartListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: false });
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
    setDescription(transcript);
    processTextToExpenses(transcript);
  };

  const handleImageUpload = (e) => {
    const image = e.target.files[0];
    if (image) {
      setLoading(true);
      Tesseract.recognize(image, 'eng')
        .then(({ data: { text } }) => {
          setOcrText(text);
          processTextToExpenses(text);
        })
        .catch(() => alert('Failed to extract text from image.'))
        .finally(() => setLoading(false));
    }
  };

  const handleAddExpense = async () => {
    if (!amount || !category) {
      alert('Please fill in at least the amount and category.');
      return;
    }
    const token = localStorage.getItem('token');
    if (!token) { alert('User not authenticated.'); return; }

    const newExpense = {
      amount: parseFloat(amount),
      category,
      date: date || new Date().toISOString().split('T')[0],
      description,
    };

    try {
      const { data: savedExpense } = await axios.post(
        `${BACKEND_URL}/add`,
        newExpense,
        { headers: authHeaders() }
      );
      setExpenses(prev => [savedExpense, ...prev]);
      setAmount('');
      setCategory('');
      setDate('');
      setDescription('');
      setOcrText('');
    } catch (error) {
      const msg = error.response?.data?.message || 'Server error while saving expense.';
      alert('Failed to save expense: ' + msg);
    }
  };

  const handleDeleteExpense = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this expense?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BACKEND_URL}/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(prevExpenses => prevExpenses.filter(exp => exp._id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
      alert("Failed to delete expense.");
    }
  };

  const inputClasses = "w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl p-3 mb-4 focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:text-white transition-all outline-none";

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-gray-100 font-sans transition-colors duration-500 relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
         <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-brand-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
         <div className="absolute top-[30%] right-[10%] w-80 h-80 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold font-display mb-4">
            Expense <span className="text-gradient">Calculator</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Easily add, track, and manage your daily expenses.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Manual Entry Form */}
          <div className="glass-card p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-400 to-blue-500"></div>
            <h2 className="text-2xl font-bold font-display mb-6">Manual Entry</h2>
            <div className="grid grid-cols-2 gap-4">
              <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className={`${inputClasses} col-span-2 sm:col-span-1`} />
              <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className={`${inputClasses} col-span-2 sm:col-span-1`} />
            </div>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputClasses} />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className={inputClasses} rows="3"></textarea>
            
            <button onClick={handleAddExpense} className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold px-6 py-3.5 rounded-xl hover:bg-brand-600 dark:hover:bg-gray-200 transition-colors shadow-md flex justify-center items-center gap-2">
              <HiOutlinePlus size={20} /> Add Expense
            </button>
          </div>

          {/* AI & OCR Entry Form */}
          <div className="glass-card p-8 rounded-3xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-pink-500"></div>
             <h2 className="text-2xl font-bold font-display mb-6">AI & Receipt Scan</h2>
             
             <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-800/50 rounded-xl p-5 mb-6">
                <p className="text-sm text-brand-700 dark:text-brand-300 mb-4 font-medium">Record a voice memo to log expenses naturally.</p>
                <div className="flex gap-4">
                  <button onClick={handleStartListening} className="flex-1 bg-white dark:bg-gray-800 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-700 px-4 py-2.5 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-900/40 transition-colors flex items-center justify-center gap-2 shadow-sm font-medium">
                    <HiOutlineMicrophone size={20} /> Record
                  </button>
                  <button onClick={handleStopListening} className="flex-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/50 px-4 py-2.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center gap-2 shadow-sm font-medium">
                    <HiOutlineStop size={20} /> Stop
                  </button>
                </div>
                {transcript && <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 italic">"{transcript}"</p>}
             </div>

             <div className="mb-4 relative">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                   <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <HiOutlineCamera className="w-8 h-8 text-gray-500 dark:text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> a receipt</p>
                   </div>
                   <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
             </div>
             
             {loading && (
              <div className="flex items-center justify-center gap-2 text-brand-500 font-medium my-4">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing with AI...
              </div>
            )}

            <textarea placeholder="AI Extracted Text" value={ocrText} onChange={(e) => setOcrText(e.target.value)} className={`${inputClasses} mb-0`} rows="3" readOnly={loading}></textarea>
          </div>
        </div>

        {/* Expenses List */}
        <div className="glass-card rounded-3xl p-8 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 border-b border-gray-200 dark:border-gray-700 pb-6">
            <h2 className="text-2xl font-bold font-display">Recent Expenses</h2>
            <div className="bg-brand-50 dark:bg-brand-900/20 px-6 py-3 rounded-2xl border border-brand-100 dark:border-brand-800/50 mt-4 sm:mt-0">
               <span className="text-gray-600 dark:text-gray-400 mr-2 font-medium">Total:</span>
               <span className="text-2xl font-bold text-brand-600 dark:text-brand-400">
                  ₹{expenses.reduce((total, exp) => total + parseFloat(exp.amount), 0).toFixed(2)}
               </span>
            </div>
          </div>
          
          {expenses.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              No expenses recorded yet. Start adding them above!
            </div>
          ) : (
            <ul className="space-y-4">
              {expenses.map((exp, index) => (
                <li key={exp._id || index} className="group flex flex-col sm:flex-row justify-between items-center p-4 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-900 flex items-center justify-center font-bold text-lg text-gray-700 dark:text-gray-300">
                      ₹{Math.round(exp.amount)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg">{exp.category}</h4>
                      <div className="flex gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>{exp.date}</span>
                        {exp.description && <span>• {exp.description}</span>}
                      </div>
                    </div>
                  </div>
                  <button onClick={() => handleDeleteExpense(exp._id)} className="p-3 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors mt-4 sm:mt-0 w-full sm:w-auto flex justify-center">
                    <HiOutlineTrash size={20} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseCalculator;
