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
from rest_framework.response import Response
from django.core.files.storage import default_storage
from rest_framework.decorators import api_view
from rest_framework import status
from django.conf import settings

@api_view(['POST'])
def upload_file(request):
    # Check if a file is uploaded in the request
    file = request.FILES.get('excel_file')
    
    if file:
        file_name = file.name
        data_directory = 'data/'

        data_directory_path = os.path.join(settings.MEDIA_ROOT, data_directory)
        os.makedirs(data_directory_path, exist_ok=True)
        # Save the file temporarily
        # Save the file with the specified directory path
        file_name_with_path = os.path.join(data_directory, file_name)
        file_path = default_storage.save(file_name_with_path, file)

        # Get the full path to the file
        file_path = default_storage.path(file_name_with_path)

        # Read the Excel file
        try:
            df = pd.read_excel(file_path)
            
        except Exception as e:
            return HttpResponse({"error": f"Error reading Excel file: {e}"}, status=status.HTTP_400_BAD_REQUEST)
        print("started")
        # Preprocess the data in df as needed, e.g., extract specific columns, rows, etc.
        first_rows = preprocess_data(df)  # Ensure preprocess_data is defined elsewhere
        
        # Load models
        models_dir = os.path.join(os.path.dirname(__file__), 'models', 'model1.joblib')
        models_dir1 = os.path.join(os.path.dirname(__file__), 'models', 'inverse_encoder.joblib')

        try:
            model1 = joblib.load(models_dir)
            model2 = joblib.load(models_dir1)
        except FileNotFoundError:
            return HttpResponse({"error": "Model file not found."}, status=status.HTTP_404_NOT_FOUND)
        except PermissionError:
            return HttpResponse({"error": "Permission denied for model file."}, status=status.HTTP_403_FORBIDDEN)

        # Generate predictions
        try:
            predictions = model1.predict(first_rows)
            real_predict = model2.inverse_transform(predictions)
            print(real_predict)
            df['prediction'] = real_predict
            count = df['prediction'].value_counts()
        except Exception as e:
            return Response({"error": f"Error during prediction: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        print(count)
        # Convert DataFrame to HTML
        result_html = df.to_html()
        df1 = pd.DataFrame(count)
        df2 = df1.to_html()
        # Return HTML preview of processed data
        return HttpResponse(df2, status=status.HTTP_200_OK)
    else:
        return HttpResponse({"error": "No file uploaded."}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def label_predictor(request):
    file = request.FILES.get('excel_file')
    if file:
        file_name = file.name
        data_directory = 'data/'

        data_directory_path = os.path.join(settings.MEDIA_ROOT, data_directory)
        os.makedirs(data_directory_path, exist_ok=True)
        # Save the file temporarily
        # Save the file with the specified directory path
        file_name_with_path = os.path.join(data_directory, file_name)
        file_path = default_storage.save(file_name_with_path, file)

        # Get the full path to the file
        file_path = default_storage.path(file_name_with_path)

        # Read the Excel file
        try:
            df = pd.read_excel(file_path)
            
        except Exception as e:
            return HttpResponse({"error": f"Error reading Excel file: {e}"}, status=status.HTTP_400_BAD_REQUEST)

        # Process the data in df as needed, e.g., extract specific columns, rows, etc.
        # Example: display the first few rows
        model_dir = os.path.join(os.path.dirname(__file__),'models')
        model2 = joblib.load(os.path.join(model_dir,'labelmodel.joblib'))

        data = label_processing(df)
        print(data)
        predictions = model2.predict(data)
        unique_values, counts = np.unique(predictions, return_counts=True)
        
        # Combine unique values and counts into a dictionary for easy interpretation
        value_counts = dict(zip(unique_values, counts))
        value_counts = {int(key): int(value) for key, value in value_counts.items()}
        print(value_counts)
        # Return the value counts as JSON
        return Response(value_counts, status=status.HTTP_200_OK)
    else:
        return Response({"error": "No file provided."}, status=status.HTTP_400_BAD_REQUEST)