from fastapi import APIRouter
from app.api.api_v1.handlers import user_handler
from app.api.api_v1.handlers import pluggy_handler
from app.api.auth import auth_jwt

router = APIRouter()

router.include_router(user_handler.user_router, prefix="/users", tags=["users"])
router.include_router(auth_jwt.auth_router, prefix="/auth", tags=["auth"])
router.include_router(pluggy_handler.pluggy_router, prefix="/pluggy", tags=["pluggy"])
