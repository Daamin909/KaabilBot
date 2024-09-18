from openai import OpenAI
import os
from os import path
import wave
import pyaudio
import pyttsx3 as tts
from dotenv import load_dotenv
import speech_recognition as sr
load_dotenv()

client = OpenAI(api_key=os.getenv("API_KEY"))
def get_response(prompt):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content
def recorder(filename, duration=5, sample_rate=44100, chunk=1024, channels=1):
    audio_format = pyaudio.paInt16
    p = pyaudio.PyAudio()
    stream = p.open(format=audio_format,
                    channels=channels,
                    rate=sample_rate,
                    input=True,
                    frames_per_buffer=chunk)
    frames = []
    for i in range(0, int(sample_rate / chunk * duration)):
        data = stream.read(chunk)
        frames.append(data)
    stream.stop_stream()
    stream.close()
    p.terminate()
    wf = wave.open(filename, 'wb')
    wf.setnchannels(channels)
    wf.setsampwidth(p.get_sample_size(audio_format))
    wf.setframerate(sample_rate)
    wf.writeframes(b''.join(frames))
    wf.close()

def audio_to_text(filename):
    AUDIO_FILE = path.join(path.dirname(path.realpath(__file__)), filename)
    r = sr.Recognizer()
    with sr.AudioFile(AUDIO_FILE) as source:
        audio = r.record(source)  
    try:
        global content
        content= r.recognize_sphinx(audio)
    except sr.UnknownValueError:
        print("Sphinx could not understand audio")
    except sr.RequestError as e:
        print("Sphinx error; {0}".format(e))

def recite(text):
    speaker = tts.init()
    speaker.say(text)
    newVolume=200
    speaker.setProperty('volume', newVolume)
    voices = speaker.getProperty('voices')
    speaker.setProperty('voice', voices[1])
    speaker.runAndWait()

text = input("Do you want to type or speak? T/S")
recited = input("Do you want to recite the response? Y/N")
if text.lower() == "t":
    prompt = input("Enter your prompt: ")
    response = get_response(prompt)
elif text.lower() == "s":
    recorder("audio.wav", duration=input("Enter the duration of the recording in seconds: "))
    audio_to_text("audio.wav")
    response = get_response(content)
else :
    print("Invalid input")

if recited.lower() == "y":
    recite(response)
elif recited.lower() == "n":
    print(response)