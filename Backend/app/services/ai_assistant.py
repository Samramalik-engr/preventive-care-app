
# import os
# import requests

# from dotenv import load_dotenv

# load_dotenv()

# API_KEY = os.getenv("MISTRAL_API_KEY")


# def ask_ai(prompt: str):

#     url = "https://api.mistral.ai/v1/chat/completions"

#     headers = {
#         "Authorization": f"Bearer {API_KEY}",
#         "Content-Type": "application/json"
#     }

#     payload = {
#         "model": "mistral-small-latest",
#         "messages": [
#             {
#                 "role": "user",
#                 "content": prompt
#             }
#         ]
#     }

#     response = requests.post(
#         url,
#         headers=headers,
#         json=payload
#     )

#     result = response.json()

#     return result["choices"][0]["message"]["content"] 

import os
import requests

from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("MISTRAL_API_KEY")


def ask_ai(prompt: str):

    url = "https://api.mistral.ai/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "mistral-small-latest",
        "messages": [
            {
                "role": "system",
                "content": """
You are an AI Preventive Care Assistant.

Always answer using the patient data provided.

Do NOT give generic healthcare responses.

Do NOT respond with:
'Would you like me to focus on screenings, vaccinations, lifestyle modifications...'

Instead:

- Explain the patient's condition.
- Explain risk factors.
- Explain risk score and risk level.
- Explain medical history.
- Give preventive care recommendations.
- Use simple language.
- Give direct answers.
"""
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        "temperature": 0.3
    }

    try:

        response = requests.post(
            url,
            headers=headers,
            json=payload,
            timeout=30
        )

        result = response.json()

        print("===== MISTRAL RESPONSE =====")
        print(result)

        if "choices" not in result:
            return f"AI Error: {result}"

        return result["choices"][0]["message"]["content"]

    except Exception as e:

        print("AI ERROR:", e)

        return f"Error generating AI response: {str(e)}" 