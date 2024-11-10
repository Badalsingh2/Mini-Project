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
    
    if not pd.to_numeric(df['proto'], errors='coerce').notna().all():
        df['proto'] = proto_encoder.transform(df['proto'])
    # Your logic here for 'proto' column not being numeric

    if not pd.to_numeric(df['state'], errors='coerce').notna().all():
        df['state'] = state_encoder.transform(df['state'])
        # Your logic here for 'state' column not being numeric

    if not pd.to_numeric(df['service'], errors='coerce').notna().all():
        df['service'] = service_encoder.transform(df['service'])
    # Your logic here for 'service' column not being numeric


    # df['proto'] = proto_encoder.transform(df['proto'])
    # df['service'] = service_encoder.transform(df['service'])
    # df['state'] = state_encoder.transform(df['state'])

    
    df1 = df.apply(lambda x:np.log(x+1))
    
    scaled_df = scaler.fit_transform(df1) 
    
    return pd.DataFrame(scaled_df, columns=df.columns)
    

def label_processing(data):
    model_dir = os.path.join(os.path.dirname(__file__),'models')
    label1 = joblib.load(os.path.join(model_dir,'label1.joblib'))
    proto_encoder = joblib.load(os.path.join(model_dir, 'proto_encoder.joblib'))
    service_encoder = joblib.load(os.path.join(model_dir, 'service_encoder.joblib'))
    state_encoder = joblib.load(os.path.join(model_dir, 'state_encoder.joblib'))
    labelscaler = joblib.load(os.path.join(model_dir,'scaler.joblib'))

    df = pd.DataFrame(data)
    
    if not pd.to_numeric(df['proto'], errors='coerce').notna().all():
        df['proto'] = proto_encoder.transform(df['proto'])
    # Your logic here for 'proto' column not being numeric

    if not pd.to_numeric(df['state'], errors='coerce').notna().all():
        df['state'] = state_encoder.transform(df['state'])
        # Your logic here for 'state' column not being numeric

    if not pd.to_numeric(df['service'], errors='coerce').notna().all():
        df['service'] = service_encoder.transform(df['service'])
    # print(df)
    

# Now you can apply .iloc to remove the last row
    
    scaled_df = labelscaler.transform(df)
    
    
    return pd.DataFrame(scaled_df,columns=df.columns)