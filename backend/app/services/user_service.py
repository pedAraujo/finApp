from app.schemas.user_schema import UserAuth
from app.models.user_model import User
from app.core.security import get_password


class UserService:
    @staticmethod
    async def create_user(user: UserAuth):
        user_instance = User(
            username=user.username,
            email=user.email,
            hash_password=get_password(user.password),
        )
        await user_instance.insert()
        return user_instance
