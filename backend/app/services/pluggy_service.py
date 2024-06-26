from app.core.config import settings


async def get_api_key(client) -> str:
    auth_url = f"{settings.PLUGGY_BASE_URL}/auth"
    payload = {
        "clientId": settings.PLUGGY_CLIENT_ID,
        "clientSecret": settings.PLUGGY_CLIENT_SECRET,
    }
    headers = {"accept": "application/json", "content-type": "application/json"}

    response = await client.post(auth_url, json=payload, headers=headers)
    response_data = response.json()

    if response.status_code != 200:
        raise Exception(f"Error fetching API key: {response_data}")

    return response_data["apiKey"]


async def get_connect_token(client) -> str:
    token_url = f"{settings.PLUGGY_BASE_URL}/connect_token"
    api_key = await get_api_key(client)
    payload = {"options": {"clientUserId": "My App UserId"}}
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "X-API-KEY": api_key,
    }

    response = await client.post(token_url, json=payload, headers=headers)
    response_data = response.json()

    if response.status_code != 200:
        raise Exception(f"Error fetching connect token: {response_data}")

    return response_data
