import os
from pymongo import MongoClient
from dotenv import load_dotenv
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()
try:
    client = MongoClient(os.getenv("MONGO_URL"))
    db = client["kaabilbot"]
    messages_collection = db["messages"]
    number_collection = db["number"]
    client.admin.command('ismaster')
    logger.info("Successfully connected to MongoDB")
except Exception as e:
    logger.error(f"Failed to connect to MongoDB: {e}")
    raise

def messages_exist():
    try:
        return messages_collection.count_documents({}) > 0
    except Exception as e:
        logger.error(f"Error checking messages: {e}")
        return False

def number_exist():
    try:
        return number_collection.count_documents({}) > 0
    except Exception as e:
        logger.error(f"Error checking number: {e}")
        return False

def create_message_document():
    try:
        messages_collection.insert_one({"empty": True})
        return True
    except Exception as e:
        logger.error(f"Error creating message document: {e}")
        return False

def create_number_document():
    try:
        number_collection.insert_one({"number_of_messages": 0})
        return True
    except Exception as e:
        logger.error(f"Error creating number document: {e}")
        return False

def write_messages(data):
    try:
        messages_collection.replace_one({}, data, upsert=True)
        return True
    except Exception as e:
        logger.error(f"Error writing messages: {e}")
        return False

def write_number(number):
    try:
        number_collection.replace_one({}, {"number_of_messages": number}, upsert=True)
        return True
    except Exception as e:
        logger.error(f"Error writing number: {e}")
        return False

def read_messages():
    try:
        return messages_collection.find_one({}, {"_id": 0})
    except Exception as e:
        logger.error(f"Error reading messages: {e}")
        return False

def read_number():
    try:
        return number_collection.find_one({}, {"_id": 0})
    except Exception as e:
        logger.error(f"Error reading number: {e}")
        return False