import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

GEMINI_API_KEY = os.getenv("GOOGLE_API_KEY")
GEMINI_MODEL = "models/gemini-2.0-flash"

# Configure the Gemini client
genai.configure(api_key=GEMINI_API_KEY)

def call_gemini(prompt: str) -> str:
    try:
        # Create the model instance
        model = genai.GenerativeModel(GEMINI_MODEL)

        # Direct content generation (NOT chat)
        response = model.generate_content(prompt)

        # Return the generated text
        return response.text

    except Exception as e:
        raise Exception(f"Gemini API request failed: {str(e)}")