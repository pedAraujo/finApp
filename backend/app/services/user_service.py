from uuid import UUID
from app.schemas.user_schema import UserAuth
from app.models.user_model import User
from app.repository.user_repository import UserRepo


async def create_user(user: UserAuth) -> User:
    return await UserRepo.create_user(user=user)


async def authenticate(email: str, password: str) -> User | None:
    return await UserRepo.authenticate(email=email, password=password)


async def get_user_by_email(email: str) -> User | None:
    return await UserRepo.get_user_by_email(email=email)


async def get_user_by_id(id: UUID) -> User | None:
    return await UserRepo.get_user_by_id(id=id)
