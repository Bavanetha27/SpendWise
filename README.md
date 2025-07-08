# SpendWise

## Overview

**SpendWise** is a full-stack **Expense Tracker Web Application** that helps users efficiently manage and track their expenses. It leverages AI for automatic expense categorization and integrates a **friendly chatbot powered by Botpress** to provide personalized financial advice based on user queries. The app also supports image-based OCR for receipt processing and dynamic visualizations to analyze spending patterns.

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

* **AI Chatbot Integration**
  A smart, interactive chatbot (via **Botpress**) helps users reduce expenses by giving friendly, human-like financial advice. It responds to natural language queries like "How do I save on food?" or "I'm spending too much on subscriptions."

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
* **Chatbot:** Botpress Cloud (Free, no-code/low-code chatbot)
* **Deployment:** Render & Vercel

---

## Getting Started

### Prerequisites

* Node.js and npm installed
* Python 3.x installed
* MongoDB instance (local or cloud)

---

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
   cd ml-service
   pip install -r requirements.txt
   ```

4. Frontend setup:

   ```bash
   cd frontend
   npm install
   ```

5. Environment variables:

   Create a `.env` file in the `backend` directory with the following:

   ```
   MONGODB_URL=your_mongodb_connection_string
   SECRET_KEY=your_jwt_secret
   ```

---

## Usage

* Run the ML API server:

  ```bash
  cd ml-service
  uvicorn ml_model_api:app --host 0.0.0.0 --port 8000
  ```

* Run the backend server:

  ```bash
  cd backend
  node index.js
  ```

* Run the frontend server:

  ```bash
  cd frontend
  npm start
  ```

* Open the app in your browser at:
  `http://localhost:3000`

---

## 💬 Chatbot Integration (Botpress Cloud)

The project includes a user-friendly **chatbot advisor** that helps users with saving tips and budget advice.

### How It Works:

* Users can ask questions like:

  * “I spend too much on food”
  * “How to save on bills?”
  * “What subscriptions should I cancel?”

* The Botpress chatbot uses an AI-powered **Knowledge Base** to understand queries and respond with personalized, helpful advice.

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
│   ├── train_model.py        # ML model training
│   └── requirements.txt      # Python dependencies
│
├── /README.md               # Project overview and instructions
├── /LICENSE                 # MIT License file 
```

---

## License

This project is licensed under the MIT License.

---

## Contact

For questions or suggestions, feel free to reach out:
📧 [bavanethamr@gmail.com](mailto:bavanethamr@gmail.com)