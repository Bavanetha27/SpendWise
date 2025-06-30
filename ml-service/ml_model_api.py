from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import json
import re
import os
import joblib
from datetime import datetime

app = FastAPI()

# Load model and vectorizer once at startup
script_dir = os.path.dirname(os.path.abspath(__file__))
model = joblib.load(os.path.join(script_dir, 'expense_classifier_model.pkl'))
vectorizer = joblib.load(os.path.join(script_dir, 'tfidf_vectorizer.pkl'))

class TextRequest(BaseModel):
    text: str

def apply_custom_corrections(text):
    return text

def clean_text(text):
    return re.sub(r'[|]+', '\n', text).strip()

def get_formatted_date():
    return datetime.now().strftime("%Y-%m-%d")

def predict_category(text):
    vec = vectorizer.transform([text])
    return model.predict(vec)[0]

def extract_expenses_from_phrase(phrase):
    expenses = []
    pattern1 = re.compile(r'(.+?)\s*[-\u2013\u2014:]\s*\$?\s*([\d,.]+)')
    matches1 = pattern1.findall(phrase)
    for desc, amount_str in matches1:
        num = amount_str.replace('$', '').replace(',', '').strip()
        if '.' in num and len(num.split('.')[-1]) == 3:
            num = num.replace('.', '')
        try:
            amount = float(num)
            desc = desc.strip()
            if desc:
                expenses.append((amount, desc))
        except:
            continue
    phrase_cleaned = pattern1.sub('', phrase)
    pattern2 = re.compile(r'(\$?\s*[\d,.]+)\s*([a-zA-Z\s]+?)(?=(\$?\s*[\d,.]+)|$)')
    matches2 = pattern2.findall(phrase_cleaned)
    for amount_str, desc, _ in matches2:
        num = amount_str.replace('$', '').replace(',', '').strip()
        if '.' in num and len(num.split('.')[-1]) == 3:
            num = num.replace('.', '')
        try:
            amount = float(num)
            desc = desc.strip()
            if desc:
                expenses.append((amount, desc))
        except:
            continue
    return expenses

def process_expense_text(text):
    text = clean_text(text)
    lines = text.split('\n')
    results = []
    for line in lines:
        line = line.strip()
        if not line:
            continue
        corrected = apply_custom_corrections(line)
        expense_parts = extract_expenses_from_phrase(corrected)
        for amount, desc in expense_parts:
            category = predict_category(desc)
            results.append({
                "amount": amount,
                "category": category,
                "description": desc,
                "date": get_formatted_date()
            })
    return results

@app.post("/predict")
async def predict_expenses(req: TextRequest):
    if not req.text:
        raise HTTPException(status_code=400, detail="Text input is required")

    expenses = process_expense_text(req.text)
    return expenses
