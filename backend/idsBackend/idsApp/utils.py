import joblib
import pandas as pd
import os
import numpy as np

def preprocess_data(data):
    models_dir = os.path.join(os.path.dirname(__file__), 'models')
    proto_encoder = joblib.load(os.path.join(models_dir, 'proto_encoder.joblib'))
    service_encoder = joblib.load(os.path.join(models_dir, 'service_encoder.joblib'))
    state_encoder = joblib.load(os.path.join(models_dir, 'state_encoder.joblib'))
    scaler = joblib.load(os.path.join(models_dir, 'scaler.joblib'))

    df = pd.DataFrame(data)

    # df['proto'] = proto_encoder.transform(df['proto'])
    # df['service'] = service_encoder.transform(df['service'])
    # df['state'] = state_encoder.transform(df['state'])
    df1 = df.apply(lambda x:np.log(x+1))
    scaled_df = scaler.transform(df1) 
    return pd.DataFrame(scaled_df, columns=df.columns)
    

def label_processing(data):
    model_dir = os.path.join(os.path.dirname(__file__),'models')
    label1 = joblib.load(os.path.join(model_dir,'label1.joblib'))
    labelscaler = joblib.load(os.path.join(model_dir,'scaler.joblib'))

    df = pd.DataFrame(data)
    
    scaled_df = labelscaler.transform(df)
    return pd.DataFrame(scaled_df,columns=df.columns)