from flask import Flask, request, jsonify
from flask_cors import CORS
from main import audio_to_text, get_response
import messages as m
import os
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.get_json()
    response = get_response(user_input['prompt'])
    return jsonify({'response': response})

@app.route('/speech', methods=['POST'])
def speech():
    if 'audio' not in request.files:
        return jsonify({'error': True})
    audio_file = request.files['audio']
    try:
        audio_file_path = os.path.join(os.path.dirname(__file__), 'temp_audio.webm')
        audio_file.save(audio_file_path)
        userContent = audio_to_text('temp_audio.webm')
        os.remove(audio_file_path)  
        if userContent == False:
            return jsonify({'error': True})
        botContent = get_response(userContent)
        return jsonify({'response': botContent, 'requestPrompt': userContent})
    except Exception as e:
        return jsonify({'error': True})



@app.route('/check', methods=['POST'])
def check():
    try:
        messages_exist = m.messages_exist()
        number_exist = m.number_exist()
        return jsonify({'messages': messages_exist, 'number': number_exist})
    except Exception as e:
        logger.error(f"Error in /check endpoint: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/createFiles', methods=['POST'])
def createFiles():
    filetype = request.get_json()
    try:
        if filetype['file'] == 'messages':
            print(jsonify({'bool': m.create_message_document()}))
            return jsonify({'bool': True})
        elif filetype['file'] == 'number':
            print(jsonify({'bool': m.create_number_document()}))
            return jsonify({'bool': True})
    except:
        return jsonify({'bool': False})

@app.route('/read', methods=['POST'])
def read():
    chatHistory = m.read_messages()
    if chatHistory is False:
        return jsonify({'json': False})
    else:
        return jsonify({'json': chatHistory})

@app.route('/rean', methods=['POST'])
def rean():
    numberData = m.read_number()
    if numberData is False:
        return jsonify({'json': 'error'})
    else:
        return jsonify({'json': numberData})

@app.route('/writn', methods=['POST'])
def writn():
    data = request.get_json()
    if m.write_number(data['number_of_messages']):
        return jsonify({'bool': True})
    else:
        return jsonify({'bool': False})

@app.route('/write', methods=['POST'])
def write():
    data = request.get_json()
    if m.write_messages(data):
        return jsonify({'bool': True})
    else:
        return jsonify({'bool': False})


if __name__ == '__main__':
    app.run(debug=True)