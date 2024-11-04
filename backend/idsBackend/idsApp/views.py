from django.shortcuts import render

# Create your views here.
# views.py
import pandas as pd
import numpy as np
from django.shortcuts import render
from django.http import HttpResponse
from .utils import preprocess_data,label_processing
import os
import joblib


def upload_file(request):
    if request.method == 'POST' and request.FILES['excel_file']:
        excel_file = request.FILES['excel_file']

        # Read the Excel file
        try:
            df = pd.read_excel(excel_file)
        except Exception as e:
            return HttpResponse(f"Error reading Excel file: {e}", status=400)

        # Process the data in df as needed, e.g., extract specific columns, rows, etc.
        # Example: display the first few rows


        first_rows = preprocess_data(df)
        
        models_dir = os.path.join(os.path.dirname(__file__), 'models', 'model1.joblib')
        models_dir1 = os.path.join(os.path.dirname(__file__), 'models', 'inverse_encoder.joblib')
        
        # Load the model
        try:
            model1 = joblib.load(models_dir)
            model2 = joblib.load(models_dir1)
        except FileNotFoundError:
            return HttpResponse("Model file not found.", status=404)
        except PermissionError:
            return HttpResponse("Permission denied for model file.", status=403)
        
        # prediction
        predictions = model1.predict(first_rows)

        real_predict = model2.inverse_transform(predictions)
        
        df['prediction'] = real_predict

        result_html = df.to_html()

        # Return a response (you could also save the processed data to your database here)
        return HttpResponse(f"<h2>Data preview:</h2>{result_html}")
    else:
        return render(request, 'upload_file.html')



def label_predictor(request):
    if request.method == 'POST' and request.FILES['excel_file']:
        excel_file = request.FILES['excel_file']

        # Read the Excel file
        try:
            df = pd.read_excel(excel_file)
        except Exception as e:
            return HttpResponse(f"Error reading Excel file: {e}", status=400)

        # Process the data in df as needed, e.g., extract specific columns, rows, etc.
        # Example: display the first few rows
        model_dir = os.path.join(os.path.dirname(__file__),'models')
        model2 = joblib.load(os.path.join(model_dir,'labelmodel.joblib'))

        data = label_processing(df)
        predictions = model2.predict(data)
        unique_values, counts = np.unique(predictions, return_counts=True)

# Combine unique values and counts into a dictionary for easy interpretation
        value_counts = dict(zip(unique_values, counts))

        return HttpResponse(f"<h2>Data preview:</h2>{value_counts}")
    else:
        return render(request, 'uploadlabel.html')