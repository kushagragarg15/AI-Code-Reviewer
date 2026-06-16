from fastapi import HTTPException
import logging
import json
import os
from models.code import CodeFromText, CodeFromFile
from models.analyzer import GeminiCodeAnalyzer
from models.pdf_generator import PDFReportGenerator
from google import genai
from dotenv import load_dotenv
load_dotenv()

class CodeReviewService:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("Missing GEMINI_API_KEY")
        self.analyzer = GeminiCodeAnalyzer(genai.Client(api_key=api_key))

    def analyze_code(self, language:str = None, code_text: str = None, file_path: str = None, user=None) ->dict:
        try:
            if file_path:
                code = CodeFromFile(file_path, language)
            elif code_text:
                code = CodeFromText(code_text, language)
            else:
                raise HTTPException(status_code=400, detail="No code or file provided.")

            report = self.analyzer.analyze(code)
            return report

        except json.JSONDecodeError as e:
            logging.error("Failed to parse Gemini response", exc_info=e)
            raise HTTPException(status_code=500, detail="Invalid response from AI model.")

        except FileNotFoundError as e:
            logging.error(f"Code file not found: {file_path}", exc_info=e)
            raise HTTPException(status_code=400, detail=f"File not found: {file_path}")

        except Exception as e:
            logging.exception("Unexpected error during code analysis")
            raise HTTPException(status_code=500, detail=str(e))

    


