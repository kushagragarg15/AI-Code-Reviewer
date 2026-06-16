from fastapi import APIRouter, Depends, HTTPException
from typing import List

from auth.authController import get_current_user
from db.mongo import history_collection
from db.models import AnalysisHistoryModel

from bson import ObjectId

router = APIRouter()

@router.get("/history", response_model=List[AnalysisHistoryModel])
async def get_user_history(current_user: dict = Depends(get_current_user)):
    """Fetches all analysis history records for the authenticated user."""
    user_id = current_user["_id"]
    history_cursor = history_collection.find({"user_id": user_id}).sort("timestamp", -1)
    
    history_list = []
    for doc in history_cursor:
        doc["_id"] = str(doc["_id"]) 
        history_list.append(doc)

    return history_list