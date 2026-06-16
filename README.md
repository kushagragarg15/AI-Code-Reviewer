# AI Code Reviewer

An AI-powered code review application that uses Google Gemini to analyze code quality, performance, and security.

## Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- MongoDB Atlas account (or local MongoDB instance)
- Google Gemini API key

## Project Structure

```
AI_Code_Reviewer-main/
├── backend/          # FastAPI backend
└── frontend/         # React + Vite frontend
```

## Setup Instructions

### 1. Backend Setup

#### Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

#### Configure Environment Variables

Edit the `backend/.env` file with your credentials:

```env
# MongoDB Configuration
DB_USERNAME=your_mongodb_username
DB_PASSWORD=your_mongodb_password

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_ALGORITHM=HS256

# Google Gemini API Configuration
GEMINI_API_KEY=your_gemini_api_key_here
```

**How to get these credentials:**

- **MongoDB**: Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), create a cluster, and get your credentials
- **JWT_SECRET**: Generate a random string (at least 32 characters) for security
- **GEMINI_API_KEY**: Get it from [Google AI Studio](https://makersuite.google.com/app/apikey)

#### Run the Backend

```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The backend will be available at: `http://localhost:8000`

API Documentation: `http://localhost:8000/docs`

### 2. Frontend Setup

#### Install Node Dependencies

```bash
cd frontend
npm install
```

#### Run the Frontend

```bash
cd frontend
npm run dev
```

The frontend will be available at: `http://localhost:5173`

## Running with Docker (Optional)

Backend includes a Dockerfile for containerized deployment:

```bash
cd backend
docker build -t ai-code-reviewer-backend .
docker run -p 8000:8000 --env-file .env ai-code-reviewer-backend
```

## Features

- **Code Analysis**: Upload code or paste it directly for AI-powered review
- **Performance Metrics**: Get time and space complexity analysis
- **Code Quality**: Review naming conventions and readability
- **Security & Optimization**: Identify potential improvements
- **User Authentication**: Secure login/signup with JWT
- **Analysis History**: Track all previous code reviews
- **PDF Reports**: Generate downloadable reports

## API Endpoints

- `POST /api/signup` - Create new user account
- `POST /api/login` - User login
- `POST /api/analyze` - Analyze code
- `GET /api/history` - Get analysis history
- `GET /api/history/{id}` - Get specific analysis

## Tech Stack

### Backend
- FastAPI
- Python 3.x
- MongoDB (PyMongo)
- Google Gemini AI
- JWT Authentication
- ReportLab (PDF generation)

### Frontend
- React 19
- Vite
- TailwindCSS
- React Router
- React Syntax Highlighter

## Troubleshooting

### Backend Issues

1. **Module Import Errors**: Make sure you're in the `backend` directory and all dependencies are installed
2. **MongoDB Connection Failed**: Verify your MongoDB credentials in `.env` and ensure your IP is whitelisted in MongoDB Atlas
3. **Gemini API Error**: Check that your API key is valid and has not exceeded rate limits

### Frontend Issues

1. **CORS Errors**: Ensure backend is running on port 8000
2. **Build Errors**: Delete `node_modules` and `package-lock.json`, then run `npm install` again

## Development Notes

- Backend runs on port 8000
- Frontend runs on port 5173
- CORS is configured to allow localhost development
- Authentication uses JWT tokens stored in localStorage

## License

This project is provided as-is for educational purposes.
