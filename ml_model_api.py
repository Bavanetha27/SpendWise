import sys
import json
import re
import os
import joblib
from datetime import datetime

# Load model and vectorizer
script_dir = os.path.dirname(os.path.abspath(__file__))
model = joblib.load(os.path.join(script_dir, 'expense_classifier_model.pkl'))
vectorizer = joblib.load(os.path.join(script_dir, 'tfidf_vectorizer.pkl'))

def apply_custom_corrections(text):
    # You can add some corrections here if needed or use a spelling correction library
    # For now, we keep this empty or you can add simple replacements
    return text

def clean_text(text):
    # Replace pipe symbols with newlines if needed and strip
    return re.sub(r'[|]+', '\n', text).strip()

def get_formatted_date():
    return datetime.now().strftime("%Y-%m-%d")

def predict_category(text):
    vec = vectorizer.transform([text])
    return model.predict(vec)[0]

def extract_expenses_from_phrase(phrase):
    """
    Extract multiple (amount, description) pairs from a phrase.
    Handles both:
    1) Description — Amount
    2) Amount Description
    """
    expenses = []

    pattern1 = re.compile(r'(.+?)\s*[-\u2013\u2014:]\s*\$?\s*([\d,.]+)')

    # Find all matches for pattern 1
    matches1 = pattern1.findall(phrase)
    for desc, amount_str in matches1:
        num = amount_str.replace('$', '').replace(',', '').strip()
        if '.' in num and len(num.split('.')[-1]) == 3:
            num = num.replace('.', '')  # handle European decimals like 10.000
        try:
            amount = float(num)
            desc = desc.strip()
            if desc:
                expenses.append((amount, desc))
        except:
            continue

    # Remove matched parts from phrase to avoid duplicates in pattern 2
    phrase_cleaned = pattern1.sub('', phrase)

    # Pattern 2: Amount Description (e.g., "32500 Groceries")
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

if __name__ == "__main__":
    input_data = sys.stdin.read().strip()

    try:
        json_input = json.loads(input_data)
        text = json_input.get("text", "")
    except json.JSONDecodeError:
        text = input_data

    expenses = process_expense_text(text)
    print(json.dumps(expenses))
