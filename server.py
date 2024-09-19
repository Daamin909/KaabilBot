from flask import Flask, request, jsonify
from flask_cors import CORS
from main import audio_to_text, recite, get_response
app = Flask(__name__)
CORS(app)

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.get_json()
    response = get_response(user_input['prompt'])
    return jsonify({'response': response})

@app.route('/speech', methods=['POST'])
def upload_audio():
    if 'audio' not in request.files:
        print ("shit hasn't happened")
        return jsonify({'error': 'No audio file provided'}), 400
    audio_file = request.files['audio']
    audio_file.save('audio.wav')
    print("shit has happened")
    return jsonify({'message': 'File successfully uploaded'}), 200

if __name__ == '__main__':
    app.run(debug=True)