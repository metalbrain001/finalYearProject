FROM python:3.10-slim

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y \
  gcc \
  g++ \
  python3-dev \
  build-essential \
  && rm -rf /var/lib/apt/lists/*

# Copy the entire fastapi_app directory
COPY fastapi_app/ ./fastapi_app/

# Copy the .pkl model
COPY LLM/recommender.pkl ./LLM/recommender.pkl

# Install numpy first to make sure it's compiled and ready
RUN pip install --no-cache-dir numpy==1.23.5

# Install dependencies
RUN pip install --no-cache-dir -r fastapi_app/requirements.txt

# Run from main.py
CMD ["uvicorn", "fastapi_app.main:app", "--host", "0.0.0.0", "--port", "8000"]
