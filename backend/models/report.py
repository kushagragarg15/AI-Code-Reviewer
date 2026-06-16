from dataclasses import dataclass

@dataclass
class CodeReviewReport:
    code_overview: str
    naming_convention_review: str
    time_complexity: str
    space_complexity: str
    optimized_code: str