from fastapi import APIRouter, HTTPException, status
import pymongo
from app.schemas.user_schema import UserAuth, UserOut
from app.services.user_service import UserService
from app.models.user_model import User
from app.api.dependencies.user_deps import get_current_user
from fastapi import Depends

user_router = APIRouter()


@user_router.post("/create", summary="Create a new user", response_model=UserOut)
async def create_user(data: UserAuth):
    try:
        return await UserService.create_user(data)
    except pymongo.errors.DuplicateKeyError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with email or username already exists",
        )


@user_router.get(
    "/me", summary="Get details of currently logged in user", response_model=UserOut
)
async def get_me(user: User = Depends(get_current_user)):
    return user
