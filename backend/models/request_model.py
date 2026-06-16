from pydantic import BaseModel, EmailStr
from typing import Optional

class AnalyzeRequest(BaseModel):
    code: str
    language: str
    user: Optional[dict] = None

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None