from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm
from bson import ObjectId

from models.request_model import UserCreate, Token
from auth.security import get_password_hash, verify_password
from auth.jwtHandler import create_access_token
from db.mongo import user_collection

router = APIRouter()

@router.post("/users", status_code=status.HTTP_201_CREATED)
async def create_user(user: UserCreate):
    """
        Endpoint for user signup.
    """
    try:
        print(f"Signup attempt for email: {user.email}")
        
        existing_user = user_collection.find_one({"email": user.email})
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="An account with this email already exists.",
            )
        
        hashed_password = get_password_hash(user.password)
        user_data = {"email": user.email, "hashed_password": hashed_password}
        
        result = user_collection.insert_one(user_data)
        
        print(f"User created successfully: {user.email}")
        return {"id": str(result.inserted_id), "email": user.email}
    
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error during signup: {type(e).__name__}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred during signup: {str(e)}"
        )


@router.post("/users/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    """
        Endpoint for user login, returns JWT.
    """
    user = user_collection.find_one({"email": form_data.username})
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": user["email"]})
    return {"access_token": access_token, "token_type": "bearer"}