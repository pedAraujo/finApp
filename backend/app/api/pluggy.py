import httpx
from fastapi import APIRouter, Depends, HTTPException, status
from app.services import pluggy_service
from app.core.logging import logger
from app.models.user_model import User
from app.api.user import get_current_user

pluggy_router = APIRouter()


async def get_client():
    # create a new client for each request
    async with httpx.AsyncClient() as client:
        # yield the client to the endpoint function
        yield client
        # close the client when the request is done


@pluggy_router.post("/connect-token", summary="Fetch a Pluggy connect token")
async def connect_token(
    client: httpx.AsyncClient = Depends(get_client),
    user: User = Depends(get_current_user),
) -> dict:
    try:
        logger.info("connect_token route")
        return await pluggy_service.get_connect_token(client)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching Pluggy connect token : {e}",
        )


@pluggy_router.post("/api-key", summary="Fetch a Pluggy API key")
async def get_api_key(
    client: httpx.AsyncClient = Depends(get_client),
    user: User = Depends(get_current_user),
) -> dict:
    try:
        logger.info("get_api_key route")
        return await pluggy_service.get_api_key(client)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching Pluggy API key : {e}",
        )
