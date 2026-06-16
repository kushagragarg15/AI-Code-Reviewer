import os
from abc import ABC, abstractmethod
from utils.dictionaries import language_supported

class Code(ABC):
    def __init__(self, code: str, language: str = None):
        self.code = code
        self.language = language

    def get_language(self):
        return self.language
    def get_code(self):
        return self.code


class CodeFromFile(Code):
    def __init__(self, file_path: str, language: str = None):
        self.file_path = file_path
        with open(file_path, "r") as f:
            content = f.read()
        if language is None:
            language = self.detect_language(content)
        super().__init__(content, language)

    def detect_language(self) -> str:
        extension_language_map = language_supported # cpp , python, java
        extension = os.path.splitext(self.file_path)[1].lstrip(".")
        return extension_language_map.get(extension, "Unknown")
    
class CodeFromText(Code):
    def __init__(self, content: str, language: str = None):
        if language is None:
            language = self.detect_language(content)
        super().__init__(content, language)

    def detect_language(self, content: str) -> str:
        if "def " in content and "import " in content:
            return "Python"
        elif "#include" in content:
            return "C++"
        elif "public static void main" in content:
            return "Java"
        else:
            return "Python"