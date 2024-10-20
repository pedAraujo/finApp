from datetime import datetime, timedelta, timezone
from passlib.context import CryptContext
from typing import Any
from app.core.config import settings
from jose import jwt

password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_access_token(subject: str | Any, expiration_time: timedelta = None) -> str:
    if expiration_time is not None:
        expiration_time = datetime.now(timezone.utc) + expiration_time
    else:
        expiration_time = datetime.now(timezone.utc) + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )
    token_payload = {"exp": expiration_time, "sub": str(subject)}
    encoded_jwt = jwt.encode(
        token_payload, settings.JWT_SECRET_KEY, algorithm=settings.ALGORITHM
    )
    return encoded_jwt


def create_refresh_token(subject: str | Any, expiration_time: timedelta = None) -> str:
    if expiration_time is not None:
        expiration_time = datetime.now(timezone.utc) + expiration_time
    else:
        expiration_time = datetime.now(timezone.utc) + timedelta(
            minutes=settings.REFRESH_TOKEN_EXPIRE_MINUTES
        )
    token_payload = {"exp": expiration_time, "sub": str(subject)}
    encoded_jwt = jwt.encode(
        token_payload, settings.JWT_REFRESH_SECRET_KEY, algorithm=settings.ALGORITHM
    )
    return encoded_jwt


def get_password(password: str) -> str:
    return password_context.hash(password)


def verify_password(password: str, hashed_password: str) -> bool:
    return password_context.verify(password, hashed_password)
