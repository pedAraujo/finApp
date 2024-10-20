import pymongo
from fastapi import APIRouter, HTTPException, status
from app.schemas.user_schema import UserAuth, UserResponse
from app.services import user_service
from app.models.user_model import User
from fastapi import Depends
from datetime import datetime
from fastapi.security import OAuth2PasswordBearer
from app.core.config import settings
from jose import jwt
from pydantic import ValidationError
from app.schemas.auth_schema import TokenPayload

user_router = APIRouter()

reusable_oauth = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_STR}/auth/login", scheme_name="JWT"
)


async def get_current_user(token: str = Depends(reusable_oauth)) -> User:
    try:
        payload = jwt.decode(
            token, settings.JWT_SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        token_data = TokenPayload(**payload)

        if datetime.fromtimestamp(token_data.exp) < datetime.now():
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="JWT token expired",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except (jwt.JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = await user_service.get_user_by_id(token_data.sub)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )

    return user


@user_router.post("/create", summary="Create a new user", response_model=UserResponse)
async def create_user(data: UserAuth):
    try:
        return await user_service.create_user(data)
    except pymongo.errors.DuplicateKeyError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with email or username already exists",
        )


@user_router.get(
    "/me",
    summary="Get details of currently logged in user",
    response_model=UserResponse,
)
async def get_me(user: User = Depends(get_current_user)):
    return user
