import os
from typing import List
from dotenv import load_dotenv
from pydantic import AnyHttpUrl
from pydantic_settings import BaseSettings

load_dotenv()


class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY")
    JWT_REFRESH_SECRET_KEY: str = os.getenv("JWT_REFRESH_SECRET_KEY")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []
    PROJECT_NAME: str = "FINAPP"

    # Database
    MONGO_CONNECTION_STRING: str = os.getenv("MONGO_CONNECTION_STRING")

    # Pluggy
    PLUGGY_CLIENT_ID: str = os.getenv("PLUGGY_CLIENT_ID")
    PLUGGY_CLIENT_SECRET: str = os.getenv("PLUGGY_CLIENT_SECRET")
    PLUGGY_BASE_URL: str = "https://api.pluggy.ai"

    class Config:
        case_sensitive = True


settings = Settings()
