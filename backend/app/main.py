import uvicorn
from fastapi import FastAPI
from .logging import logger

app = FastAPI()
logger.info("App started")


@app.get("/")
async def index() -> dict:
    logger.info("Request to index route")
    return {"message": "Hello, world!"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
