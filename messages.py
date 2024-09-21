import os
from os import path


homePath = os.path.expanduser("~")
messagesFilePath= "/AppData/Local/Programs/KaabilBot/chat/messages.json"
audioFilePath= "/AppData/Local/Programs/KaabilBot/audio"


def messagesExist():
    # true if json file exists
    return path.exists(homePath+messagesFilePath)
def audioExist():
    # true if audio folder exists
    return path.exists(homePath+audioFilePath)
def createMessageFilePath():
    try:
        os.makedirs(path.dirname(homePath+messagesFilePath), exist_ok=True)
        with open(homePath+messagesFilePath, 'w') as f:
            f.write('[]')
        return True
    except:
        return False   
def createAudioFilePath():
    try:
        os.makedirs(path.dirname(homePath+audioFilePath+'/audio.mp3'), exist_ok=True)
        return True
    except:
        return False
def write(data):
    try:
        with open(homePath+messagesFilePath, 'w') as f:
            f.write(data)
        return True
    except:
        return False
def readFile():
    try:
        with open(homePath+messagesFilePath, 'r') as f:
            return f.read()
    except:
        return False