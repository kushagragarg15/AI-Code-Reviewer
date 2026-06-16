from abc import ABC, abstractmethod
from typing import List

class Prompt(ABC):
    def __init__(self, prompt: str, key: str):
        self._prompt = prompt
        self._key = key

    @abstractmethod
    def get_prompt(self) -> str:
        pass

    @abstractmethod
    def get_key(self) -> str:
        pass


class CodeOverviewPrompt(Prompt):
    def __init__(self):
        super().__init__(
            "Start with a fun, one-sentence summary. Then, in a new paragraph, explain what the code does logically, step-by-step, like you're explaining it to a colleague. Use markdown for code elements like `variable_names` or `functionNames()`.",
            "code_overview"
        )

    def get_prompt(self):
        return self._prompt

    def get_key(self):
        return self._key
    
class CodeStyleAndReadabilityPrompt(Prompt):
    def __init__(self):
        super().__init__(
            "Analyze the code for style and readability. Check for things like consistent indentation, use of whitespace, and comment quality. Provide a summary and a list of specific, actionable suggestions in a 'suggestions' array.",
            "readability_review"
        )
    def get_prompt(self): return self._prompt
    def get_key(self): return self._key


class NamingConventionPrompt(Prompt):
    def __init__(self):
        super().__init__(
            "Review the variable and function names. Are they descriptive? For each name that could be improved, provide a suggestion in a key-value pair where the key is the original name and the value is an object containing 'suggestion'. If all names are great, return an object with a single key 'status' and value 'Excellent! The names are clear and descriptive.'",
            "naming_convention_review"
        )

    def get_prompt(self):
        return self._prompt

    def get_key(self):
        return self._key


class TimeComplexityPrompt(Prompt):
    def __init__(self):
        super().__init__(
            "Analyze the time complexity. Return a JSON object with two keys: 'complexity' (e.g., 'O(N^2)') and 'explanation'. In the explanation, use a simple analogy to explain what the complexity means in short. For example, for O(N^2), you could say 'like Chess squares in a chessboard, where each square represents a task and you have to check every square against every other square.'",
            "time_complexity"
        )

    def get_prompt(self):
        return self._prompt

    def get_key(self):
        return self._key


class SpaceComplexityPrompt(Prompt):
    def __init__(self):
        super().__init__(
            "Analyze the space complexity. Return a JSON object like the time complexity, with 'complexity' and 'explanation' keys. Use a simple analogy in short. For example, for O(N), you could say 'It's like needing one storage locker for each item you want to store.'",
            "space_complexity"
        )

    def get_prompt(self):
        return self._prompt

    def get_key(self):
        return self._key



class OptimizationPrompt(Prompt):
    def __init__(self):
        super().__init__(
            "Provide actionable optimization advice. Start by identifying the main bottleneck or area for improvement. Then, provide a clear explanation of the 'why' behind the optimization. Include Expected Time and Space Complexity as nested object. Include a corrected code snippet in a markdown block. If the code is already a masterpiece, respond with a single key 'status' and a value like 'Bravo! This code is clean, efficient, and a joy to read. No optimizations needed.'",
            "optimization"
        )

    def get_prompt(self):
        return self._prompt

    def get_key(self):
        return self._key

class OverallScoreAndTitlePrompt(Prompt):
    def __init__(self):
        super().__init__(
            "Based on all the previous analysis points (overview, naming, complexity, optimization, readability, security), provide a final JSON object. It should have two keys: 'score' (an integer from 1 to 10) and 'title' (a witty, fun, and creative headline for this entire code review report, like 'The Little Engine That Could... Be Faster!' or 'A Solid Foundation for Greatness').",
            "final_verdict"
        )
    def get_prompt(self): return self._prompt
    def get_key(self): return self._key

class CompositePrompt:
    def __init__(self):
        self.prompts: List[Prompt] = [
            CodeOverviewPrompt(),
            NamingConventionPrompt(),
            TimeComplexityPrompt(),
            SpaceComplexityPrompt(),
            CodeStyleAndReadabilityPrompt(),
            OptimizationPrompt(),
            OverallScoreAndTitlePrompt() 
        ]

    def get_prompt(self) -> List[str]:
        return [prompt.get_prompt() for prompt in self.prompts]

    def get_keys(self) -> List[str]:
        return [prompt.get_key() for prompt in self.prompts]

    def add_prompt(self, prompt: Prompt):
        self.prompts.append(prompt)
