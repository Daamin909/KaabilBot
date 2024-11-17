from flask import Flask, request, jsonify
from flask_cors import CORS
# from main import audio_to_text
import messages as m
# import accounts as acc
import os

app = Flask(__name__)
CORS(app)

@app.route('/api/fetch-messages', methods=['POST'])
def fetchMessages():
    return jsonify(m.fetch_messages())

@app.route('/api/write-messages', methods=['POST'])
def writeMessages():
    data = request.get_json()['data']
    return jsonify(m.write_messages(data))

@app.route('/api/get-response', methods=['POST'])
def getResponse():
    message = request.get_json()['message']
    return jsonify( m.get_response(message))

@app.route('/api/speech', methods=['POST'])
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

@app.route('/api/check-email', methods=['POST'])
def check_email():
    return jsonify(acc.check_email("to be done later"))

@app.route('/api/otp', methods=['POST'])
def otp():
    email = request.get_json()
    x = acc.send_otp(email)
    print(x)
    return jsonify(x)


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)