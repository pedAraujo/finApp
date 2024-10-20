from contextlib import asynccontextmanager
from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi.middleware.cors import CORSMiddleware
from beanie import init_beanie
from app.core.config import settings
from app.models.user_model import User
from app.core.logging import logger
from app.api import router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialize application services on startup and close them on shutdown"""
    db_client = AsyncIOMotorClient(settings.MONGO_CONNECTION_STRING)
    await init_beanie(
        database=db_client.finapp,
        document_models=[User],
    )
    yield


app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_STR}/openapi.json",
    lifespan=lifespan,
)
logger.info("App started")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix=settings.API_STR)
