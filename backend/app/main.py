import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .logging import logger
from .pluggy import pluggy

app = FastAPI()
logger.info("App started")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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
