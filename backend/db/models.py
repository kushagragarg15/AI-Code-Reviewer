from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class UserModel(BaseModel):
    id: str = Field(..., alias="_id")
    email: str
    hashed_password: str

class AnalysisHistoryModel(BaseModel):
    id: str = Field(..., alias="_id")
    user_id: str
    language: str
    timestamp: datetime
    analysis_result: dict 