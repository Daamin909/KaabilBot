from pymongo import MongoClient
from dotenv import load_dotenv
import os
import random
import math
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import threading

load_dotenv()

try:
    client = MongoClient(os.getenv('MONGO_URL'))
    db = client["kaabilbot"]
    accounts_collection = db["accounts"]
    otp_collection = db["otp"]
except Exception as e:
    print(e)

def remove_otp(email):
    try:
        data = otp_collection.find_one()
        for i in range(len(data["otpstorage"])):
            if email in data["otpstorage"][i]:
                data["otpstorage"].pop(i)
                break
        otp_collection.delete_many({})
        otp_collection.insert_one(data)
        print("OTP removed")
    except Exception as e:
        print(e)

def generate_otp(email):
    otp = random.randint(100000, 999999)
    changed = False
    try:
        if otp_collection.find_one({"otpstorage": {"$exists": True}}) is None:
            otp_collection.insert_one({"otpstorage": []})
        data = otp_collection.find_one()
        for i in range(len(data["otpstorage"])):
            if email in data["otpstorage"][i]:
                data["otpstorage"][i][email] = otp
                changed = True  
                break
        if not changed:
            data["otpstorage"].append({email: otp})
        otp_collection.delete_many({})
        otp_collection.insert_one(data)
        threading.Timer(15, remove_otp, args=[email]).start()
    except Exception as e:
        print(e)
    return otp

def check_email(email):
    sigma = email
    print(sigma)
    # to be done after the database is set up
    return True

def send_otp(receiver_email):
    otp = generate_otp(receiver_email)
    sender_email = "kaabilbot@gmail.com"
    password = os.getenv('SMTP_PASSWORD')
    subject = "Your OTP Code"
    body = f"{otp} is your OTP code. Please do not share it with anyone. This OTP will expire in 5 minutes. THIS IS A SYSTEM GENERATED EMAIL. PLEASE DO NOT REPLY TO THIS EMAIL."
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email  
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))
    email_text = msg.as_string()
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()  
        server.login(sender_email, password)
        server.sendmail(sender_email, str(receiver_email), email_text)  
        return True
    except :
        print(e)
        return False
    finally:
        server.quit()