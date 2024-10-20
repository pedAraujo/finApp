from fastapi import APIRouter
from app.api import auth, pluggy, user

router = APIRouter()

router.include_router(pluggy.pluggy_router, prefix="/pluggy", tags=["pluggy"])
router.include_router(auth.auth_router, prefix="/auth", tags=["auth"])
router.include_router(user.user_router, prefix="/user", tags=["user"])
