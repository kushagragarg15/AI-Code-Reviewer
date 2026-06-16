from fastapi import FastAPI
from routes import analyze, users, history # Import new routers
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="AI Code Review Backend",
    description="Backend API for analyzing and reviewing code using LLMs.",
    version="1.0.0"
)

origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://ai-code-reviewer-c9nn.onrender.com",
    "*"  # Allow all for now, restrict after Vercel deployment
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Temporary - update after getting Vercel URL
    allow_methods=["*"],        
    allow_headers=["*"],
    allow_credentials=True,
)

app.include_router(users.router,prefix="/api", tags=["Users & Auth"])
app.include_router(analyze.router,prefix="/api", tags=["Code Analysis"])
app.include_router(history.router,prefix="/api", tags=["History"])

@app.get("/")
def read_root():
    return {"message": "Welcome to AI Code Review API"}
