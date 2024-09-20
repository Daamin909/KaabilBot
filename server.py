from flask import Flask, request, jsonify
from flask_cors import CORS
from main import audio_to_text, get_response
import os
from pydub import AudioSegment

AudioSegment.convezrter = r"C:\ffmpeg-7.0.2-essentials_build\ffmpeg-7.0.2-essentials_build\bin\ffmpeg.exe"
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
        return jsonify({'error': 'No audio file provided'})
    
    audio_file = request.files['audio']
    webm_path = 'audio.webm'
    wav_path = 'audio.wav'
    
    try:
        audio_file.save(webm_path)
        app.logger.info(f"WebM file saved. Size: {os.path.getsize(webm_path)} bytes")
        audio = AudioSegment.from_file(webm_path, format="webm")
        audio.export(wav_path, format="wav")
        app.logger.info(f"Converted to WAV. Size: {os.path.getsize(wav_path)} bytes")
        userContent = audio_to_text(wav_path)
        botContent = get_response(userContent)
        return jsonify({'response': botContent, 'requestPrompt': userContent})

    except Exception as e:
        app.logger.error(f"Error processing audio: {str(e)}")
        return jsonify({'error': f'Error processing audio: {str(e)}'})


if __name__ == '__main__':
    app.run(debug=True)