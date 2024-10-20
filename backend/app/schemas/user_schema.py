# Description: Pydantic schemas for user model. Schemas are used to validate API request and response data in FastAPI.

from uuid import UUID
from pydantic import BaseModel, EmailStr, Field


class UserAuth(BaseModel):
    email: EmailStr = Field(..., description="user email")
    username: str = Field(..., max_length=50, description="user username")
    password: str = Field(..., min_length=5, max_length=24, description="user password")
    first_name: str | None = Field(None, max_length=50, description="user first name")
    last_name: str | None = Field(None, max_length=50, description="user last name")


class UserResponse(BaseModel):
    user_id: UUID
    username: str
    email: EmailStr
    first_name: str | None
    last_name: str | None
    disabled: bool | None = False
