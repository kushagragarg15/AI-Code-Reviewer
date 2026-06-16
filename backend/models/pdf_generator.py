from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.utils import simpleSplit
import os
import uuid

class PDFReportGenerator:
    def generate(self, report_data: dict, output_dir: str = "generated_report") -> str:
        os.makedirs(output_dir, exist_ok=True)
        file_name = f"report_{uuid.uuid4()}.pdf"
        file_path = os.path.join(output_dir, file_name)

        c = canvas.Canvas(file_path, pagesize=letter)
        width, height = letter
        margin = 50
        y = height - margin

        def write_wrapped_text(text, font="Helvetica", size=12, line_height=18):
            nonlocal y
            c.setFont(font, size)
            lines = simpleSplit(text, font, size, width - 2 * margin)
            for line in lines:
                if y < margin:
                    c.showPage()
                    y = height - margin
                    c.setFont(font, size)
                c.drawString(margin, y, line)
                y -= line_height

        c.setFont("Helvetica-Bold", 16)
        c.drawString(margin, y, "Code Review Report")
        y -= 30

        for key, value in report_data.items():
            pretty_key = key.replace('_', ' ').title()
            write_wrapped_text(f"{pretty_key}:", font="Helvetica-Bold", size=13)

            if key == "naming_convention_review" and isinstance(value, dict):
                for var, comment in value.items():
                    write_wrapped_text(f"  - {var}: {comment}")
            elif key in ["time_complexity", "space_complexity"] and isinstance(value, dict):
                comp = value.get("complexity", "N/A")
                expl = value.get("explanation", "")
                write_wrapped_text(f"  Complexity: {comp}")
                if expl:
                    write_wrapped_text(f"  Explanation: {expl}")
            elif isinstance(value, dict):
                for sub_key, sub_val in value.items():
                    write_wrapped_text(f"  - {sub_key}: {sub_val}")
            elif isinstance(value, list):
                for item in value:
                    write_wrapped_text(f"  - {item}")
            else:
                write_wrapped_text(str(value))

            y -= 10 

        c.save()
        return file_path
