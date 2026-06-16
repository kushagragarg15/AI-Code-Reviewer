import os
import uuid
from datetime import datetime
from fastapi import APIRouter, UploadFile, HTTPException, Request, Form, Depends
from fastapi.responses import FileResponse
from bson import ObjectId

from models.pdf_generator import PDFReportGenerator
from models.request_model import AnalyzeRequest
from services.code_review_service import CodeReviewService
from auth.authController import get_current_user
from db.mongo import history_collection

router = APIRouter()

@router.post("/analyze/json")
async def analyze_code_json(
    payload: AnalyzeRequest, 
    current_user: dict = Depends(get_current_user)
):
    service = CodeReviewService()
    if not payload.code:
        raise HTTPException(status_code=400, detail="No code provided.")
    
    analysis_result = service.analyze_code(language=payload.language, code_text=payload.code)

    # Save to history
    history_collection.insert_one({
        "user_id": current_user["_id"],
        "language": payload.language,
        "timestamp": datetime.utcnow(),
        "analysis_result": analysis_result
    })
    
    return analysis_result

@router.post("/analyze/file")
async def analyze_code_file(
    language: str = Form(...),
    file: UploadFile = None,
    current_user: dict = Depends(get_current_user)
):
    service = CodeReviewService()
    if not file:
        raise HTTPException(status_code=400, detail="No file provided.")
    
    ext = os.path.splitext(file.filename)[1]
    temp_name = f"upload_{uuid.uuid4()}{ext}"
    temp_path = os.path.join("temp_uploads", temp_name)
    os.makedirs("temp_uploads", exist_ok=True)

    with open(temp_path, "wb") as f:
        f.write(await file.read())

    analysis_result = service.analyze_code(language=language, file_path=temp_path)
    os.remove(temp_path) 

    history_collection.insert_one({
        "user_id": current_user["_id"],
        "language": language,
        "timestamp": datetime.utcnow(),
        "analysis_result": analysis_result
    })

    return analysis_result

@router.post("/analyze/pdf")
async def get_pdf(request: Request):
    try:
        report_data = await request.json() 
        generator = PDFReportGenerator()
        pdf_path = generator.generate(report_data=report_data)
        return FileResponse(pdf_path, media_type="application/pdf", filename=os.path.basename(pdf_path))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PDF generation failed: {str(e)}")