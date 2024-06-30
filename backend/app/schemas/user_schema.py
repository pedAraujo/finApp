from typing import Optional
from uuid import UUID
from pydantic import BaseModel, EmailStr, Field


class UserAuth(BaseModel):
    email: EmailStr = Field(..., description="user email")
    username: str = Field(..., max_length=50, description="user username")
    password: str = Field(..., min_length=5, max_length=24, description="user password")
    first_name: Optional[str] = Field(
        None, max_length=50, description="user first name"
    )
    last_name: Optional[str] = Field(None, max_length=50, description="user last name")


class UserOut(BaseModel):
    user_id: UUID
    username: str
    email: EmailStr
    first_name: Optional[str]
    last_name: Optional[str]
    disabled: Optional[bool] = False
