#!/bin/bash
echo "Installing Python dependencies..."
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
