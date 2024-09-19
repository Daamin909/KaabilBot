from flask import Flask, request, jsonify
from flask_cors import CORS
from main import audio_to_text, recite, get_response
app = Flask(__name__)
CORS(app)

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.get_json()
    response = get_response(user_input['prompt'])
    print(user_input['prompt']) 
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
