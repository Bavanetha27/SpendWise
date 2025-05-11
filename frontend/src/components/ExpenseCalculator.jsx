import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Tesseract from 'tesseract.js';

const ExpenseCalculator = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [ocrText, setOcrText] = useState('');
  const [expenses, setExpenses] = useState([]);

  const { transcript, resetTranscript } = useSpeechRecognition();

  const handleStartListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: false });
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
    setDescription(transcript);
  };

  const handleImageUpload = (e) => {
    const image = e.target.files[0];
    if (image) {
      Tesseract.recognize(image, 'eng', {
        logger: (m) => console.log(m),
      }).then(({ data: { text } }) => {
        setOcrText(text);

        const lines = text.split('\n').filter(line => line.trim() !== '');
        const parsedExpenses = lines.map(line => {
          const match = line.match(/^(.*)\s+\$\s*([\d,]+)/);
          if (match) {
            return {
              category: match[1].trim(),
              amount: parseFloat(match[2].replace(/,/g, '')) || 0,
              date: new Date().toISOString().split('T')[0],
              description: 'Imported from image',
            };
          }
          return null;
        }).filter(item => item !== null);

        setExpenses(prev => [...prev, ...parsedExpenses]);
      });
    }
  };

  const handleAddExpense = () => {
    const newExpense = {
      amount: parseFloat(amount),
      category,
      date,
      description,
    };
    setExpenses([...expenses, newExpense]);
    setAmount('');
    setCategory('');
    setDate('');
    setDescription('');
    setOcrText('');
  };

  const handleDeleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, idx) => idx !== index);
    setExpenses(updatedExpenses);
  };

  return (
    <div className="p-28 max-w-7xl mx-auto bg-gray-50 dark:bg-gray-900 rounded-lg shadow-xl transition-colors duration-500">
      <h1 className="text-4xl font-bold text-center text-indigo-600 dark:text-indigo-300 mb-8">Expense Calculator</h1>

      {/* Split layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Manual Entry Form */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Manual Entry</h2>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 mb-4 w-full focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 mb-4 w-full focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 mb-4 w-full focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 mb-4 w-full focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            rows="3"
          ></textarea>
          <button
            onClick={handleAddExpense}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Add Manual Expense
          </button>
        </div>

        {/* Right side: OCR, speech-to-text */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Image & Speech Input</h2>

          {/* Speech-to-text buttons */}
          <div className="mb-6">
            <button
              onClick={handleStartListening}
              className="bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600 transition mr-3"
            >
              🎤 Start
            </button>
            <button
              onClick={handleStopListening}
              className="bg-red-500 text-white px-5 py-3 rounded-lg hover:bg-red-600 transition"
            >
              🛑 Stop
            </button>
          </div>

          {/* Image Upload for OCR */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-3 dark:text-white"
          />
          {ocrText && (
            <div className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              <strong className="block text-gray-800 dark:text-gray-200">OCR Extracted Text:</strong>
              <p>{ocrText}</p>
            </div>
          )}

          {/* Paragraph Textarea */}
          <textarea
            placeholder="Add notes or paste OCR text..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 w-full focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            rows="4"
          ></textarea>
        </div>
      </div>

      {/* Expenses List */}
      <div className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Added Expenses</h2>
        <ul>
          {expenses.map((exp, index) => (
            <li
              key={index}
              className="border-b py-3 text-gray-800 dark:text-gray-100 flex justify-between items-center"
            >
              <div>
                <strong>${exp.amount}</strong> - {exp.category} on {exp.date}
                <br />
                <span className="text-sm text-gray-600 dark:text-gray-400">{exp.description}</span>
              </div>
              <button
                onClick={() => handleDeleteExpense(index)}
                className="text-red-500 hover:text-red-700 transition"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseCalculator;
