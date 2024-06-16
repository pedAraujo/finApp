import uvicorn
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

from .logging import logger
from .pluggy import pluggy


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialize application services on startup and close them on shutdown"""
    db_client = AsyncIOMotorClient(settings.MONGO_CONNECTION_STRING).finapp
    await init_beanie(
        database=db_client,
        document_models=[],
    )
    yield


app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan,
)
logger.info("App started")


origins = ["https://localhost:8081"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def index() -> dict:
    logger.info("Request to index route")
    return {"message": "Hello, world!"}


@app.post("/pluggy-connect-token")
async def connect_token() -> dict:
    logger.info("Request to connect token route")
    try:
        token = pluggy.get_connect_token()
        return {"accessToken": token}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
