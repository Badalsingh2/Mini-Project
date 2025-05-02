# 🔐 Network Intrusion Detection Using Machine Learning: A Multi-Dataset Web Application

Welcome to our Network Intrusion Detection System (NIDS), an AI-powered project that detects and classifies malicious network activity across traditional, IoT, and real-time IoT environments. This project integrates machine learning research with a full-stack web application built using **Django** (backend) and **Next.js with TypeScript** (frontend).

---

## 📌 Overview

With rising cyber threats, accurate and real-time intrusion detection is more important than ever. Our system analyzes network traffic and uses pre-trained machine learning models to determine:

- If an **attack** is present
- What **type of attack** occurred

We evaluated our models using **three diverse datasets** to ensure generalizability across various environments.

---

## 📊 Datasets & Results

### ✅ 1. UNSW-NB15 (Traditional Networks)
- **Binary Classification**
  - Logistic Regression: `93.93% accuracy`
  - Random Forest: `95% accuracy`, `100% recall`
  - XGBoost: `88% accuracy`, `100% recall`, high false positives
- **Multi-Class Classification (9 categories)**
  - XGBoost: `94% accuracy`
  - High precision on Generic and Normal
  - Low F1-scores for rare attacks like Backdoor (17%)

---

### 🛰️ 2. BoT-IoT (IoT Networks)
- **Model:** LSTM Neural Network
- `61% accuracy`
- `96% recall` for Reconnaissance attacks
- `25% recall` for Normal traffic (false positive issue)

---

### ⚙️ 3. RT_IoT2022 (Real-Time IoT)
- **Model:** Random Forest
- `99.6% accuracy` overall
- `100% F1-score` on most classes
- Slight recall drop for rare classes (e.g., Category 5: 67%)

---

## 🌐 Web Application

### Backend: Django
- REST API for uploading data and receiving predictions
- Hosts trained ML models
- Handles both binary and multi-class classification

### Frontend: Next.js (TypeScript)
- Upload network data (CSV)
- Shows:
  - Attack status
  - Type of attack
  - Confidence scores
  - Graphs & metrics (via charts)

---

## 📁 Project Structure

```
.
├── backend/
│   ├── ml_models/            # Pickle (.pkl) files for trained models
│   ├── views.py              # Prediction logic
│   └── urls.py, serializers.py
├── frontend/
│   ├── pages/                # TSX routes
│   ├── components/           # Reusable UI components
│   └── services/api.ts       # API integration
├── datasets/                 # Sample input files
├── README.md
├── requirements.txt
└── package.json
```

---

## 🚀 Getting Started

### 🔧 Backend Setup (Django)

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

> API: `http://localhost:8000/api/predict/`

---

### 🌐 Frontend Setup (Next.js)

```bash
cd frontend
npm install
npm run dev
```

> Frontend: `http://localhost:3000`

---

## 🔍 Example Use Case

1. Upload sample network traffic data
2. Backend returns:
   - Binary result: Normal or Attack
   - If Attack → classify the type (multi-class)
3. Frontend displays:
   - Labels
   - Confidence scores
   - Optional graphs like bar charts and confusion matrix

---

## 🧠 Key Takeaways

- **Random Forest** models show strong general performance across datasets
- IoT environments need **customized models** like LSTM
- **Perfect recall** is achievable with proper model tuning
- Class imbalance affects rare attack detection (e.g., Backdoor, DoS)
- **Feature engineering** is critical for precision

---

## 🔮 Future Work

- Real-time traffic monitoring (PCAP integration)
- Ensemble learning (combine RF, XGBoost, DL)
- Model optimization via AutoML
- Docker-based deployment
- Integration with enterprise SIEM tools

---

## 👥 Authors

- 🎓 Badal Singh - Machine Learning, Backend 
- 👨‍💻 Aadil Attar,Allauddin Ansari - Dataset Analysis, Model Training, Frontend Design and Developement

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🙋 Feedback

Feel free to open an issue or submit a pull request for suggestions or improvements.
