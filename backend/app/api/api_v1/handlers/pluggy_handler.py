from fastapi import APIRouter, Depends, HTTPException, status
import httpx
from app.services import pluggy_service
from app.logging import logger
from app.api.dependencies.httpx_deps import get_client
from app.api.dependencies.user_deps import get_current_user
from app.models.user_model import User

pluggy_router = APIRouter()


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
