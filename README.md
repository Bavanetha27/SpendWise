# SpendWise

## Overview

This project is a full-stack **Expense Tracker Web Application** that enables users to efficiently manage and track their expenses. The app leverages AI and Machine Learning to automatically categorize expenses based on the text extracted from uploaded receipts or images using OCR (Optical Character Recognition). Users can also visualize their spending patterns with dynamic graphs and gain insights to manage their finances better.

---

## Features

* **User Authentication**
  Secure signup and login with JWT-based authentication.

* **Expense Tracking**
  Add, edit, and delete expenses with categories, amounts, descriptions, and dates.

* **AI-Powered Categorization**
  Upload images or receipts; the app uses OCR to extract text and a Machine Learning model to categorize expenses automatically.

* **OCR Integration**
  Use Optical Character Recognition to read text from uploaded images for expense entry.

* **Visual Analytics**
  View expense summaries and trends through interactive graphs and charts.

* **User Profile Management**
  Update personal details and profile picture.

* **Dark Mode Support**
  Toggle between light and dark themes for better user experience.

* **Account Deletion**
  Users can securely delete their accounts along with all related expense data.

---

## Technology Stack

* **Frontend:** React.js, Tailwind CSS
* **Backend:** Node.js, Express.js, MongoDB
* **Authentication:** JWT (JSON Web Tokens)
* **AI/ML:** Python (scikit-learn, joblib), custom expense categorization model
* **OCR:** React OCR libraries 
* **Deployment:** Render & Vercel

---

## Getting Started

### Prerequisites

* Node.js and npm installed
* Python 3.x installed
* MongoDB instance (local or cloud)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/expense-tracker-ai.git
   cd expense-tracker-ai
   ```

2. Backend setup:

   ```bash
   cd backend
   npm install
   ```

3. Python environment setup:

   ```bash
   cd python
   pip install -r requirements.txt
   ```

4. Frontend setup:

   ```bash
   cd frontend
   npm install
   ```

5. Environment variables:

   Create a `.env` file in the backend directory with the following:

   ```
   MONGODB_URL=your_mongodb_connection_string
   SECRET_KEY=your_jwt_secret
   ```

---

## Usage

* Run python server(fast API):

  ```bash
  cd ml-service
  uvicorn ml_api:app --host 0.0.0.0 --port 8000
  ```

* Run backend server:

  ```bash
  cd backend
  node index.js
  ```

* Run frontend server:

  ```bash
  cd frontend
  npm start
  ```

* The app will be available at `http://localhost:3000`.

---

## How It Works

1. **User Signup/Login:** Users create an account or log in securely.
2. **Add Expenses:** Users manually add expenses or upload receipt images.
3. **ML Processing:** Uploaded images are processed by react OCR to extract text, which is then passed to the ML model for automatic categorization.
4. **Expense Visualization:** The app displays user expenses with charts and graphs for better analysis.
5. **Profile Management:** Users can update their profile info or delete their account.

---

## Folder Structure

```
/project-root
│
├── /backend                   # Node.js + Express server
│   ├── /controllers           # Handles business logic (e.g., categorize expenses, auth)
│   ├── /routes                # API routes (user routes, expense routes, etc.)
│   ├── /models                # Mongoose schemas (User, Expense)
│   ├── /middlewares           # JWT auth, error handlers, etc.
│   ├── /utils                 # Helper functions (e.g., API calls to ML service)
│   ├── .env                   # Environment variables (Mongo URI, secret key)
│   └── index.js               # Entry point for the Express server
│
├── /frontend                 # React app (client-side)
│   ├── /components           # Reusable UI components
│   ├── /assets               # Images, logos, CSS
│   └── App.jsx               # Main app file
│
├── /ml-service               # FastAPI-based ML microservice
│   ├── ml_model_api.py       # FastAPI server + model logic
│   ├── expense_classifier_model.pkl
│   ├── tfidf_vectorizer.pkl
│   ├── train_model.py        #ML model
│   └── requirements.txt      # Python dependencies
│
├── /README.md               # Project overview and instructions
├── /LICENSE                 # License file (e.g., MIT)
├── /package.json            # Node backend dependencies
```

---


## License

This project is licensed under the MIT License.

---

## Contact

For any questions or suggestions, contact: [bavanethamr@gmail.com](mailto:bavanethamr@gmail.com)

