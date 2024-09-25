import os
from pymongo import MongoClient
from dotenv import load_dotenv
load_dotenv()
try:
    client = MongoClient(os.getenv("MONGO_URL"))
    db = client["kaabilbot"]
    messages_collection = db["messages"]
    client.admin.command('ismaster')
except Exception as e:
    print(e)

def messages_exist():
    try:
        return messages_collection.count_documents({}) > 0
    except:
        return False

def create_message_document():
    try:
        messages_collection.insert_one({"data": []})
        return True
    except:
        return False

def write_messages(data):
    try:
        old_doc = messages_collection.find_one()
        if old_doc:
            old_data = old_doc.get('data', [])
            length = len(old_data)
            old_data.append(data)
            messages_collection.replace_one({}, {"data": old_data})
        else:
            messages_collection.insert_one({"data": [data]})
        if (len(messages_collection.find_one().get('data', []))==length+1):
            return True
        else:
            return False

    except:
        return False

def read_messages():
    try:
        result = messages_collection.find_one({}, {"_id": 0})
        return (result['data'])
    except:
        return False