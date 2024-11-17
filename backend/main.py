import os
from dotenv import load_dotenv
import markdown2 as m2
import os
from groq import Groq

load_dotenv()

clientSTT = Groq(api_key=f'{os.getenv("API_KEY_STT")}')   
# client = OpenAI(api_key=os.getenv("API_KEY"))

# def get_response(prompt):
#     response = client.chat.completions.create(
#         model="gpt-4o-mini",
#         messages=[
#             {"role": "system", "content": "You are a helpful assistant."},
#             {"role": "user", "content": prompt}
#         ]
#     )
#     return m2.markdown(response.choices[0].message.content)
def audio_to_text(filename="temp_audio.webm"):
    AUDIO_FILE = filename
    try:
        with open(AUDIO_FILE, "rb") as file:
            transcription = clientSTT.audio.transcriptions.create(
                file=(filename, file.read()),
                model="whisper-large-v3",
                response_format="verbose_json",
            )
        return transcription.text
    except:
        return False
    