import os
from pymongo import MongoClient
from dotenv import load_dotenv
from groq import Groq
import markdown2 as m2
load_dotenv()
try:
    client = MongoClient(os.getenv("MONGO_URL"))
    db = client["kaabilbot"]
    messages_collection = db["messages"]
    client.admin.command('ismaster')
except Exception as e:
    print(e)


def write_messages(data):
    try:
        messages_collection.delete_many({})
        messages_collection.insert_one({"data": data})
        return True
    except Exception as e:
        return False
    
def fetch_messages():
    try:
        result = messages_collection.find_one({}, {"_id": 0})
        if (result):
            return result['data']
        else: 
            try:
                messages_collection.insert_one({"data": []})    
                return messages_collection.find_one({}, {"_id": 0})
            except:
                return False
    except Exception as e:
        return False
    
def get_response(input):
    client = Groq(api_key=os.getenv("API_KEY_LLM"))
    response = client.chat.completions.create(
        model="llama-3.1-70b-versatile",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": input}
        ],
        temperature=1,
        max_tokens=1024,
        top_p=1,
        stream=False,
        stop=None,
    )
    return m2.markdown(response.choices[0].message.content)
