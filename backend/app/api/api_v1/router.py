from fastapi import APIRouter
from app.api.api_v1.handlers import user_handler

router = APIRouter()

router.include_router(user_handler.user_router, prefix="/users", tags=["users"])
