from typing import Optional
from uuid import UUID
from app.schemas.user_schema import UserAuth
from app.models.user_model import User
from app.core.security import get_password, verify_password


class UserService:
    @staticmethod
    async def create_user(user: UserAuth):
        user_instance = User(
            username=user.username,
            email=user.email,
            hash_password=get_password(user.password),
            first_name=user.first_name,
            last_name=user.last_name,
        )
        await user_instance.insert()
        return user_instance

    @staticmethod
    async def authenticate(email: str, password: str) -> Optional[User]:
        user = await UserService.get_user_by_email(email=email)
        if not user:
            return None
        if not verify_password(password=password, hashed_password=user.hash_password):
            return None
        return user

    @staticmethod
    async def get_user_by_email(email: str) -> Optional[User]:
        return await User.find_one(User.email == email)

    @staticmethod
    async def get_user_by_id(id: UUID) -> Optional[User]:
        return await User.find_one(User.user_id == id)
