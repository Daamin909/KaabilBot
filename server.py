from flask import Flask, request, jsonify
from flask_cors import CORS
from main import audio_to_text, get_response
import messages as m
import json
import os

app = Flask(__name__)
CORS(app)

@app.route('/chat', methods=['POST'])
def chat():
    return jsonify({'response': get_response(request.get_json()['prompt'])})

@app.route('/speech', methods=['POST'])
def speech():
    if 'audio' not in request.files:
        return jsonify(False)
    audio_file = request.files['audio']
    try:
        audio_file_path = os.path.join(os.path.dirname(__file__), 'temp_audio.webm')
        audio_file.save(audio_file_path)
        userContent = audio_to_text('temp_audio.webm')
        os.remove(audio_file_path)  
        if userContent == False:
            return jsonify(False)
        botContent = get_response(userContent)
        return jsonify({'response': botContent, 'requestPrompt': userContent})
    except Exception as e:
        return jsonify(False)

@app.route('/read', methods=['POST'])
def read():
    messageData = m.read_messages()
    if messageData is False:
        return jsonify(False)
    else:
        return json.dumps(messageData)

@app.route('/check', methods=['POST'])
def check():
    try:
        return jsonify(m.messages_exist())
    except:
        return jsonify(False)

@app.route('/createFile', methods=['POST'])
def createFile():
    try:
        return jsonify(m.create_message_document())
    except:
        return jsonify(False)

@app.route('/write', methods=['POST'])
def write():
    data = request.get_json()
    return jsonify(m.write_messages(data))

if __name__ == '__main__':
    app.run(debug=True)