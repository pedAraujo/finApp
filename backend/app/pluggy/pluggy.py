import os
import requests
from dotenv import load_dotenv

load_dotenv()


def get_api_key() -> str:
    auth_url = "https://api.pluggy.ai/auth"
    payload = {
        "clientId": os.getenv("PLUGGY_CLIENT_ID"),
        "clientSecret": os.getenv("PLUGGY_CLIENT_SECRET"),
    }
    headers = {"accept": "application/json", "content-type": "application/json"}
    response = requests.post(auth_url, json=payload, headers=headers)
    response_data = response.json()

    if response.status_code != 200:
        raise Exception(f"Error fetching API key: {response_data}")

    return response_data["apiKey"]


def get_connect_token() -> str:
    url = "https://api.pluggy.ai/connect_token"
    api_key = get_api_key()
    payload = {"options": {"clientUserId": "My App UserId"}}
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "X-API-KEY": api_key,
    }
    response = requests.post(url, json=payload, headers=headers)
    response_data = response.json()

    if response.status_code != 200:
        raise Exception(f"Error fetching connect token: {response_data}")

    return response_data["accessToken"]
