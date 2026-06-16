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
    "https://www.ai-code-reviewer-nine-nu.vercel.app",
    "https://www.ai-code-reviewer-git-main-krishs-projects-d8c81696.vercel.app",
    "https://www.ai-code-reviewer-krishs-projects-d8c81696.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    # allow_origins=origins,      
    allow_methods=["*"],        
    allow_headers=["*"],        
)

app.include_router(users.router,prefix="/api", tags=["Users & Auth"])
app.include_router(analyze.router,prefix="/api", tags=["Code Analysis"])
app.include_router(history.router,prefix="/api", tags=["History"])

@app.get("/")
def read_root():
    return {"message": "Welcome to AI Code Review API"}
